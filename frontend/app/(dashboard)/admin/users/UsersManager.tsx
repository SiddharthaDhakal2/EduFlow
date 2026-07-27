"use client";

import { useMemo, useState } from "react";

type UserStatus = "Active" | "Free";

type User = {
  id: number;
  name: string;
  email: string;
  joined: string;
  status: UserStatus;
  courses: number;
  avatar: string;
  recentLogin: string;
  courseProgress: {
    title: string;
    progress: string;
  }[];
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Siddhartha Dhakal",
    email: "student@eduflow.com",
    joined: "Jan 15, 2025",
    status: "Active",
    courses: 3,
    avatar: "SD",
    recentLogin: "Jul 27, 2026, 9:15 AM",
    courseProgress: [
      { title: "Complete Web Development Bootcamp", progress: "82%" },
      { title: "Advanced JavaScript & TypeScript", progress: "61%" },
      { title: "React Native - Build Mobile Apps", progress: "34%" },
    ],
  },
  {
    id: 2,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    joined: "Feb 08, 2026",
    status: "Free",
    courses: 1,
    avatar: "AS",
    recentLogin: "Jul 24, 2026, 4:40 PM",
    courseProgress: [{ title: "Complete Web Development Bootcamp", progress: "24%" }],
  },
  {
    id: 3,
    name: "Maya Gurung",
    email: "maya@example.com",
    joined: "Mar 19, 2026",
    status: "Active",
    courses: 5,
    avatar: "MG",
    recentLogin: "Jul 26, 2026, 7:05 PM",
    courseProgress: [
      { title: "Python for Data Science", progress: "92%" },
      { title: "Complete Web Development Bootcamp", progress: "86%" },
      { title: "Java Programming Masterclass", progress: "77%" },
    ],
  },
  {
    id: 4,
    name: "Nisha Thapa",
    email: "nisha@example.com",
    joined: "Apr 02, 2026",
    status: "Free",
    courses: 2,
    avatar: "NT",
    recentLogin: "Jul 21, 2026, 11:30 AM",
    courseProgress: [
      { title: "Complete Web Development Bootcamp", progress: "45%" },
      { title: "Flutter App Development", progress: "31%" },
    ],
  },
];

const statuses = ["All users", "Active", "Free"];

export default function UsersManager() {
  const [users] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const visibleUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "All users" || user.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status, users]);

  const activeCount = users.filter((user) => user.status === "Active").length;
  const freeCount = users.filter((user) => user.status === "Free").length;

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Users</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage learner accounts and course access.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <SummaryCard label="Total Users" value={users.length.toString()} tone="blue" icon="users" />
        <SummaryCard label="Active Users" value={activeCount.toString()} tone="emerald" icon="active" />
        <SummaryCard label="Free Users" value={freeCount.toString()} tone="amber" icon="free" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px]">
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-11 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              placeholder="Search users"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <Select label="Status filter" value={status} options={statuses} onChange={setStatus} />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {visibleUsers.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UsersIcon />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-950">No users found.</h2>
            <p className="mt-1 text-sm text-slate-500">Try another search or filter.</p>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr_0.7fr_70px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 xl:grid">
              <span>User</span>
              <span>Email</span>
              <span>Joined</span>
              <span>Status</span>
              <span>Courses</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-slate-100">
              {visibleUsers.map((user) => (
                <article
                  key={user.id}
                  className="grid gap-4 px-5 py-4 text-sm xl:grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr_0.7fr_70px] xl:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {user.avatar}
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-slate-950">{user.name}</h2>
                      <p className="mt-1 text-xs text-slate-500 xl:hidden">{user.email}</p>
                    </div>
                  </div>
                  <TableCell label="Email">{user.email}</TableCell>
                  <TableCell label="Joined">{user.joined}</TableCell>
                  <div className="flex items-center justify-between xl:block">
                    <span className="text-xs font-bold text-slate-400 xl:hidden">Status</span>
                    <span className={`rounded-md px-2 py-1 text-xs font-bold ${statusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <TableCell label="Courses">{user.courses}</TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:border-blue-200 hover:bg-blue-100"
                      type="button"
                      aria-label={`View ${user.name}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <EyeIcon />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 py-6 backdrop-blur-[8px]">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{selectedUser.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedUser.email}</p>
                </div>
              </div>
              <button
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                type="button"
                aria-label="Close user details"
                onClick={() => setSelectedUser(null)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailRow label="Status" value={selectedUser.status} />
              <DetailRow label="Joined" value={selectedUser.joined} />
              <DetailRow label="Total Courses" value={selectedUser.courses.toString()} />
              <DetailRow label="Recent Login" value={selectedUser.recentLogin} />
            </div>

            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Course Progress</p>
              <div className="mt-3 space-y-2">
                {selectedUser.courseProgress.map((course) => (
                  <div key={course.title} className="rounded-lg bg-white p-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-slate-800">{course.title}</span>
                      <span className="font-bold text-blue-600">{course.progress}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: course.progress }} />
                    </div>
                  </div>
                ))}
              </div>
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

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
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

function statusClass(status: UserStatus) {
  if (status === "Active") return "bg-emerald-50 text-emerald-700";
  return "bg-slate-100 text-slate-600";
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
  if (name === "active") return <CheckIcon />;
  if (name === "free") return <FreeIcon />;
  return <UsersIcon />;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m21 21-4.5-4.5M10.75 18.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M15 14a5.5 5.5 0 0 1 6 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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

function FreeIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 4v16M6 8.5h8.5a3 3 0 0 1 0 6H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M3.5 12s3.25-6 8.5-6 8.5 6 8.5 6-3.25 6-8.5 6-8.5-6-8.5-6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
