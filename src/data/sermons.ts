import generatedData from "./youtube.generated.json";

export type Sermon = {
  id: string;
  title: string;
  duration: string;
  tag: string;
  thumbnail: string;
  publishedAt: string;
  featured?: boolean;
  shortTitle?: string;
  subtitle?: string;
};

type GeneratedSermon = {
  id: string;
  title: string;
  publishedAt: string;
  duration: string;
  views: string;
  thumbnail: string;
};

type SermonCuration = Partial<
  Pick<Sermon, "featured" | "shortTitle" | "subtitle" | "tag">
>;

// Hand-written details survive every sync. Add an entry only when the
// automatically generated title or tag needs a human touch.
const curation: Record<string, SermonCuration> = {
  Q9IOssdQCt8: {
    featured: true,
    shortTitle: "Have You Forgotten?",
    subtitle: "How deeply God loves you · Part 1",
    tag: "The love of God",
  },
};

const TAG_RULES: Array<[RegExp, string]> = [
  [/love/i, "The love of God"],
  [/salvation|saved/i, "Salvation"],
  [/resurrect|raised .*from the dead/i, "Resurrection"],
  [/giving|provision|abundance/i, "Provision"],
  [/faith|trust/i, "Faith"],
  [/zion|sinai/i, "Grace"],
  [/identity|who you really are|reigning|reign in christ/i, "Identity"],
  [/prayer/i, "Prayer"],
  [/grace/i, "Grace"],
];

function inferTag(title: string) {
  return TAG_RULES.find(([pattern]) => pattern.test(title))?.[1] ?? "The Word";
}

// Sourced from the church's public YouTube playlist.
// The weekly sync bot rewrites this file from youtube.generated.json.
export const sermonPlaylist = {
  id: "PLKL55wk_JsMk",
  title: "SERMONS by Pst.Maurice_@CityOfGladness",
  url: "https://www.youtube.com/playlist?list=PLKL55wk_JsMk",
  channelUrl: "https://www.youtube.com/@PstMauriceAdero",
} as const;

const generated = (generatedData as { sermons?: GeneratedSermon[] }).sermons ?? [];

export const sermons: Sermon[] = generated.map((sermon, index) => {
  const overrides = curation[sermon.id] ?? {};

  return {
    id: sermon.id,
    title: sermon.title,
    duration: sermon.duration || "—",
    tag: overrides.tag ?? inferTag(sermon.title),
    thumbnail: sermon.thumbnail,
    publishedAt: sermon.publishedAt,
    featured: overrides.featured ?? index === 0,
    shortTitle: overrides.shortTitle,
    subtitle: overrides.subtitle,
  };
});

export const featuredSermon =
  sermons.find((sermon) => sermon.featured) ?? sermons[0];

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}&list=${sermonPlaylist.id}`;
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}
