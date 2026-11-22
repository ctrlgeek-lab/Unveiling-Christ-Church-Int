import generatedData from "./youtube.generated.json";

export type LiveStream = {
  id: string;
  title: string;
  category: "Sunday Service" | "Crusade & Revival" | "Worship & Prayer" | "Youth";
  views: string;
  timeAgo: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
};

type GeneratedStream = {
  id: string;
  title: string;
  publishedAt: string;
  views: string;
  thumbnail: string;
};

export const channelConfig = {
  id: "UCM_CWE7oAziNuzpMM5-trhw",
  name: "UCC- Unveiling Christ church Oyugis - KENYA.",
  url: "https://www.youtube.com/channel/UCM_CWE7oAziNuzpMM5-trhw",
  streamsUrl: "https://www.youtube.com/channel/UCM_CWE7oAziNuzpMM5-trhw/streams",
} as const;

function formatViews(value: string) {
  const views = Number(value);
  if (!Number.isFinite(views) || views <= 0) return "";
  return new Intl.NumberFormat("en-US").format(views);
}

function formatTimeAgo(publishedAt: string) {
  const timestamp = Date.parse(publishedAt);
  if (Number.isNaN(timestamp)) return "Past Stream";

  const hours = Math.max(0, Math.floor((Date.now() - timestamp) / 3_600_000));

  if (hours < 1) return "Streamed just now";
  if (hours < 24) return `Streamed ${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Streamed yesterday";
  if (days < 7) return `Streamed ${days} days ago`;
  if (days < 30) return `Streamed ${Math.floor(days / 7)} wk ago`;
  if (days < 365) return `Streamed ${Math.floor(days / 30)} mo ago`;

  return `Streamed ${Math.floor(days / 365)} yr ago`;
}

function inferCategory(title: string): LiveStream["category"] {
  if (/youth/i.test(title)) return "Youth";
  if (/worship|prayer|intercess|fellowship/i.test(title)) {
    return "Worship & Prayer";
  }
  if (/crusade|revival|kesha/i.test(title)) return "Crusade & Revival";
  return "Sunday Service";
}

const generated =
  (generatedData as { streams?: GeneratedStream[] }).streams ?? [];

// The weekly sync bot rewrites youtube.generated.json from the church's
// YouTube /streams tab, so this archive stays current without manual edits.
export const pastLiveStreams: LiveStream[] = generated
  .filter((stream) => Boolean(stream.id))
  .sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  )
  .map((stream) => ({
    id: stream.id,
    title: stream.title,
    category: inferCategory(stream.title),
    views: formatViews(stream.views),
    timeAgo: formatTimeAgo(stream.publishedAt),
    thumbnail: stream.thumbnail,
    url: `https://www.youtube.com/watch?v=${stream.id}`,
    publishedAt: stream.publishedAt,
  }));

export const latestLiveStream = pastLiveStreams[0];
