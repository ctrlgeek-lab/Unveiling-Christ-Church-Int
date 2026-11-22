"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type AdminActionResult = {
  success: boolean;
  message: string;
};

const DEFAULT_ADMIN_KEY = "CityOfGladnessGrace2026";

/**
 * Loads all administrative data for the dashboard
 */
export async function loadAdminDataAction() {
  const { getAdminData } = await import("@/lib/supabase/data");
  return await getAdminData();
}

/**
 * Validates the administrator access key
 */
export async function verifyAdminKey(key: string): Promise<AdminActionResult> {
  const configuredKey = process.env.CHURCH_ADMIN_KEY || DEFAULT_ADMIN_KEY;
  if (!key || key.trim() !== configuredKey.trim()) {
    return { success: false, message: "Invalid administrator access key. Please try again." };
  }
  return { success: true, message: "Welcome to the UCC Administration Dashboard." };
}

/**
 * Creates or updates a sermon
 */
export async function saveSermonAction(formData: {
  id?: string;
  title: string;
  shortTitle?: string;
  subtitle?: string;
  speaker: string;
  publishedAt?: string;
  duration?: string;
  tag?: string;
  scripture?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  isFeatured?: boolean;
}): Promise<AdminActionResult> {
  if (!formData.title?.trim()) {
    return { success: false, message: "Sermon title is required." };
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return {
      success: false,
      message: "Supabase database is not configured yet. Add your Supabase credentials in .env.local first.",
    };
  }

  try {
    // Extract video ID from youtube url if provided
    let youtubeId = formData.id;
    if (formData.youtubeUrl) {
      const match = formData.youtubeUrl.match(/(?:v=|\/embed\/|\/watch\?v=|\/live\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        youtubeId = match[1];
      }
    }

    const sermonId = youtubeId || formData.id || `sermon-${Date.now()}`;
    const thumbnail =
      formData.thumbnailUrl ||
      (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg` : "/images/sermons/default.jpg");

    const payload = {
      id: sermonId,
      title: formData.title.trim(),
      short_title: formData.shortTitle?.trim() || null,
      subtitle: formData.subtitle?.trim() || null,
      speaker: formData.speaker?.trim() || "Pastor Maurice Adero",
      published_at: formData.publishedAt || new Date().toISOString(),
      duration: formData.duration?.trim() || "1h 15m",
      tag: formData.tag?.trim() || "Grace",
      scripture: formData.scripture?.trim() || null,
      youtube_url: formData.youtubeUrl?.trim() || (youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null),
      thumbnail_url: thumbnail,
      description: formData.description?.trim() || null,
      is_featured: Boolean(formData.isFeatured),
    };

    const { error } = await (client.from("sermons") as any).upsert(payload);

    if (error) {
      console.error("Error saving sermon:", error);
      return { success: false, message: `Failed to save sermon: ${error.message}` };
    }

    revalidatePath("/sermons");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Sermon saved successfully!" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Unexpected error saving sermon." };
  }
}

/**
 * Deletes a sermon
 */
export async function deleteSermonAction(id: string): Promise<AdminActionResult> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { success: false, message: "Database not configured." };
  }

  try {
    const { error } = await client.from("sermons").delete().eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/sermons");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Sermon removed." };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error deleting sermon." };
  }
}

/**
 * Creates or updates an event
 */
export async function saveEventAction(formData: {
  id?: string;
  title: string;
  description?: string;
  category: string;
  eventDate: string;
  endDate?: string;
  location?: string;
  timeLabel?: string;
  flyerUrl?: string;
  registrationUrl?: string;
  isFeatured?: boolean;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
}): Promise<AdminActionResult> {
  if (!formData.title?.trim() || !formData.eventDate) {
    return { success: false, message: "Event title and date are required." };
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return { success: false, message: "Database not configured yet." };
  }

  try {
    const payload: any = {
      title: formData.title.trim(),
      description: formData.description?.trim() || null,
      category: formData.category || "Special Service",
      event_date: formData.eventDate,
      end_date: formData.endDate || null,
      location: formData.location?.trim() || "Main Sanctuary, Oyugis",
      time_label: formData.timeLabel?.trim() || "8:00 AM",
      flyer_url: formData.flyerUrl?.trim() || null,
      registration_url: formData.registrationUrl?.trim() || null,
      is_featured: Boolean(formData.isFeatured),
      status: formData.status || "upcoming",
    };

    if (formData.id) {
      payload.id = formData.id;
    }

    const { error } = await (client.from("events") as any).upsert(payload);

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/events");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Event saved successfully!" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error saving event." };
  }
}

/**
 * Deletes an event
 */
export async function deleteEventAction(id: string): Promise<AdminActionResult> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { success: false, message: "Database not configured." };
  }

  try {
    const { error } = await client.from("events").delete().eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/events");
    revalidatePath("/admin");

    return { success: true, message: "Event removed." };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error deleting event." };
  }
}

/**
 * Updates site settings & announcement banner
 */
export async function updateSiteSettingsAction(formData: {
  name: string;
  shortName?: string;
  tagline?: string;
  description?: string;
  pastorName?: string;
  email?: string;
  phone?: string;
  location?: string;
  address?: string;
  mapUrl?: string;
  announcementActive?: boolean;
  announcementText?: string;
  announcementLink?: string;
  serviceTimes?: Array<{ day: string; name: string; time: string }>;
  givingDetails?: Array<{ label: string; value: string }>;
}): Promise<AdminActionResult> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { success: false, message: "Database not configured yet." };
  }

  try {
    const payload = {
      id: "global",
      name: formData.name.trim(),
      short_name: formData.shortName?.trim() || "UCC",
      tagline: formData.tagline?.trim() || null,
      description: formData.description?.trim() || null,
      pastor_name: formData.pastorName?.trim() || "Pastor Maurice Adero",
      email: formData.email?.trim() || null,
      phone: formData.phone?.trim() || null,
      location: formData.location?.trim() || null,
      address: formData.address?.trim() || null,
      map_url: formData.mapUrl?.trim() || null,
      announcement_active: Boolean(formData.announcementActive),
      announcement_text: formData.announcementText?.trim() || null,
      announcement_link: formData.announcementLink?.trim() || null,
      service_times: formData.serviceTimes || null,
      giving_details: formData.givingDetails || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await (client.from("site_settings") as any).upsert(payload);

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/visit");
    revalidatePath("/give");
    revalidatePath("/admin");

    return { success: true, message: "Website information updated successfully!" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error saving site settings." };
  }
}

/**
 * Updates prayer request status (e.g. marked as prayed or archived)
 */
export async function updatePrayerStatusAction(
  id: string,
  status: "pending" | "prayed" | "archived"
): Promise<AdminActionResult> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { success: false, message: "Database not configured." };
  }

  try {
    const { error } = await (client.from("prayer_requests") as any)
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin");
    return { success: true, message: `Prayer request marked as ${status}.` };
  } catch (err: any) {
    return { success: false, message: "Error updating prayer status." };
  }
}

/**
 * Updates visitor registration status
 */
export async function updateVisitStatusAction(
  id: string,
  status: "new" | "contacted" | "welcomed"
): Promise<AdminActionResult> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { success: false, message: "Database not configured." };
  }

  try {
    const { error } = await (client.from("visit_registrations") as any)
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin");
    return { success: true, message: `Visitor marked as ${status}.` };
  } catch (err: any) {
    return { success: false, message: "Error updating visit status." };
  }
}
