"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

type Announcement = {
  id: number;
  title: string;
  date: string;
  message: string;
  pinned: boolean;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    apiFetch<{ announcements: Announcement[] }>("/announcements").then((data) => setAnnouncements(data.announcements));
  }, []);

  const pinnedAnnouncements = announcements.filter((announcement) => announcement.pinned);
  const regularAnnouncements = announcements.filter((announcement) => !announcement.pinned);

  return (
    <div className="max-w-5xl space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Announcements</h1>
        <p className="mt-1 text-sm text-slate-500">Stay updated with the latest news and updates</p>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-950">
          <PinIcon />
          <h2>Pinned Announcements</h2>
        </div>

        <div className="space-y-3">
          {pinnedAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.title}
              announcement={announcement}
              pinned
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold text-slate-950">All Announcements</h2>

        <div className="space-y-3">
          {regularAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.title}
              announcement={announcement}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function AnnouncementCard({
  announcement,
  pinned = false,
}: {
  announcement: {
    title: string;
    date: string;
    message: string;
  };
  pinned?: boolean;
}) {
  return (
    <article
      className={`rounded-lg border p-4 ${
        pinned
          ? "border-blue-300 bg-blue-50/55"
          : "border-slate-200 bg-white shadow-sm"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-bold text-slate-950">{announcement.title}</h3>
        {pinned ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-white">
            <PinIcon small />
            Pinned
          </span>
        ) : null}
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <CalendarIcon />
        <time dateTime={announcement.date}>{announcement.date}</time>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">{announcement.message}</p>
    </article>
  );
}

function PinIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={small ? "h-3.5 w-3.5" : "h-4 w-4"}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2.75a3.75 3.75 0 0 0-3.75 3.75c0 1.17.54 2.22 1.38 2.91L6.3 16.47a1 1 0 0 0 .9 1.43h3.55V21a1.25 1.25 0 1 0 2.5 0v-3.1h3.55a1 1 0 0 0 .9-1.43l-3.33-7.06a3.74 3.74 0 0 0-2.37-6.66Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
