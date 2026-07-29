"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { apiFetch, mediaUrl, type Course } from "../../../lib/api";
import { fetchCourseCategories } from "../../../lib/courseCategories";
import { showToast } from "../../../lib/toast";

const accessFilters = ["All", "Free", "Paid"];

export default function CoursesBrowser() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState(["All Courses"]);
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [selectedAccess, setSelectedAccess] = useState("All");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasMembership, setHasMembership] = useState(false);
  const [enrollingSlug, setEnrollingSlug] = useState("");

  useEffect(() => {
    async function refreshData() {
      const [coursesData, categoriesData, membershipData] = await Promise.all([
        apiFetch<{ courses: Course[] }>("/courses"),
        fetchCourseCategories(),
        apiFetch<{ membership: { active?: boolean } }>("/membership"),
      ]);
      setCourses(coursesData.courses);
      setCategories(["All Courses", ...categoriesData.categories]);
      setHasMembership(Boolean(membershipData.membership.active));
      setIsLoading(false);
    }

    refreshData().catch(() => setIsLoading(false));
    window.addEventListener("course-categories-updated", refreshData);

    return () => {
      window.removeEventListener("course-categories-updated", refreshData);
    };
  }, []);

  const filteredCourses = useMemo(() => {
    return [...courses]
      .filter((course) => {
        const matchesCategory = selectedCategory === "All Courses" || course.category === selectedCategory;
        const matchesAccess = selectedAccess === "All" || course.access === selectedAccess;
        const normalizedQuery = query.trim().toLowerCase();
        const matchesQuery =
          normalizedQuery.length === 0 ||
          course.title.toLowerCase().includes(normalizedQuery) ||
          course.category.toLowerCase().includes(normalizedQuery) ||
          course.instructor.toLowerCase().includes(normalizedQuery);

        return matchesCategory && matchesAccess && matchesQuery;
      })
      .sort((a, b) => b.id - a.id);
  }, [courses, query, selectedAccess, selectedCategory]);

  async function enrollInCourse(course: Course) {
    setEnrollingSlug(course.slug);
    try {
      await apiFetch(`/courses/${encodeURIComponent(course.slug)}/enroll`, { method: "POST" });
      showToast("Enrolled successfully.");
      router.push(`/user/courses/${encodeURIComponent(course.slug)}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to enroll in this course.", "error");
    } finally {
      setEnrollingSlug("");
    }
  }

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Courses</h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse free and paid courses available to your account.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px]">
            <label className="relative block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-11 text-sm outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                placeholder="Search courses"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <select
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
              value={selectedAccess}
              onChange={(event) => setSelectedAccess(event.target.value)}
            >
              {accessFilters.map((access) => (
                <option key={access} value={access}>
                  {access === "All" ? "All Access" : access}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                  selectedCategory === category
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600"
                }`}
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-sm font-semibold text-slate-500 shadow-sm">
            Loading courses...
          </div>
        ) : null}
        {filteredCourses.map((course) => {
          const isLocked = course.access === "Paid" && !hasMembership;

          return (
            <article
              key={course.title}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
            <div className="relative h-44 overflow-hidden">
              <div
                className={`h-full bg-cover bg-center transition duration-500 group-hover:scale-105 ${isLocked ? "grayscale" : ""}`}
                style={{ backgroundImage: `url(${mediaUrl(course.image) || course.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-blue-700 shadow-sm">
                {course.category}
              </span>
              <span className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm ${course.access === "Free" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}>
                {course.access}
              </span>
              {isLocked ? (
                <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  Membership required
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="line-clamp-2 min-h-10 overflow-hidden text-base font-bold leading-tight text-slate-950">{course.title}</h2>
              <p className="mt-2 line-clamp-2 min-h-10 overflow-hidden text-sm leading-5 text-slate-500">{course.description}</p>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-slate-800">{course.instructor}</p>
                  <span className="shrink-0 rounded-md bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {course.difficulty}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                <span>{course.lessons} lessons</span>
                <span>{course.duration}</span>
              </div>

              {isLocked ? (
                <button
                  className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                  type="button"
                  onClick={() => showToast("Membership required to access paid courses.", "info")}
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  type="button"
                  disabled={enrollingSlug === course.slug}
                  onClick={() => enrollInCourse(course)}
                  className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  {enrollingSlug === course.slug ? "Enrolling..." : "Enroll Now"}
                </button>
              )}
            </div>
            </article>
          );
        })}
      </section>

      {!isLoading && filteredCourses.length === 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-600">No courses found.</p>
        </section>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="m21 21-4.5-4.5M10.75 18.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
