"use client";

import { FormEvent, useMemo, useState } from "react";

type AnnouncementStatus = "Published" | "Draft";

type Announcement = {
  id: number;
  title: string;
  audience: string;
  date: string;
  status: AnnouncementStatus;
  pinned: boolean;
  message: string;
};

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Course: Flutter App Development",
    audience: "All learners",
    date: "Jul 20, 2026",
    status: "Published",
    pinned: true,
    message: "Flutter App Development is now available for learners.",
  },
  {
    id: 2,
    title: "Platform Maintenance Scheduled",
    audience: "All users",
    date: "Jul 18, 2026",
    status: "Published",
    pinned: false,
    message: "EduFlow will be unavailable for scheduled maintenance from 2 AM to 4 AM.",
  },
  {
    id: 3,
    title: "Python Course Update",
    audience: "Python learners",
    date: "Jul 14, 2026",
    status: "Published",
    pinned: true,
    message: "New notebooks and practice lessons were added to the Python course.",
  },
  {
    id: 4,
    title: "Instructor Webinar Draft",
    audience: "Paid learners",
    date: "Jul 10, 2026",
    status: "Draft",
    pinned: false,
    message: "Live instructor webinar announcement draft.",
  },
];

const statuses = ["All statuses", "Published", "Draft"];

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    title: "",
    audience: "All learners",
    status: "Draft" as AnnouncementStatus,
    pinned: false,
    message: "",
  });

  const visibleAnnouncements = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return announcements.filter((announcement) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        announcement.title.toLowerCase().includes(normalizedQuery) ||
        announcement.audience.toLowerCase().includes(normalizedQuery) ||
        announcement.message.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "All statuses" || announcement.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [announcements, query, status]);

  const publishedCount = announcements.filter((announcement) => announcement.status === "Published").length;
  const draftCount = announcements.filter((announcement) => announcement.status === "Draft").length;
  const pinnedCount = announcements.filter((announcement) => announcement.pinned).length;

  function createAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.message.trim()) return;

    if (editingAnnouncementId) {
      setAnnouncements((current) =>
        current.map((announcement) =>
          announcement.id === editingAnnouncementId
            ? {
                ...announcement,
                title: form.title.trim(),
                audience: form.audience,
                status: form.status,
                pinned: form.pinned,
                message: form.message.trim(),
              }
            : announcement,
        ),
      );
      setNotice(`${form.title.trim()} updated.`);
      setEditingAnnouncementId(null);
      setForm({ title: "", audience: "All learners", status: "Draft", pinned: false, message: "" });
      return;
    }

    const nextAnnouncement: Announcement = {
      id: Date.now(),
      title: form.title.trim(),
      audience: form.audience,
      date: "Jul 27, 2026",
      status: form.status,
      pinned: form.pinned,
      message: form.message.trim(),
    };

    setAnnouncements((current) => [nextAnnouncement, ...current]);
    setForm({ title: "", audience: "All learners", status: "Draft", pinned: false, message: "" });
    setNotice(`${nextAnnouncement.title} added.`);
  }

  function updateForm(key: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
    setNotice("");
  }

  function startEditAnnouncement(announcement: Announcement) {
    setForm({
      title: announcement.title,
      audience: announcement.audience,
      status: announcement.status,
      pinned: announcement.pinned,
      message: announcement.message,
    });
    setEditingAnnouncementId(announcement.id);
    setNotice(`${announcement.title} loaded for editing.`);
  }

  function confirmDeleteAnnouncement() {
    if (!announcementToDelete) return;

    setAnnouncements((current) => current.filter((announcement) => announcement.id !== announcementToDelete.id));
    setNotice(`${announcementToDelete.title} deleted.`);
    setAnnouncementToDelete(null);
  }

  return (
    <div className="space-y-5">
      {notice && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          {notice}
        </div>
      )}

      <section>
        <h1 className="text-2xl font-bold text-slate-950">Announcements</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create and manage platform updates for learners.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Announcements" value={announcements.length.toString()} tone="blue" icon="megaphone" />
        <SummaryCard label="Published" value={publishedCount.toString()} tone="emerald" icon="published" />
        <SummaryCard label="Drafts" value={draftCount.toString()} tone="amber" icon="draft" />
        <SummaryCard label="Pinned" value={pinnedCount.toString()} tone="violet" icon="pin" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-950">Pinned Announcements</h2>
          <span className="text-sm font-semibold text-slate-500">{pinnedCount} pinned</span>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {announcements.filter((announcement) => announcement.pinned).map((announcement) => (
            <article key={announcement.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="truncate font-bold text-slate-950">{announcement.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{announcement.audience} / {announcement.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-fit rounded-md px-2 py-1 text-xs font-bold ${statusClass(announcement.status)}`}>
                  {announcement.status}
                </span>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:border-blue-200 hover:bg-blue-100"
                  type="button"
                  aria-label={`Edit ${announcement.title}`}
                  onClick={() => startEditAnnouncement(announcement)}
                >
                  <EditIcon />
                </button>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-200 hover:bg-red-100"
                  type="button"
                  aria-label={`Delete ${announcement.title}`}
                  onClick={() => setAnnouncementToDelete(announcement)}
                >
                  <TrashIcon />
                </button>
              </div>
            </article>
          ))}
          {pinnedCount === 0 && (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              No pinned announcements.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <form className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={createAnnouncement}>
          <h2 className="text-lg font-bold text-slate-950">{editingAnnouncementId ? "Edit Announcement" : "New Announcement"}</h2>
          <div className="mt-4 grid gap-3">
            <Input label="Title" value={form.title} placeholder="Course update" onChange={(value) => updateForm("title", value)} />
            <SelectField label="Audience" value={form.audience} options={["All learners", "All users", "Paid learners", "Free learners"]} onChange={(value) => updateForm("audience", value)} />
            <SelectField label="Status" value={form.status} options={["Draft", "Published"]} onChange={(value) => updateForm("status", value as AnnouncementStatus)} />
            <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="text-sm font-semibold text-slate-700">Pin announcement</span>
              <input checked={form.pinned} className="h-5 w-5 accent-blue-600" type="checkbox" onChange={(event) => updateForm("pinned", event.target.checked)} />
            </label>
            <Textarea label="Message" value={form.message} onChange={(value) => updateForm("message", value)} />
          </div>
          <div className="mt-4 flex gap-2">
            {editingAnnouncementId && (
              <button
                className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                type="button"
                onClick={() => {
                  setEditingAnnouncementId(null);
                  setForm({ title: "", audience: "All learners", status: "Draft", pinned: false, message: "" });
                  setNotice("");
                }}
              >
                Cancel
              </button>
            )}
            <button className="h-11 flex-1 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700" type="submit">
              {editingAnnouncementId ? "Update Announcement" : "Add Announcement"}
            </button>
          </div>
        </form>

        <div className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_170px]">
              <label className="relative block">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-11 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                  placeholder="Search announcements"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <SelectField label="Status filter" value={status} options={statuses} onChange={setStatus} />
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[minmax(0,1.5fr)_0.8fr_0.7fr_0.7fr_80px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 xl:grid">
              <span>Announcement</span>
              <span>Audience</span>
              <span>Date</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-slate-100">
              {visibleAnnouncements.map((announcement) => (
                <article key={announcement.id} className="grid gap-4 px-5 py-4 text-sm xl:grid-cols-[minmax(0,1.5fr)_0.8fr_0.7fr_0.7fr_80px] xl:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-950">{announcement.title}</h2>
                      {announcement.pinned && (
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">Pinned</span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{announcement.message}</p>
                  </div>
                  <TableCell label="Audience">{announcement.audience}</TableCell>
                  <TableCell label="Date">{announcement.date}</TableCell>
                  <div className="flex items-center justify-between xl:block">
                    <span className="text-xs font-bold text-slate-400 xl:hidden">Status</span>
                    <span className={`rounded-md px-2 py-1 text-xs font-bold ${statusClass(announcement.status)}`}>
                      {announcement.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:border-blue-200 hover:bg-blue-100"
                      type="button"
                      aria-label={`Edit ${announcement.title}`}
                      onClick={() => startEditAnnouncement(announcement)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-200 hover:bg-red-100"
                      type="button"
                      aria-label={`Delete ${announcement.title}`}
                      onClick={() => setAnnouncementToDelete(announcement)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      {announcementToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 py-6 backdrop-blur-[8px]">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Delete announcement?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-950">{announcementToDelete.title}</span>?
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <TrashIcon />
              </span>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                type="button"
                onClick={() => setAnnouncementToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
                type="button"
                onClick={confirmDeleteAnnouncement}
              >
                Delete Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon, tone }: { label: string; value: string; icon: string; tone: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClass(tone)}`}>
          <MetricIcon name={icon} />
        </span>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <textarea
        className="mt-1 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TableCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-slate-600 xl:block">
      <span className="text-xs font-bold text-slate-400 xl:hidden">{label}</span>
      <span className="font-medium xl:font-normal">{children}</span>
    </div>
  );
}

function statusClass(status: AnnouncementStatus) {
  if (status === "Published") return "bg-emerald-50 text-emerald-700";
  return "bg-orange-50 text-orange-700";
}

function toneClass(tone: string) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-orange-50 text-orange-600",
    violet: "bg-violet-50 text-violet-600",
  };
  return tones[tone] ?? tones.blue;
}

function MetricIcon({ name }: { name: string }) {
  if (name === "published") return <CheckIcon />;
  if (name === "draft") return <DraftIcon />;
  if (name === "pin") return <PinIcon />;
  return <MegaphoneIcon />;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m21 21-4.5-4.5M10.75 18.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M4 13h3l9 4V7l-9 4H4v2Zm3 0 1.5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function DraftIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M5 4h10l4 4v12H5V4Zm10 0v4h4M8 13h8M8 17h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m14 4 6 6-3 1-4 4v4l-1 1-4-4 1-1h4l4-4-4-4 1-3ZM4 20l5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m14.5 5.5 4 4M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3m-9 0 1 13h8l1-13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
