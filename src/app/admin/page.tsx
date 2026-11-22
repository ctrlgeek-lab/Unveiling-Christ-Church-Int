"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Video,
  Calendar,
  Settings,
  HeartHandshake,
  Users,
  Database,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  LogOut,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  Search,
  Lock,
  ChevronRight,
  Eye,
} from "lucide-react";
import {
  verifyAdminKey,
  loadAdminDataAction,
  saveSermonAction,
  deleteSermonAction,
  saveEventAction,
  deleteEventAction,
  updateSiteSettingsAction,
  updatePrayerStatusAction,
  updateVisitStatusAction,
} from "@/app/actions/admin-actions";

type Tab =
  | "overview"
  | "sermons"
  | "events"
  | "settings"
  | "prayers"
  | "visitors"
  | "database";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Data states
  const [adminData, setAdminData] = useState<any>({
    isConfigured: false,
    sermons: [],
    events: [],
    prayers: [],
    visits: [],
    settings: {},
  });

  // UI helpers
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [sermonSearch, setSermonSearch] = useState("");
  const [copiedSQL, setCopiedSQL] = useState(false);

  // Sermon Modal State
  const [isSermonModalOpen, setIsSermonModalOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<any>(null);
  const [sermonForm, setSermonForm] = useState({
    id: "",
    title: "",
    shortTitle: "",
    subtitle: "",
    speaker: "Pastor Maurice Adero",
    publishedAt: "",
    duration: "1h 15m",
    tag: "Grace",
    scripture: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    description: "",
    isFeatured: false,
  });

  // Event Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventForm, setEventForm] = useState({
    id: "",
    title: "",
    description: "",
    category: "Special Service",
    eventDate: "",
    location: "Main Sanctuary, Oyugis",
    timeLabel: "8:00 AM – 11:30 AM",
    flyerUrl: "",
    registrationUrl: "/visit",
    isFeatured: false,
    status: "upcoming" as any,
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    name: "Unveiling Christ Church",
    shortName: "UCC",
    tagline: "The city of gladness. Unstoppable grace.",
    description: "We exist to unveil Christ's finished work and raise a generation established in grace and faith.",
    pastorName: "Pastor Maurice Adero",
    email: "Unveilingchrist13@gmail.com",
    phone: "+254 724 227 788",
    location: "Oyugis, Homa Bay County, Kenya",
    address: "P.O. Box 544-40222, Oyugis",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Unveiling+Christ+Church+Oyugis",
    announcementActive: false,
    announcementText: "Join us this Sunday at 8:00 AM in Oyugis or live online.",
    announcementLink: "/live",
  });

  // Check persisted session on mount
  useEffect(() => {
    const saved = localStorage.getItem("ucc_admin_session");
    if (saved === "authenticated") {
      setIsAuthenticated(true);
      refreshData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const data = await loadAdminDataAction();
      setAdminData(data);
      if (data.settings) {
        const s = data.settings as any;
        setSettingsForm({
          name: s.name || "Unveiling Christ Church",
          shortName: s.shortName || s.short_name || "UCC",
          tagline: s.tagline || "",
          description: s.description || "",
          pastorName: s.pastor || s.pastor_name || "Pastor Maurice Adero",
          email: s.contact?.email || s.email || "Unveilingchrist13@gmail.com",
          phone: s.contact?.phone || s.phone || "",
          location: s.contact?.location || s.location || "",
          address: s.contact?.address || s.address || "",
          mapUrl: s.contact?.mapUrl || s.map_url || "",
          announcementActive: Boolean(s.announcement?.active || s.announcement_active),
          announcementText: s.announcement?.text || s.announcement_text || "",
          announcementLink: s.announcement?.link || s.announcement_link || "/live",
        });
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await verifyAdminKey(adminKey);
    if (res.success) {
      localStorage.setItem("ucc_admin_session", "authenticated");
      setIsAuthenticated(true);
      showToast(res.message);
      refreshData();
    } else {
      setAuthError(res.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ucc_admin_session");
    setIsAuthenticated(false);
    setAdminKey("");
  };

  // Sermon Modal Handlers
  const openNewSermonModal = () => {
    setEditingSermon(null);
    setSermonForm({
      id: "",
      title: "",
      shortTitle: "",
      subtitle: "",
      speaker: "Pastor Maurice Adero",
      publishedAt: new Date().toISOString().split("T")[0],
      duration: "1h 15m",
      tag: "Grace",
      scripture: "",
      youtubeUrl: "",
      thumbnailUrl: "",
      description: "",
      isFeatured: false,
    });
    setIsSermonModalOpen(true);
  };

  const openEditSermonModal = (sermon: any) => {
    setEditingSermon(sermon);
    setSermonForm({
      id: sermon.id,
      title: sermon.title || "",
      shortTitle: sermon.shortTitle || sermon.short_title || "",
      subtitle: sermon.subtitle || "",
      speaker: sermon.speaker || "Pastor Maurice Adero",
      publishedAt: sermon.publishedAt?.split("T")[0] || sermon.published_at?.split("T")[0] || "",
      duration: sermon.duration || "1h 15m",
      tag: sermon.tag || "Grace",
      scripture: sermon.scripture || "",
      youtubeUrl: sermon.youtube_url || (sermon.id ? `https://www.youtube.com/watch?v=${sermon.id}` : ""),
      thumbnailUrl: sermon.thumbnail || sermon.thumbnail_url || "",
      description: sermon.description || "",
      isFeatured: Boolean(sermon.featured || sermon.is_featured),
    });
    setIsSermonModalOpen(true);
  };

  const handleSaveSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveSermonAction(sermonForm);
      if (res.success) {
        showToast(res.message);
        setIsSermonModalOpen(false);
        refreshData();
      } else {
        showToast(res.message, "error");
      }
    });
  };

  const handleDeleteSermon = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    startTransition(async () => {
      const res = await deleteSermonAction(id);
      if (res.success) {
        showToast(res.message);
        refreshData();
      } else {
        showToast(res.message, "error");
      }
    });
  };

  // Event Modal Handlers
  const openNewEventModal = () => {
    setEditingEvent(null);
    setEventForm({
      id: "",
      title: "",
      description: "",
      category: "Special Service",
      eventDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
      location: "Main Sanctuary, Oyugis",
      timeLabel: "8:00 AM – 11:30 AM",
      flyerUrl: "",
      registrationUrl: "/visit",
      isFeatured: false,
      status: "upcoming",
    });
    setIsEventModalOpen(true);
  };

  const openEditEventModal = (event: any) => {
    setEditingEvent(event);
    setEventForm({
      id: event.id,
      title: event.title || "",
      description: event.description || "",
      category: event.category || "Special Service",
      eventDate: event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : "",
      location: event.location || "Main Sanctuary, Oyugis",
      timeLabel: event.time_label || "8:00 AM",
      flyerUrl: event.flyer_url || "",
      registrationUrl: event.registration_url || "/visit",
      isFeatured: Boolean(event.is_featured),
      status: event.status || "upcoming",
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveEventAction(eventForm);
      if (res.success) {
        showToast(res.message);
        setIsEventModalOpen(false);
        refreshData();
      } else {
        showToast(res.message, "error");
      }
    });
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Delete event "${title}"?`)) return;
    startTransition(async () => {
      const res = await deleteEventAction(id);
      if (res.success) {
        showToast(res.message);
        refreshData();
      } else {
        showToast(res.message, "error");
      }
    });
  };

  // Settings Save Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSiteSettingsAction(settingsForm);
      if (res.success) {
        showToast(res.message);
        refreshData();
      } else {
        showToast(res.message, "error");
      }
    });
  };

  // Status Handlers
  const handleUpdatePrayer = async (id: string, status: "pending" | "prayed" | "archived") => {
    startTransition(async () => {
      const res = await updatePrayerStatusAction(id, status);
      if (res.success) {
        showToast(res.message);
        refreshData();
      }
    });
  };

  const handleUpdateVisit = async (id: string, status: "new" | "contacted" | "welcomed") => {
    startTransition(async () => {
      const res = await updateVisitStatusAction(id, status);
      if (res.success) {
        showToast(res.message);
        refreshData();
      }
    });
  };

  // ============================================================================
  // 1. LOGIN SCREEN (When not authenticated)
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f1d] p-8 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-400 shadow-inner">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">
              Church Administration
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Unveiling Christ Church &mdash; Content & Ministry Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="relative mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Administrator Access Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter access passphrase..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-400 focus:bg-white/[0.07]"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
              <p className="text-[11px] text-slate-400">
                Default Master Key:{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-blue-300">
                  CityOfGladnessGrace2026
                </code>
              </p>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white"
              >
                &larr; Back to Church Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered sermons
  const filteredSermons = (adminData.sermons || []).filter((s: any) =>
    (s.title || "").toLowerCase().includes(sermonSearch.toLowerCase()) ||
    (s.tag || "").toLowerCase().includes(sermonSearch.toLowerCase())
  );

  const pendingPrayers = (adminData.prayers || []).filter((p: any) => p.status === "pending");
  const newVisitors = (adminData.visits || []).filter((v: any) => v.status === "new");

  // ============================================================================
  // 2. DASHBOARD MAIN INTERFACE
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-sm shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-200"
              : "border-red-500/30 bg-red-950/90 text-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070b14]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white tracking-wide">
                  Unveiling Christ Church
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                  Supabase Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">The City of Gladness &middot; Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase status indicator */}
            <div
              className={`hidden sm:flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                adminData.isConfigured
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  adminData.isConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span>{adminData.isConfigured ? "Database Connected" : "Supabase Pending Setup"}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6 scrollbar-none">
          <nav className="flex space-x-1 border-t border-white/[0.05] py-2">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "sermons", label: `Sermons (${adminData.sermons?.length || 0})`, icon: Video },
              { id: "events", label: `Events (${adminData.events?.length || 0})`, icon: Calendar },
              { id: "settings", label: "Website Info & Banner", icon: Settings },
              {
                id: "prayers",
                label: `Prayer Requests ${pendingPrayers.length ? `(${pendingPrayers.length})` : ""}`,
                icon: HeartHandshake,
                badge: pendingPrayers.length,
              },
              {
                id: "visitors",
                label: `Sunday Visitors ${newVisitors.length ? `(${newVisitors.length})` : ""}`,
                icon: Users,
                badge: newVisitors.length,
              },
              { id: "database", label: "Supabase Setup & SQL", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
                    isActive
                      ? "border border-blue-400/30 bg-blue-600/20 text-white"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                  {tab.badge ? (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* ==================================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ==================================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-[#0a1020] to-[#070b14] p-6 sm:p-8">
              <div className="relative z-10 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                  Pastor Maurice Adero & Pastoral Team
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                  Welcome to Church Management
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Manage your sermons, upcoming revival meetings, Sunday visit registrations,
                  and live announcements in one unified Supabase-powered dashboard.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={openNewSermonModal}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Sermon</span>
                  </button>
                  <button
                    onClick={openNewEventModal}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                  >
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>Post Church Event</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                  >
                    <Settings className="h-4 w-4 text-amber-400" />
                    <span>Edit Site & Banner</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metric KPI cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#090e1a] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Total Sermons</span>
                  <span className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                    <Video className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-white">
                  {adminData.sermons?.length || 0}
                </p>
                <p className="mt-1 text-xs text-slate-500">Available across the website</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#090e1a] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Upcoming Events</span>
                  <span className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                    <Calendar className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-white">
                  {adminData.events?.length || 0}
                </p>
                <p className="mt-1 text-xs text-slate-500">Services & Gatherings</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#090e1a] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Prayer Requests</span>
                  <span className="rounded-lg bg-rose-500/10 p-2 text-rose-400">
                    <HeartHandshake className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-white">
                  {adminData.prayers?.length || 0}
                </p>
                <p className="mt-1 text-xs text-rose-400">
                  {pendingPrayers.length} pending prayer review
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#090e1a] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Sunday Visitors</span>
                  <span className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-white">
                  {adminData.visits?.length || 0}
                </p>
                <p className="mt-1 text-xs text-amber-400">
                  {newVisitors.length} new registrations
                </p>
              </div>
            </div>

            {/* Quick Status and Announcement Card */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0a0f1d] p-6">
                <h3 className="font-display font-semibold text-white">Announcement Banner</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Top-of-site announcement currently displayed on the church website.
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Live Status:
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        settingsForm.announcementActive
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      {settingsForm.announcementActive ? "Active & Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-200">
                    &ldquo;{settingsForm.announcementText || "No announcement set."}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-blue-400">
                    Links to: {settingsForm.announcementLink}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300"
                  >
                    Edit Banner &rarr;
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0a0f1d] p-6">
                <h3 className="font-display font-semibold text-white">Supabase Health</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Real-time database connection status.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                    <span className="text-slate-400">Supabase URL</span>
                    <span className="font-mono text-slate-300">
                      {process.env.NEXT_PUBLIC_SUPABASE_URL || "Pending in .env.local"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                    <span className="text-slate-400">Database Engine</span>
                    <span className="text-emerald-400 font-semibold">PostgreSQL (Supabase)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                    <span className="text-slate-400">Fallback Protection</span>
                    <span className="text-blue-300 font-semibold">Active (Zero-downtime static cache)</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setActiveTab("database")}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300"
                  >
                    View Setup Instructions &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: SERMONS MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "sermons" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Sermon Library</h2>
                <p className="text-xs text-slate-400">
                  Publish teachings from Pastor Maurice Adero with YouTube video integrations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={sermonSearch}
                    onChange={(e) => setSermonSearch(e.target.value)}
                    placeholder="Search sermons..."
                    className="w-48 sm:w-64 rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                  />
                </div>
                <button
                  onClick={openNewSermonModal}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Sermon</span>
                </button>
              </div>
            </div>

            {/* Sermons Table */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1d]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Sermon</th>
                      <th className="px-4 py-3 font-semibold">Speaker</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                      <th className="px-4 py-3 font-semibold">Featured</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {filteredSermons.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                          No sermons found. Click &quot;Add Sermon&quot; to publish one.
                        </td>
                      </tr>
                    ) : (
                      filteredSermons.map((sermon: any) => (
                        <tr key={sermon.id} className="transition hover:bg-white/[0.02]">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {sermon.thumbnail || sermon.thumbnail_url ? (
                                <img
                                  src={sermon.thumbnail || sermon.thumbnail_url}
                                  alt=""
                                  className="h-10 w-16 rounded-lg object-cover border border-white/10"
                                />
                              ) : (
                                <div className="h-10 w-16 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                  <Video className="h-5 w-5" />
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-white">{sermon.title}</p>
                                <p className="text-[11px] text-slate-400">
                                  {sermon.scripture ? `${sermon.scripture} &middot; ` : ""}
                                  ID: {sermon.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-300">
                            {sermon.speaker || "Pastor Maurice Adero"}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
                              {sermon.tag || "Grace"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-400">
                            {sermon.duration || "1h 15m"}
                          </td>
                          <td className="px-4 py-3.5">
                            {sermon.featured || sermon.is_featured ? (
                              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                                Featured ★
                              </span>
                            ) : (
                              <span className="text-slate-600">&mdash;</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditSermonModal(sermon)}
                                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                                title="Edit"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSermon(sermon.id, sermon.title)}
                                className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: EVENTS MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Events & Gatherings</h2>
                <p className="text-xs text-slate-400">
                  Manage services, all-night keshas, revivals, and worship nights.
                </p>
              </div>

              <button
                onClick={openNewEventModal}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Event</span>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(adminData.events || []).map((event: any) => (
                <div
                  key={event.id}
                  className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0f1d] p-5 transition hover:border-white/20"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-blue-400/25 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-300">
                        {event.category || "Special Service"}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          event.status === "upcoming" ? "text-emerald-400" : "text-slate-500"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display font-bold text-white text-base">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
                      {event.description || "No description provided."}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-blue-400" />
                        <span>
                          {event.event_date
                            ? new Date(event.event_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Date TBD"}{" "}
                          &middot; {event.time_label || "8:00 AM"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-400" />
                        <span>{event.location || "Main Sanctuary, Oyugis"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/[0.06] pt-3">
                    <button
                      onClick={() => openEditEventModal(event)}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id, event.title)}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: WEBSITE SETTINGS & BANNER */}
        {/* ==================================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Website Profile & Banner
              </h2>
              <p className="text-xs text-slate-400">
                Update global church information, leadership, contacts, and announcement banner.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Announcement Banner Box */}
              <div className="rounded-3xl border border-blue-500/30 bg-blue-950/20 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-white">
                      Live Announcement Banner
                    </h3>
                    <p className="text-xs text-slate-400">
                      Displays a prominent banner across the top of every page.
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={settingsForm.announcementActive}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, announcementActive: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
                  </label>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Banner Message
                    </label>
                    <input
                      type="text"
                      value={settingsForm.announcementText}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, announcementText: e.target.value })
                      }
                      placeholder="e.g. Worship Night is this Friday at 9:00 PM!"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Target Link / Route
                    </label>
                    <input
                      type="text"
                      value={settingsForm.announcementLink}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, announcementLink: e.target.value })
                      }
                      placeholder="/live, /events, or external URL"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>

              {/* General Church Info */}
              <div className="rounded-3xl border border-white/10 bg-[#0a0f1d] p-6 space-y-4">
                <h3 className="font-display font-semibold text-white">Church Information</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400">
                      Church Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400">
                      Senior Pastor
                    </label>
                    <input
                      type="text"
                      value={settingsForm.pastorName}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, pastorName: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400">Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, tagline: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400">
                      Mission / Summary Description
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.description}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, description: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Location */}
              <div className="rounded-3xl border border-white/10 bg-[#0a0f1d] p-6 space-y-4">
                <h3 className="font-display font-semibold text-white">Contact & Physical Location</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400">
                      Church Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400">
                      Town / Location
                    </label>
                    <input
                      type="text"
                      value={settingsForm.location}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, location: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400">
                      Postal Address
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, address: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400">
                      Google Maps Link
                    </label>
                    <input
                      type="text"
                      value={settingsForm.mapUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, mapUrl: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Website Information"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: PRAYER REQUESTS */}
        {/* ==================================================================== */}
        {activeTab === "prayers" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Prayer Requests</h2>
              <p className="text-xs text-slate-400">
                Submitted from the live stream and church website.
              </p>
            </div>

            <div className="space-y-3">
              {(adminData.prayers || []).length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1d] p-8 text-center text-slate-500 text-xs">
                  No prayer requests received yet.
                </div>
              ) : (
                (adminData.prayers || []).map((prayer: any) => (
                  <div
                    key={prayer.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0a0f1d] p-5"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">
                          {prayer.name || "Anonymous Visitor"}
                        </span>
                        {prayer.is_confidential && (
                          <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                            Confidential
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            prayer.status === "prayed"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-amber-500/15 text-amber-300"
                          }`}
                        >
                          {prayer.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 italic">&ldquo;{prayer.request}&rdquo;</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        {prayer.phone && <span>Phone: {prayer.phone}</span>}
                        <span>
                          {new Date(prayer.created_at).toLocaleDateString()} at{" "}
                          {new Date(prayer.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {prayer.status !== "prayed" && (
                        <button
                          onClick={() => handleUpdatePrayer(prayer.id, "prayed")}
                          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20"
                        >
                          Mark as Prayed
                        </button>
                      )}
                      <button
                        onClick={() => handleUpdatePrayer(prayer.id, "archived")}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 6: SUNDAY VISITORS */}
        {/* ==================================================================== */}
        {activeTab === "visitors" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">First-Time Visitors</h2>
              <p className="text-xs text-slate-400">
                People planning to join Sunday celebration in Oyugis.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1d]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Visitor Name</th>
                      <th className="px-4 py-3 font-semibold">Contact Info</th>
                      <th className="px-4 py-3 font-semibold">Planned Date</th>
                      <th className="px-4 py-3 font-semibold">Guests</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {(adminData.visits || []).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                          No visitor registrations yet.
                        </td>
                      </tr>
                    ) : (
                      (adminData.visits || []).map((visit: any) => (
                        <tr key={visit.id} className="transition hover:bg-white/[0.02]">
                          <td className="px-4 py-3.5 font-semibold text-white">
                            {visit.name}
                            {visit.notes && (
                              <p className="mt-0.5 text-[11px] font-normal text-slate-400">
                                Note: {visit.notes}
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-slate-300">
                            <div>{visit.phone || "No phone"}</div>
                            <div className="text-[11px] text-slate-500">{visit.email}</div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-300">
                            {visit.visit_date || "Upcoming Sunday"}
                          </td>
                          <td className="px-4 py-3.5 text-slate-400">
                            {visit.guest_count || 1} guest(s)
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                visit.status === "welcomed"
                                  ? "bg-emerald-500/15 text-emerald-300"
                                  : "bg-blue-500/15 text-blue-300"
                              }`}
                            >
                              {visit.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {visit.status !== "welcomed" && (
                                <button
                                  onClick={() => handleUpdateVisit(visit.id, "welcomed")}
                                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20"
                                >
                                  Mark Welcomed
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 7: SUPABASE SETUP & SQL */}
        {/* ==================================================================== */}
        {activeTab === "database" && (
          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Supabase Backend Setup
              </h2>
              <p className="text-xs text-slate-400">
                How to connect your free Supabase database and run the schema migration.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0a0f1d] p-6 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-white">
                  Step 1: Create a Supabase Project
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Go to{" "}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline"
                  >
                    https://supabase.com
                  </a>{" "}
                  and click &ldquo;New Project&rdquo;. Give it a name like &ldquo;Unveiling Christ
                  Church&rdquo;.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-white">
                  Step 2: Run the SQL Schema
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Open your Supabase project &rarr; **SQL Editor** &rarr; paste the script below &rarr; click **Run**.
                </p>

                <div className="mt-3 relative">
                  <div className="flex items-center justify-between rounded-t-xl bg-slate-900 px-4 py-2 text-xs text-slate-400 border border-white/10 border-b-0">
                    <span>supabase/schema.sql</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`-- UCC SQL Schema is located in supabase/schema.sql`);
                        setCopiedSQL(true);
                        setTimeout(() => setCopiedSQL(false), 2000);
                      }}
                      className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300"
                    >
                      {copiedSQL ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedSQL ? "Copied" : "Copy SQL Script"}</span>
                    </button>
                  </div>
                  <pre className="max-h-64 overflow-y-auto rounded-b-xl border border-white/10 bg-[#060810] p-4 text-[11px] font-mono text-slate-300">
{`-- All tables and security policies are in your project's supabase/schema.sql file!
-- 1. site_settings (Church info & announcements)
-- 2. sermons (Sermon library)
-- 3. events (Church calendar)
-- 4. ministries (Church departments)
-- 5. prayer_requests (Live stream & website requests)
-- 6. visit_registrations (First-time guests)
-- 7. contact_messages (Inquiries)
-- 8. giving_pledges (Partnership pledges)`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-white">
                  Step 3: Put Credentials in <code className="text-blue-300">.env.local</code>
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Copy your Project URL and anon key from Supabase **Project Settings &rarr; API**:
                </p>
                <div className="mt-2 rounded-xl border border-white/10 bg-[#060810] p-4 font-mono text-xs text-slate-300">
                  <div>NEXT_PUBLIC_SUPABASE_URL=&quot;https://your-project.supabase.co&quot;</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=&quot;your-anon-public-key&quot;</div>
                  <div>CHURCH_ADMIN_KEY=&quot;CityOfGladnessGrace2026&quot;</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* MODAL: ADD / EDIT SERMON */}
      {/* ==================================================================== */}
      {isSermonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0f1d] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white">
              {editingSermon ? "Edit Sermon" : "Add New Sermon"}
            </h3>
            <p className="text-xs text-slate-400">
              Provide sermon details and YouTube link.
            </p>

            <form onSubmit={handleSaveSermon} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Sermon Title *
                </label>
                <input
                  type="text"
                  required
                  value={sermonForm.title}
                  onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                  placeholder="e.g. Have You Forgotten? How deeply God loves you"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Speaker</label>
                  <input
                    type="text"
                    value={sermonForm.speaker}
                    onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Scripture</label>
                  <input
                    type="text"
                    value={sermonForm.scripture}
                    onChange={(e) => setSermonForm({ ...sermonForm, scripture: e.target.value })}
                    placeholder="e.g. Romans 8:1, 1 John 4:9"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300">
                    Category / Theme
                  </label>
                  <select
                    value={sermonForm.tag}
                    onChange={(e) => setSermonForm({ ...sermonForm, tag: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0e1424] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  >
                    <option value="Grace">Grace</option>
                    <option value="The love of God">The love of God</option>
                    <option value="Salvation">Salvation</option>
                    <option value="Faith">Faith</option>
                    <option value="Resurrection">Resurrection</option>
                    <option value="Identity">Identity</option>
                    <option value="Prayer">Prayer</option>
                    <option value="The Word">The Word</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={sermonForm.duration}
                    onChange={(e) => setSermonForm({ ...sermonForm, duration: e.target.value })}
                    placeholder="e.g. 1h 15m"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  YouTube URL or Video ID
                </label>
                <input
                  type="text"
                  value={sermonForm.youtubeUrl}
                  onChange={(e) => setSermonForm({ ...sermonForm, youtubeUrl: e.target.value })}
                  placeholder="e.g. https://www.youtube.com/watch?v=Q9IOssdQCt8"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredSermon"
                  checked={sermonForm.isFeatured}
                  onChange={(e) => setSermonForm({ ...sermonForm, isFeatured: e.target.checked })}
                  className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-0"
                />
                <label htmlFor="featuredSermon" className="text-xs text-slate-300">
                  Set as Featured Sermon on homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsSermonModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Sermon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: ADD / EDIT EVENT */}
      {/* ==================================================================== */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0f1d] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white">
              {editingEvent ? "Edit Event" : "Post Church Event"}
            </h3>
            <p className="text-xs text-slate-400">
              Schedule an upcoming service, night of worship, or conference.
            </p>

            <form onSubmit={handleSaveEvent} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. Worship Night: An Evening of Surrender"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0e1424] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  >
                    <option value="Sunday Service">Sunday Service</option>
                    <option value="Worship Night">Worship Night</option>
                    <option value="Revival">Revival & Crusade</option>
                    <option value="Conference">Conference</option>
                    <option value="Youth">Youth Gathering</option>
                    <option value="Outreach">Community Outreach</option>
                    <option value="Special Service">Special Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={eventForm.eventDate}
                    onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0e1424] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300">
                    Time Display Label
                  </label>
                  <input
                    type="text"
                    value={eventForm.timeLabel}
                    onChange={(e) => setEventForm({ ...eventForm, timeLabel: e.target.value })}
                    placeholder="e.g. 9:00 PM – Dawn, or 8:00 AM"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="Main Sanctuary, Oyugis"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Event Description
                </label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Explain what attendees can expect..."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredEvent"
                  checked={eventForm.isFeatured}
                  onChange={(e) => setEventForm({ ...eventForm, isFeatured: e.target.checked })}
                  className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-0"
                />
                <label htmlFor="featuredEvent" className="text-xs text-slate-300">
                  Highlight this event as featured
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
