"use server";

import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export type ActionResponse = {
  success: boolean;
  message: string;
};

/**
 * Submits a live prayer request to Supabase
 */
export async function submitPrayerRequest(formData: {
  name?: string;
  phone?: string;
  request: string;
  isConfidential?: boolean;
}): Promise<ActionResponse> {
  if (!formData.request || formData.request.trim().length === 0) {
    return { success: false, message: "Prayer request cannot be empty." };
  }

  if (!isSupabaseConfigured) {
    // Graceful fallback when Supabase keys are pending configuration
    console.log("Prayer request received (Supabase unconfigured):", formData);
    return {
      success: true,
      message: "Prayer request received. Our pastoral team is standing with you.",
    };
  }

  try {
    const { error } = await (supabase.from("prayer_requests") as any).insert({
      name: formData.name?.trim() || "Anonymous Online Visitor",
      phone: formData.phone?.trim() || null,
      request: formData.request.trim(),
      is_confidential: Boolean(formData.isConfidential),
      status: "pending",
    });

    if (error) {
      console.error("Supabase prayer insert error:", error);
      return { success: false, message: "Could not save request. Please try again." };
    }

    return {
      success: true,
      message: "Your prayer request has been received by Pastor Maurice and the prayer team.",
    };
  } catch (err) {
    console.error("Error submitting prayer:", err);
    return { success: false, message: "Unexpected error. Please try again." };
  }
}

/**
 * Registers a first-time church visitor for Sunday
 */
export async function submitPlanVisit(formData: {
  name: string;
  email?: string;
  phone?: string;
  visitDate?: string;
  guestCount?: number;
  notes?: string;
}): Promise<ActionResponse> {
  if (!formData.name) {
    return { success: false, message: "Please provide your name." };
  }

  if (!isSupabaseConfigured) {
    console.log("Plan visit received (Supabase unconfigured):", formData);
    return {
      success: true,
      message: "We look forward to welcoming you this Sunday!",
    };
  }

  try {
    const { error } = await (supabase.from("visit_registrations") as any).insert({
      name: formData.name.trim(),
      email: formData.email?.trim() || null,
      phone: formData.phone?.trim() || null,
      visit_date: formData.visitDate || null,
      guest_count: formData.guestCount || 1,
      notes: formData.notes?.trim() || null,
      status: "new",
    });

    if (error) {
      return { success: false, message: "Failed to record visit. Please try again." };
    }

    return {
      success: true,
      message: "Thank you! Our welcome team has reserved a seat for you.",
    };
  } catch (err) {
    return { success: false, message: "Unexpected error." };
  }
}

/**
 * Submits a contact inquiry to Supabase
 */
export async function submitContactMessage(formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<ActionResponse> {
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
    return { success: false, message: "Please fill in all required fields." };
  }

  if (!isSupabaseConfigured) {
    console.log("Contact message received (Supabase unconfigured):", formData);
    return {
      success: true,
      message: "Thank you for reaching out! Our team will respond shortly.",
    };
  }

  try {
    const { error } = await (supabase.from("contact_messages") as any).insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject?.trim() || "General Inquiry",
      message: formData.message.trim(),
      status: "unread",
    });

    if (error) {
      return { success: false, message: "Failed to send message. Please try again." };
    }

    return {
      success: true,
      message: "Your message has been sent to the church office.",
    };
  } catch (err) {
    return { success: false, message: "An unexpected error occurred." };
  }
}


