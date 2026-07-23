const pinnedAnnouncements = [
  {
    title: "New Course: Flutter App Development",
    date: "2026-05-15",
    body: "We are excited to announce a new course on Flutter App Development. Learn to build beautiful cross-platform mobile apps!",
  },
  {
    title: "Summer Sale: 20% Off All Memberships",
    date: "2026-05-05",
    body: "Get 20% off on yearly memberships this summer! Offer valid until June 30, 2026. Use code SUMMER2026 at checkout.",
  },
];

const announcements = [
  {
    title: "Platform Maintenance Scheduled",
    date: "2026-05-10",
    body: "EduFlow will undergo scheduled maintenance on May 25, 2026, from 2 AM to 4 AM. The platform will be temporarily unavailable during this time.",
  },
  {
    title: "New Features: Progress Tracking",
    date: "2026-04-28",
    body: "We have added a new progress tracking feature. You can now see your course completion percentage and track your learning journey.",
  },
];

export const metadata = {
  title: "Announcements - EduFlow",
};

export default function AnnouncementsPage() {
  return (
    <div className="max-w-5xl space-y-5">
      <section>
        <h1 className="text-2xl font-black tracking-[-0.02em] text-slate-950">
          Announcements
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Stay updated with the latest news and updates
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950">
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
        <h2 className="mb-3 text-sm font-black text-slate-950">
          All Announcements
        </h2>

        <div className="space-y-3">
          {announcements.map((announcement) => (
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
    body: string;
  };
  pinned?: boolean;
}) {
  return (
    <article
      className={`rounded-xl border p-5 ${
        pinned
          ? "border-blue-300 bg-blue-50/50"
          : "border-slate-200 bg-white shadow-sm"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-black text-slate-950">
          {announcement.title}
        </h3>
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

      <p className="mt-5 text-sm leading-6 text-slate-600">
        {announcement.body}
      </p>
    </article>
  );
}

function PinIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={small ? "h-3 w-3" : "h-4 w-4"}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m14 4 6 6-3 1-4 4v4l-1 1-4-4 1-1h4l4-4-4-4 1-3ZM4 20l5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
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
