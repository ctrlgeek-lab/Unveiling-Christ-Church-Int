#!/usr/bin/env node
/**
 * Weekly YouTube sync for Unveiling Christ Church.
 *
 * Pulls the church channel's live streams and the sermon playlist, downloads
 * the matching YouTube thumbnails, and writes src/data/youtube.generated.json.
 *
 * Run with: npm run sync:youtube
 *
 * Set YOUTUBE_API_KEY to use the YouTube Data API (recommended, one quota unit
 * per request). Without a key the script falls back to YouTube's public RSS
 * feeds and watch pages, which need no credentials.
 */

import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED_PATH = path.join(ROOT, "src/data/youtube.generated.json");
const THUMB_ROOT = path.join(ROOT, "public/youtube");

// Make local runs pick up .env.local without an extra dependency. Existing
// environment variables (for example in CI) always win.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(path.join(ROOT, file));
  } catch {
    // The file is optional.
  }
}

const config = JSON.parse(
  await readFile(path.join(ROOT, "youtube.config.json"), "utf8"),
);

const API_KEY = process.env.YOUTUBE_API_KEY?.trim() ?? "";
const CHANNEL_ID =
  process.env.YOUTUBE_CHANNEL_ID?.trim() || config.channelId;
const PLAYLIST_ID =
  process.env.YOUTUBE_SERMON_PLAYLIST_ID?.trim() || config.sermonPlaylistId;
const MAX_SERMONS = Number(config.maxSermons) || 40;
const MAX_STREAMS = Number(config.maxStreams) || 30;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function log(...args) {
  console.log("[youtube-sync]", ...args);
}

function warn(...args) {
  console.warn("[youtube-sync]", ...args);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function match(text, pattern) {
  const result = text.match(pattern);
  return result ? result[1] : "";
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code) => {
    if (code[0] === "#") {
      const isHex = code[1]?.toLowerCase() === "x";
      const number = Number.parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : entity;
    }

    return named[code.toLowerCase()] ?? entity;
  });
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/\s+/g, " ")
    .replace(/\u200b/g, "")
    .trim();
}

function normalizeDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function formatDuration(totalSeconds) {
  const seconds = Number(totalSeconds);
  if (!Number.isFinite(seconds) || seconds <= 0) return "";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = Math.floor(seconds % 60);
  const pad = (value) => String(value).padStart(2, "0");

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(rest)}`
    : `${minutes}:${pad(rest)}`;
}

function isoDurationToSeconds(value) {
  const result = value?.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!result) return 0;

  const [, days, hours, minutes, seconds] = result;
  return (
    (Number(days) || 0) * 86400 +
    (Number(hours) || 0) * 3600 +
    (Number(minutes) || 0) * 60 +
    (Number(seconds) || 0)
  );
}

async function request(url, options = {}, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "user-agent": USER_AGENT,
          "accept-language": "en-US,en;q=0.9",
          ...options.headers,
        },
      });

      if (response.ok) return response;

      lastError = new Error(`${response.status} ${response.statusText} for ${url}`);
      if (response.status !== 429 && response.status < 500) break;
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) {
      await sleep(attempt * 1_500);
    }
  }

  throw lastError ?? new Error(`Request failed: ${url}`);
}

async function requestText(url, options) {
  return (await request(url, options)).text();
}

async function requestJson(url, options) {
  return (await request(url, options)).json();
}

// ---------------------------------------------------------------------------
// Public RSS feeds
// ---------------------------------------------------------------------------

function parseFeed(xml) {
  const entries = [];
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g;

  for (const matchResult of xml.matchAll(entryPattern)) {
    const entry = matchResult[1];
    const id = cleanText(match(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/));
    if (!id) continue;

    entries.push({
      id,
      title: cleanText(match(entry, /<title>([\s\S]*?)<\/title>/)),
      publishedAt: normalizeDate(
        match(entry, /<published>([^<]+)<\/published>/),
      ),
      views: match(entry, /<media:statistics[^>]*views="(\d+)"/),
    });
  }

  return entries;
}

async function fetchChannelFeed() {
  const xml = await requestText(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CHANNEL_ID)}`,
  );
  return parseFeed(xml);
}

async function fetchPlaylistFeed() {
  const xml = await requestText(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(PLAYLIST_ID)}`,
  );
  return parseFeed(xml);
}

// ---------------------------------------------------------------------------
// Watch pages (public fallback for duration, views, and validation)
// ---------------------------------------------------------------------------

const videoCache = new Map();

async function scrapeVideo(id) {
  if (videoCache.has(id)) return videoCache.get(id);

  const promise = (async () => {
    try {
      const html = await requestText(
        `https://www.youtube.com/watch?v=${encodeURIComponent(id)}&hl=en`,
      );

      const rawTitle =
        match(html, /<meta name="title" content="([^"]*)"/) ||
        match(html, /<title>([\s\S]*?)<\/title>/).replace(/\s*-\s*YouTube\s*$/, "");

      const title = cleanText(rawTitle);
      const channelId = match(html, /"channelId":"(UC[\w-]{22})"/);
      const publishedAt = normalizeDate(
        match(html, /"publishDate":"([^"]+)"/) ||
          match(html, /"uploadDate":"([^"]+)"/),
      );
      const seconds = Number(match(html, /"lengthSeconds":"(\d+)"/)) || 0;

      if (!title) return null;

      return {
        id,
        title,
        channelId,
        publishedAt,
        views: match(html, /"viewCount":"(\d+)"/),
        durationSeconds: seconds,
        isUpcoming: /"isUpcoming":true/.test(html),
      };
    } catch (error) {
      warn(`Could not read watch page for ${id}: ${error.message}`);
      return null;
    }
  })();

  videoCache.set(id, promise);
  return promise;
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );

  return results;
}

// ---------------------------------------------------------------------------
// YouTube Data API (preferred when a key is available)
// ---------------------------------------------------------------------------

async function youtubeApi(resource, params) {
  const search = new URLSearchParams({
    ...params,
    key: API_KEY,
  });

  return requestJson(
    `https://www.googleapis.com/youtube/v3/${resource}?${search.toString()}`,
  );
}

async function apiPlaylistVideoIds(playlistId, limit) {
  const ids = [];
  let pageToken = "";

  do {
    const page = await youtubeApi("playlistItems", {
      part: "contentDetails",
      maxResults: "50",
      playlistId,
      ...(pageToken ? { pageToken } : {}),
    });

    for (const item of page.items ?? []) {
      const id = item.contentDetails?.videoId;
      if (id && !ids.includes(id)) ids.push(id);
      if (ids.length >= limit) return ids;
    }

    pageToken = page.nextPageToken ?? "";
  } while (pageToken);

  return ids;
}

async function apiVideoDetails(ids) {
  const videos = [];

  for (let index = 0; index < ids.length; index += 50) {
    const batch = ids.slice(index, index + 50);
    const page = await youtubeApi("videos", {
      part: "snippet,contentDetails,statistics,liveStreamingDetails",
      id: batch.join(","),
      maxResults: "50",
    });

    videos.push(...(page.items ?? []));
  }

  return videos;
}

function withoutInternalFlags(entry) {
  const result = { ...entry };
  delete result.wasLive;
  delete result.isUpcoming;
  return result;
}

function apiVideoToEntry(video) {
  const scheduledAt = Date.parse(
    video.liveStreamingDetails?.scheduledStartTime ?? "",
  );
  const actuallyStarted = Boolean(video.liveStreamingDetails?.actualStartTime);

  return {
    id: video.id,
    title: cleanText(video.snippet?.title ?? ""),
    publishedAt: normalizeDate(
      video.snippet?.publishedAt ?? video.liveStreamingDetails?.actualStartTime,
    ),
    duration: formatDuration(
      isoDurationToSeconds(video.contentDetails?.duration),
    ),
    views: String(video.statistics?.viewCount ?? ""),
    wasLive: Boolean(video.liveStreamingDetails),
    isUpcoming:
      video.snippet?.liveBroadcastContent === "upcoming" ||
      (!actuallyStarted &&
        Number.isFinite(scheduledAt) &&
        scheduledAt > Date.now()),
  };
}

// ---------------------------------------------------------------------------
// Thumbnails
// ---------------------------------------------------------------------------

const THUMBNAIL_NAMES = ["maxresdefault", "sddefault", "hqdefault"];

async function existingThumbnail(relativePath) {
  if (!relativePath) return false;

  try {
    const info = await stat(path.join(ROOT, "public", relativePath));
    return info.size > 5_000;
  } catch {
    return false;
  }
}

async function downloadThumbnail(id, kind) {
  const relativePath = `/youtube/${kind}/${id}.jpg`;
  const target = path.join(THUMB_ROOT, kind, `${id}.jpg`);

  if (await existingThumbnail(relativePath)) return relativePath;

  await mkdir(path.dirname(target), { recursive: true });

  for (const name of THUMBNAIL_NAMES) {
    try {
      const response = await request(
        `https://i.ytimg.com/vi/${id}/${name}.jpg`,
        {},
        2,
      );
      const buffer = Buffer.from(await response.arrayBuffer());

      // YouTube serves a tiny grey placeholder for missing sizes.
      if (buffer.length < 5_000) continue;

      await writeFile(target, buffer);
      return relativePath;
    } catch {
      // Try the next available size.
    }
  }

  warn(`No downloadable thumbnail for ${id}; using the YouTube CDN.`);
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

async function attachThumbnails(entries, kind, previousById) {
  return mapLimit(entries, 4, async (entry) => {
    const thumbnail = await downloadThumbnail(entry.id, kind);
    const fallback =
      previousById.get(entry.id)?.thumbnail ||
      `https://i.ytimg.com/vi/${entry.id}/hqdefault.jpg`;

    return {
      ...entry,
      thumbnail: thumbnail || fallback,
    };
  });
}

// ---------------------------------------------------------------------------
// Collection
// ---------------------------------------------------------------------------

function looksLikeStream(title) {
  return /\b(live|service|crusade|revival|conference|worship|prayer|intercess|fellowship|kesha|session|night)\b/i.test(
    title,
  );
}

async function collectFromApi() {
  const [sermonIds, streamIds] = await Promise.all([
    apiPlaylistVideoIds(PLAYLIST_ID, MAX_SERMONS),
    // Look further back than MAX_STREAMS because regular uploads and shorts
    // are mixed into the uploads playlist.
    apiPlaylistVideoIds(`UU${CHANNEL_ID.slice(2)}`, 100),
  ]);

  const ids = [...new Set([...sermonIds, ...streamIds])];
  const videos = await apiVideoDetails(ids);
  const byId = new Map(videos.map((video) => [video.id, apiVideoToEntry(video)]));

  const sermons = sermonIds
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map(withoutInternalFlags);

  const streams = streamIds
    .map((id) => byId.get(id))
    .filter(Boolean)
    .filter((entry) => entry.wasLive && !entry.isUpcoming)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, MAX_STREAMS)
    .map(withoutInternalFlags);

  return { sermons, streams, mode: "youtube-data-api" };
}

async function collectFromPublicPages() {
  const [playlistFeed, channelFeed] = await Promise.all([
    fetchPlaylistFeed(),
    fetchChannelFeed(),
  ]);

  const feedById = new Map(channelFeed.map((entry) => [entry.id, entry]));

  // Sermon durations are not in the RSS feed, so read each watch page.
  const sermons = await mapLimit(
    playlistFeed.slice(0, MAX_SERMONS),
    4,
    async (entry) => {
      const details = await scrapeVideo(entry.id);

      return {
        id: entry.id,
        title: entry.title,
        publishedAt: entry.publishedAt,
        duration: formatDuration(details?.durationSeconds),
        views: details?.views || entry.views || "",
      };
    },
  );

  // The /streams tab is the authoritative public list of past broadcasts.
  let streamIds = [];
  try {
    const html = await requestText(`${config.streamsUrl}?hl=en`);
    streamIds = [
      ...new Set(
        [...html.matchAll(/"videoId":"([\w-]{11})"/g)].map((result) => result[1]),
      ),
    ].slice(0, 60);
  } catch (error) {
    warn(`Could not read the channel streams page: ${error.message}`);
  }

  let streams = [];

  if (streamIds.length > 0) {
    const entries = await mapLimit(streamIds, 4, async (id) => {
      const feedEntry = feedById.get(id);
      const details = await scrapeVideo(id);

      if (details) {
        if (details.channelId && details.channelId !== CHANNEL_ID) return null;
        if (details.isUpcoming) return null;

        return {
          id,
          title: details.title || feedEntry?.title || "",
          publishedAt: details.publishedAt || feedEntry?.publishedAt || "",
          views: details.views || feedEntry?.views || "",
        };
      }

      return feedEntry ?? null;
    });

    streams = entries.filter(Boolean);
  } else {
    // Last-resort fallback: the uploads feed, filtered by broadcast wording.
    streams = channelFeed.filter((entry) => looksLikeStream(entry.title));
  }

  streams = streams
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, MAX_STREAMS)
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      publishedAt: entry.publishedAt,
      views: entry.views || "",
    }));

  return { sermons, streams, mode: "public-rss" };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function readPrevious() {
  try {
    const raw = await readFile(GENERATED_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      sermons: Array.isArray(parsed.sermons) ? parsed.sermons : [],
      streams: Array.isArray(parsed.streams) ? parsed.streams : [],
    };
  } catch {
    return { sermons: [], streams: [] };
  }
}

async function main() {
  const previous = await readPrevious();

  let result;

  if (API_KEY) {
    try {
      result = await collectFromApi();
      log("Synced with the YouTube Data API.");
    } catch (error) {
      warn(`YouTube Data API failed (${error.message}); using public pages.`);
    }
  }

  if (!result) {
    result = await collectFromPublicPages();
    log("Synced with public YouTube feeds.");
  }

  const previousSermons = new Map(
    previous.sermons.map((entry) => [entry.id, entry]),
  );
  const previousStreams = new Map(
    previous.streams.map((entry) => [entry.id, entry]),
  );

  let sermons = result.sermons;
  let streams = result.streams;

  if (sermons.length === 0) {
    warn("No sermons returned; keeping the previous sermon list.");
    sermons = previous.sermons;
  }

  if (streams.length === 0) {
    warn("No streams returned; keeping the previous stream list.");
    streams = previous.streams;
  }

  if (sermons.length === 0 && streams.length === 0) {
    throw new Error("No YouTube content found. Aborting so the last good data stays in place.");
  }

  // RSS feeds only expose the newest 15 videos. Keep older entries from the
  // previous run so the library and stream archive keep their history.
  const freshSermonIds = new Set(sermons.map((entry) => entry.id));
  sermons = [
    ...sermons,
    ...previous.sermons.filter((entry) => !freshSermonIds.has(entry.id)),
  ].slice(0, MAX_SERMONS);

  const freshStreamIds = new Set(streams.map((entry) => entry.id));
  streams = [
    ...streams,
    ...previous.streams.filter((entry) => !freshStreamIds.has(entry.id)),
  ]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, MAX_STREAMS);

  sermons = await attachThumbnails(sermons, "sermons", previousSermons);
  streams = await attachThumbnails(streams, "streams", previousStreams);

  const output = {
    syncedAt: new Date().toISOString(),
    source: {
      mode: result.mode,
      channelId: CHANNEL_ID,
      playlistId: PLAYLIST_ID,
    },
    sermons,
    streams,
  };

  const temporaryPath = `${GENERATED_PATH}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await rename(temporaryPath, GENERATED_PATH);

  log(
    `Wrote ${sermons.length} sermons and ${streams.length} streams ` +
      `(${result.mode}) to src/data/youtube.generated.json.`,
  );
}

await main();
