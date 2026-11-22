import { supabase, isSupabaseConfigured, getSupabaseAdminClient } from "./client";
import { siteConfig } from "@/config/site";
import { sermons as fallbackSermons, featuredSermon as fallbackFeatured } from "@/data/sermons";
import { ministries as fallbackMinistries } from "@/data/ministries";

export type EventItem = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  event_date: string;
  end_date: string | null;
  location: string | null;
  time_label: string | null;
  flyer_url: string | null;
  registration_url: string | null;
  is_featured: boolean;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  created_at: string;
};

// Initial fallback events for when database is not yet populated
export const fallbackEvents: EventItem[] = [
  {
    id: "event-1",
    title: "Worship Night: An Evening of Surrender",
    description:
      "Join the Unveiling Christ Church family for an extraordinary night of spontaneous praise, deep reverence, and the ministry of the Holy Spirit.",
    category: "Worship Night",
    event_date: "2026-11-28T21:00:00+03:00",
    end_date: null,
    location: "Main Sanctuary, Oyugis",
    time_label: "9:00 PM – Dawn",
    flyer_url: "/images/interior.jpg",
    registration_url: "/visit",
    is_featured: true,
    status: "upcoming",
    created_at: new Date().toISOString(),
  },
  {
    id: "event-2",
    title: "Life in Christ Crusade & Revival",
    description:
      "Six life-transforming days of gospel proclamation, signs and wonders, and deep exposition of the finished work of Jesus Christ.",
    category: "Revival",
    event_date: "2026-12-01T16:00:00+03:00",
    end_date: "2026-12-06T19:00:00+03:00",
    location: "Oyugis Town Grounds & Main Sanctuary",
    time_label: "4:00 PM Daily",
    flyer_url: "/images/church.jpg",
    registration_url: "/visit",
    is_featured: true,
    status: "upcoming",
    created_at: new Date().toISOString(),
  },
  {
    id: "event-3",
    title: "Sunday Celebration & Word of Grace",
    description:
      "Experience uplifting fellowship, inspiring praise, and the Word of grace preached with clarity by Pastor Maurice Adero.",
    category: "Sunday Service",
    event_date: "2026-11-29T08:00:00+03:00",
    end_date: null,
    location: "Main Sanctuary, Oyugis",
    time_label: "8:00 AM – 11:30 AM",
    flyer_url: null,
    registration_url: "/visit",
    is_featured: false,
    status: "upcoming",
    created_at: new Date().toISOString(),
  },
];

/**
 * Fetch global site settings from Supabase, with automatic fallback
 */
export async function getSiteSettings() {
  if (!isSupabaseConfigured || !supabase) {
    return siteConfig;
  }

  try {
    const { data, error } = await (supabase.from("site_settings") as any)
      .select("*")
      .eq("id", "global")
      .single();

    if (error || !data) {
      return siteConfig;
    }

    const row = data as any;

    return {
      ...siteConfig,
      name: row.name || siteConfig.name,
      shortName: row.short_name || siteConfig.shortName,
      tagline: row.tagline || siteConfig.tagline,
      description: row.description || siteConfig.description,
      pastor: row.pastor_name || siteConfig.pastor,
      contact: {
        ...siteConfig.contact,
        email: row.email || siteConfig.contact.email,
        phone: row.phone || siteConfig.contact.phone,
        location: row.location || siteConfig.contact.location,
        address: row.address || siteConfig.contact.address,
        mapUrl: row.map_url || siteConfig.contact.mapUrl,
      },
      serviceTimes: (row.service_times as any) || siteConfig.serviceTimes,
      announcement: {
        active: Boolean(row.announcement_active),
        text: row.announcement_text || "",
        link: row.announcement_link || "/live",
      },
    };
  } catch (err) {
    console.warn("Error reading site_settings from Supabase:", err);
    return siteConfig;
  }
}

/**
 * Fetch sermons from Supabase with fallback
 */
export async function getSermons() {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackSermons;
  }

  try {
    const { data, error } = await (supabase.from("sermons") as any)
      .select("*")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackSermons;
    }

    return (data as any[]).map((item) => ({
      id: item.id,
      title: item.title,
      duration: item.duration || "1h 15m",
      tag: item.tag || "Grace",
      thumbnail:
        item.thumbnail_url ||
        `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`,
      publishedAt: item.published_at,
      featured: item.is_featured,
      shortTitle: item.short_title || item.title,
      subtitle: item.subtitle || undefined,
      speaker: item.speaker,
      scripture: item.scripture || undefined,
      description: item.description || undefined,
    }));
  } catch (err) {
    return fallbackSermons;
  }
}

/**
 * Fetch featured sermon
 */
export async function getFeaturedSermon() {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackFeatured;
  }

  try {
    const { data, error } = await (supabase.from("sermons") as any)
      .select("*")
      .eq("is_featured", true)
      .limit(1)
      .single();

    if (error || !data) {
      return fallbackFeatured;
    }

    const item = data as any;

    return {
      id: item.id,
      title: item.title,
      duration: item.duration || "1h 15m",
      tag: item.tag || "The love of God",
      thumbnail:
        item.thumbnail_url ||
        `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`,
      publishedAt: item.published_at,
      featured: true,
      shortTitle: item.short_title || item.title,
      subtitle: item.subtitle || undefined,
    };
  } catch (err) {
    return fallbackFeatured;
  }
}

/**
 * Fetch upcoming events
 */
export async function getUpcomingEvents(): Promise<EventItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackEvents;
  }

  try {
    const { data, error } = await (supabase.from("events") as any)
      .select("*")
      .in("status", ["upcoming", "ongoing"])
      .order("event_date", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackEvents;
    }

    return data as EventItem[];
  } catch (err) {
    return fallbackEvents;
  }
}

/**
 * Fetch ministries from Supabase with fallback
 */
export async function getMinistries() {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackMinistries;
  }

  try {
    const { data, error } = await (supabase.from("ministries") as any)
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackMinistries;
    }

    return fallbackMinistries;
  } catch (err) {
    return fallbackMinistries;
  }
}

/**
 * Server-side admin queries
 */
export async function getAdminData() {
  const adminClient = getSupabaseAdminClient();
  if (!adminClient) {
    return {
      isConfigured: false,
      sermons: fallbackSermons,
      events: fallbackEvents,
      prayers: [],
      visits: [],
      contacts: [],
      settings: siteConfig as any,
    };
  }

  try {
    const [sermonsRes, eventsRes, prayersRes, visitsRes, settingsRes] =
      await Promise.all([
        (adminClient.from("sermons") as any).select("*").order("published_at", { ascending: false }),
        (adminClient.from("events") as any).select("*").order("event_date", { ascending: true }),
        (adminClient.from("prayer_requests") as any).select("*").order("created_at", { ascending: false }),
        (adminClient.from("visit_registrations") as any).select("*").order("created_at", { ascending: false }),
        (adminClient.from("site_settings") as any).select("*").eq("id", "global").maybeSingle(),
      ]);

    return {
      isConfigured: true,
      sermons: sermonsRes.data || fallbackSermons,
      events: eventsRes.data || fallbackEvents,
      prayers: prayersRes.data || [],
      visits: visitsRes.data || [],
      contacts: [],
      settings: settingsRes.data || siteConfig,
    };
  } catch (err) {
    console.error("Error fetching admin data:", err);
    return {
      isConfigured: isSupabaseConfigured,
      sermons: fallbackSermons,
      events: fallbackEvents,
      prayers: [],
      visits: [],
      contacts: [],
      settings: siteConfig as any,
    };
  }
}
