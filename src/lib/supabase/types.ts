export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          name: string;
          short_name: string | null;
          tagline: string | null;
          description: string | null;
          pastor_name: string | null;
          email: string | null;
          phone: string | null;
          location: string | null;
          address: string | null;
          map_url: string | null;
          service_times: Json | null;
          giving_details: Json | null;
          announcement_active: boolean;
          announcement_text: string | null;
          announcement_link: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          short_name?: string | null;
          tagline?: string | null;
          description?: string | null;
          pastor_name?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          address?: string | null;
          map_url?: string | null;
          service_times?: Json | null;
          giving_details?: Json | null;
          announcement_active?: boolean;
          announcement_text?: string | null;
          announcement_link?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          short_name?: string | null;
          tagline?: string | null;
          description?: string | null;
          pastor_name?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          address?: string | null;
          map_url?: string | null;
          service_times?: Json | null;
          giving_details?: Json | null;
          announcement_active?: boolean;
          announcement_text?: string | null;
          announcement_link?: string | null;
          updated_at?: string;
        };
      };
      sermons: {
        Row: {
          id: string;
          title: string;
          short_title: string | null;
          subtitle: string | null;
          speaker: string;
          published_at: string;
          duration: string | null;
          tag: string | null;
          scripture: string | null;
          youtube_url: string | null;
          thumbnail_url: string | null;
          description: string | null;
          is_featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          short_title?: string | null;
          subtitle?: string | null;
          speaker?: string;
          published_at?: string;
          duration?: string | null;
          tag?: string | null;
          scripture?: string | null;
          youtube_url?: string | null;
          thumbnail_url?: string | null;
          description?: string | null;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          short_title?: string | null;
          subtitle?: string | null;
          speaker?: string;
          published_at?: string;
          duration?: string | null;
          tag?: string | null;
          scripture?: string | null;
          youtube_url?: string | null;
          thumbnail_url?: string | null;
          description?: string | null;
          is_featured?: boolean;
          created_at?: string;
        };
      };
      events: {
        Row: {
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
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category?: string;
          event_date: string;
          end_date?: string | null;
          location?: string | null;
          time_label?: string | null;
          flyer_url?: string | null;
          registration_url?: string | null;
          is_featured?: boolean;
          status?: "upcoming" | "ongoing" | "completed" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          event_date?: string;
          end_date?: string | null;
          location?: string | null;
          time_label?: string | null;
          flyer_url?: string | null;
          registration_url?: string | null;
          is_featured?: boolean;
          status?: "upcoming" | "ongoing" | "completed" | "cancelled";
          created_at?: string;
        };
      };
      ministries: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_name: string | null;
          kicker: string | null;
          tagline: string | null;
          summary: string | null;
          intro: string | null;
          leader_name: string | null;
          audience: string | null;
          meeting_schedule: string | null;
          image_url: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          short_name?: string | null;
          kicker?: string | null;
          tagline?: string | null;
          summary?: string | null;
          intro?: string | null;
          leader_name?: string | null;
          audience?: string | null;
          meeting_schedule?: string | null;
          image_url?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          short_name?: string | null;
          kicker?: string | null;
          tagline?: string | null;
          summary?: string | null;
          intro?: string | null;
          leader_name?: string | null;
          audience?: string | null;
          meeting_schedule?: string | null;
          image_url?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      prayer_requests: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          request: string;
          is_confidential: boolean;
          status: "pending" | "prayed" | "archived";
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          request: string;
          is_confidential?: boolean;
          status?: "pending" | "prayed" | "archived";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          request?: string;
          is_confidential?: boolean;
          status?: "pending" | "prayed" | "archived";
          created_at?: string;
        };
      };
      visit_registrations: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          visit_date: string | null;
          guest_count: number;
          notes: string | null;
          status: "new" | "contacted" | "welcomed";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          visit_date?: string | null;
          guest_count?: number;
          notes?: string | null;
          status?: "new" | "contacted" | "welcomed";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          visit_date?: string | null;
          guest_count?: number;
          notes?: string | null;
          status?: "new" | "contacted" | "welcomed";
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: "unread" | "replied" | "archived";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: "unread" | "replied" | "archived";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: "unread" | "replied" | "archived";
          created_at?: string;
        };
      };
      giving_pledges: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          purpose: string;
          amount: number | null;
          reference_code: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          purpose?: string;
          amount?: number | null;
          reference_code?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          purpose?: string;
          amount?: number | null;
          reference_code?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
