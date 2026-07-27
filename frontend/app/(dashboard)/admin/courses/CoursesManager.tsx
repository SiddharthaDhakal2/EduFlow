"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { defaultCourseCategories, readSavedCourseCategories } from "../../../lib/courseCategories";

type CourseStatus = "Published" | "Draft";

type Course = {
  id: number;
  title: string;
  category: string;
  instructor: string;
  lessons: number;
  students: number;
  created: string;
  updated: string;
  status: CourseStatus;
  accent: string;
};

const initialCourses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    category: "Web Development",
    instructor: "Sarah Johnson",
    lessons: 48,
    students: 1326,
    created: "Jan 12, 2026",
    updated: "Jul 22, 2026",
    status: "Published",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    title: "React Native - Build Mobile Apps",
    category: "App Development",
    instructor: "Michael Chen",
    lessons: 36,
    students: 914,
    created: "Feb 04, 2026",
    updated: "Jul 18, 2026",
    status: "Published",
    accent: "from-slate-800 to-blue-500",
  },
  {
    id: 3,
    title: "Python for Data Science & Machine Learning",
    category: "Data Science",
    instructor: "Dr. Emily Watson",
    lessons: 42,
    students: 1189,
    created: "Mar 09, 2026",
    updated: "Jul 14, 2026",
    status: "Draft",
    accent: "from-emerald-600 to-teal-500",
  },
  {
    id: 4,
    title: "Advanced TypeScript Patterns",
    category: "Web Development",
    instructor: "Alex Martinez",
    lessons: 18,
    students: 0,
    created: "Jun 18, 2026",
    updated: "Jul 08, 2026",
    status: "Draft",
    accent: "from-violet-600 to-fuchsia-500",
  },
  {
    id: 5,
    title: "Java Programming Masterclass",
    category: "Programming",
    instructor: "David Kumar",
    lessons: 31,
    students: 683,
    created: "Apr 16, 2026",
    updated: "Jun 30, 2026",
    status: "Draft",
    accent: "from-orange-600 to-red-500",
  },
];

const statuses = ["All statuses", "Published", "Draft"];
export default function CoursesManager() {
  const [courses, setCourses] = useState(initialCourses);
  const [categoryOptions, setCategoryOptions] = useState(["All categories", ...defaultCourseCategories]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState(statuses[0]);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    function syncCategories() {
      const nextCategories = ["All categories", ...readSavedCourseCategories()];
      setCategoryOptions(nextCategories);
      setCategory((current) => (nextCategories.includes(current) ? current : "All categories"));
    }

    syncCategories();
    window.addEventListener("storage", syncCategories);
    window.addEventListener("course-categories-updated", syncCategories);

    return () => {
      window.removeEventListener("storage", syncCategories);
      window.removeEventListener("course-categories-updated", syncCategories);
    };
  }, []);

  const visibleCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...courses]
      .filter((course) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          course.title.toLowerCase().includes(normalizedQuery) ||
          course.category.toLowerCase().includes(normalizedQuery) ||
          course.instructor.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === "All categories" || course.category === category;
        const matchesStatus = status === "All statuses" || course.status === status;

        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((a, b) => b.id - a.id);
  }, [category, courses, query, status]);

  const publishedCount = courses.filter((course) => course.status === "Published").length;
  const draftCount = courses.filter((course) => course.status === "Draft").length;
  const totalEnrollments = courses.reduce((sum, course) => sum + course.students, 0);

  function handleMenuAction(action: string, course: Course) {
    if (action === "Delete Course") {
      setCourseToDelete(course);
      return;
    }

    setNotice(`${action} selected for ${course.title}.`);
  }

  return (
    <div className="space-y-5">
      {notice && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          {notice}
        </div>
      )}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-950">Courses</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, manage, and publish courses for learners
          </p>
        </div>
        <Link
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          href="/admin/courses/new"
        >
          <PlusIcon />
          Add Course
        </Link>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Courses" value={courses.length.toString()} tone="blue" icon="course" />
        <SummaryCard label="Published Courses" value={publishedCount.toString()} tone="emerald" icon="published" />
        <SummaryCard label="Draft Courses" value={draftCount.toString()} tone="amber" icon="draft" />
        <SummaryCard label="Total Enrolments" value={totalEnrollments.toLocaleString()} tone="violet" icon="students" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_190px_170px]">
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-11 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              placeholder="Search courses"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <Select label="Category filter" value={category} options={categoryOptions} onChange={setCategory} />
          <Select label="Status filter" value={status} options={statuses} onChange={setStatus} />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {visibleCourses.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CourseIcon />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-950">No courses have been added yet.</h2>
            <Link
              className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
              href="/admin/courses/new"
            >
              Add Your First Course
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[2.2fr_0.9fr_1fr_0.7fr_0.8fr_0.8fr_70px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 xl:grid">
              <span>Course</span>
              <span>Category</span>
              <span>Instructor</span>
              <span>Lessons</span>
              <span>Enrolled</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-slate-100">
              {visibleCourses.map((course) => (
                <article
                  key={course.id}
                  className="grid gap-4 px-5 py-4 text-sm xl:grid-cols-[2.2fr_0.9fr_1fr_0.7fr_0.8fr_0.8fr_70px]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${course.accent} text-white`}>
                      <CourseIcon />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-slate-950">{course.title}</h2>
                      <p className="mt-1 text-xs text-slate-500 xl:hidden">
                        {course.category} / {course.instructor}
                      </p>
                    </div>
                  </div>
                  <TableCell label="Category">{course.category}</TableCell>
                  <TableCell label="Instructor">{course.instructor}</TableCell>
                  <TableCell label="Lessons">{course.lessons}</TableCell>
                  <TableCell label="Enrolled">{course.students.toLocaleString()}</TableCell>
                  <div className="flex items-center justify-between xl:block">
                    <span className="text-xs font-bold text-slate-400 xl:hidden">Status</span>
                    <span className={`rounded-md px-2 py-1 text-xs font-bold ${statusClass(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:border-blue-200 hover:bg-blue-100"
                      type="button"
                      aria-label={`Edit ${course.title}`}
                      onClick={() => handleMenuAction("Edit Course", course)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-200 hover:bg-red-100"
                      type="button"
                      aria-label={`Delete ${course.title}`}
                      onClick={() => handleMenuAction("Delete Course", course)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 py-6 backdrop-blur-[8px]">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Delete course?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-950">{courseToDelete.title}</span>?
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
                onClick={() => setCourseToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
                type="button"
                onClick={() => {
                  setCourses((current) => current.filter((course) => course.id !== courseToDelete.id));
                  setNotice(`${courseToDelete.title} deleted.`);
                  setCourseToDelete(null);
                }}
              >
                Delete Course
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

function statusClass(status: CourseStatus) {
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
  if (name === "students") return <UsersIcon />;
  return <CourseIcon />;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m21 21-4.5-4.5M10.75 18.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M5 5.75A2.75 2.75 0 0 1 7.75 3H19v14.5H7.75A2.75 2.75 0 0 0 5 20.25V5.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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

function UsersIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M15 14a5.5 5.5 0 0 1 6 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
