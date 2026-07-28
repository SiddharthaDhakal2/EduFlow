"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, mediaUrl, type Course, type User } from "../../../lib/api";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<{
    user: User;
    stats: { total: number; completed: number; inProgress: number };
    membership: { active?: boolean; expiryDate?: string };
    recentCourses: Course[];
  } | null>(null);

  useEffect(() => {
    apiFetch<NonNullable<typeof dashboard>>("/user/dashboard").then(setDashboard);
  }, []);

  const stats = [
    { title: "Total Enrolled Courses", value: dashboard?.stats.total.toString() || "0", detail: "Active courses", color: "text-blue-600", icon: "book" },
    { title: "Completed", value: dashboard?.stats.completed.toString() || "0", detail: "Courses finished", color: "text-emerald-600", icon: "check" },
    { title: "In Progress", value: dashboard?.stats.inProgress.toString() || "0", detail: "Ongoing courses", color: "text-orange-600", icon: "clock" },
  ];
  const membership = dashboard?.membership || { active: false };
  const recentCourses = dashboard?.recentCourses || [];

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950">
          Welcome, {dashboard?.user.name || "Learner"}!
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Continue your learning journey
        </p>
      </section>

      <section className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                <MembershipIcon />
              </span>
              Membership Status
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${
                  membership.active
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {membership.active ? "Active" : "Not Active"}
              </span>
              {membership.active ? (
                <span className="text-xs font-semibold text-slate-600">
                  Expires on {membership.expiryDate}
                </span>
              ) : null}
            </div>
          </div>
          {!membership.active ? (
            <Link
              href="/user/membership"
              className="inline-flex justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Buy Membership
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="landing-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {item.title}
                </p>
                <div className="mt-7 text-3xl font-bold text-slate-950">
                  {item.value}
                </div>
                <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
              </div>
              <span className={item.color}>
                <StatIcon name={item.icon} />
              </span>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-[-0.02em]">
            Recently Added Courses
          </h2>
          <Link
            href="/user/courses"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recentCourses.map((course) => (
            <article
              key={course.title}
              className="landing-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div
                className="h-36 bg-cover bg-center"
                style={{ backgroundImage: `url(${mediaUrl(course.image) || course.image})` }}
              />
              <div className="p-5">
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-700">
                  {course.category}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-950">
                  {course.title}
                </h3>
                <p className="mt-5 text-sm text-slate-500">
                  {course.instructor}
                </p>
                <Link
                  href="/user/courses"
                  className="mt-4 inline-flex w-full justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  View Course
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatIcon({ name }: { name: string }) {
  if (name === "check") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="m6 12 4 4 8-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M5 5.75A2.75 2.75 0 0 1 7.75 3H19v14.5H7.75A2.75 2.75 0 0 0 5 20.25V5.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8.5 7H16M8.5 10.5H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function MembershipIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9ZM4 9h16M8 14h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
