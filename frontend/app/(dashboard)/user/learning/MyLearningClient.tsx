"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courses, type Course } from "../../../lib/courseCatalog";
import { readCompletedLessons } from "../../../lib/courseProgress";

const enrolledCourseSlugs = [
  "complete-web-development-bootcamp-2026",
  "python-for-data-science-machine-learning",
  "java-programming-masterclass",
];

export default function MyLearningClient() {
  const [completedByCourse, setCompletedByCourse] = useState<Record<string, number>>({});

  const learningCourses = useMemo(
    () =>
      enrolledCourseSlugs
        .map((slug) => courses.find((course) => course.slug === slug))
        .filter((course): course is Course => Boolean(course))
        .map((course) => {
          const completedLessons = completedByCourse[course.slug] ?? 0;
          const totalLessons = course.lessonItems.length;
          const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

          return {
            ...course,
            completedLessons,
            totalLessons,
            progress,
            status: progress === 100 ? "Completed" : "In Progress",
            lastActivity: completedLessons > 0 ? "Recently" : "Not started",
          };
        }),
    [completedByCourse],
  );

  useEffect(() => {
    function refreshProgress() {
      setCompletedByCourse(
        Object.fromEntries(
          enrolledCourseSlugs.map((slug) => [slug, readCompletedLessons(slug).length]),
        ),
      );
    }

    refreshProgress();
    window.addEventListener("course-progress-updated", refreshProgress);
    window.addEventListener("storage", refreshProgress);

    return () => {
      window.removeEventListener("course-progress-updated", refreshProgress);
      window.removeEventListener("storage", refreshProgress);
    };
  }, []);

  const completedCount = learningCourses.filter((course) => course.progress === 100).length;
  const inProgressCount = learningCourses.length - completedCount;

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">My Learning</h1>
        <p className="mt-1 text-sm text-slate-500">
          Continue your courses and track completion.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <SummaryCard label="Enrolled Courses" value={learningCourses.length.toString()} tone="blue" icon="book" />
        <SummaryCard label="In Progress" value={inProgressCount.toString()} tone="amber" icon="clock" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Continue Learning</h2>
          <p className="mt-1 text-sm text-slate-500">Pick up from your latest lesson.</p>
        </div>

        <div className="mt-5 space-y-4">
          {learningCourses.map((course) => (
            <article
              key={course.title}
              className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[180px_minmax(0,1fr)]"
            >
              <div
                className="min-h-40 bg-cover bg-center lg:min-h-full"
                style={{ backgroundImage: `url(${course.image})` }}
              />
              <div className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                        {course.category}
                      </span>
                      <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${course.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}>
                        {course.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-slate-950">{course.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">by {course.instructor}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-bold text-slate-500">Last activity</p>
                    <p className="mt-1 text-sm font-bold text-slate-950">{course.lastActivity}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-slate-500">
                    {course.status === "Completed" ? "Course completed" : "Next lesson is ready"}
                  </span>
                  <Link
                    href={`/user/courses/${course.slug}`}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    {course.status === "Completed" ? "Review Course" : "Continue"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
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
          <StatIcon name={icon} />
        </span>
      </div>
    </div>
  );
}

function toneClass(tone: string) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-orange-50 text-orange-600",
  };
  return tones[tone] ?? tones.blue;
}

function StatIcon({ name }: { name: string }) {
  if (name === "clock") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M5 5.75A2.75 2.75 0 0 1 7.75 3H19v14.5H7.75A2.75 2.75 0 0 0 5 20.25V5.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
