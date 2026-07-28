"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, mediaUrl, type Certificate, type Course } from "../../../../lib/api";
import { fetchCourseProgress } from "../../../../lib/courseProgress";
import CourseLessonsList from "./CourseLessonsList";
import CourseProgressCircle from "./CourseProgressCircle";

export default function CourseDetailClient({ slug }: { slug: string }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    apiFetch<{ course: Course }>(`/courses/${slug}`)
      .then((data) => setCourse(data.course))
      .catch((error) => setAccessError(error instanceof Error ? error.message : "Unable to open course."))
      .finally(() => setIsLoading(false));
  }, [slug]);

  useEffect(() => {
    async function updateCertificate() {
      try {
        const progress = await fetchCourseProgress(slug);
        setCertificate(progress.certificate);
      } catch {
        setCertificate(null);
      }
    }

    updateCertificate();
    window.addEventListener("course-progress-updated", updateCertificate);

    return () => window.removeEventListener("course-progress-updated", updateCertificate);
  }, [slug]);

  if (isLoading) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-sm">Loading course...</div>;
  }

  if (accessError) {
    return (
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-950">Membership required</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{accessError}</p>
        <Link className="mt-5 inline-flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700" href="/user/membership">
          Buy Membership
        </Link>
      </div>
    );
  }

  if (!course) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-sm">Course not found.</div>;
  }

  return (
    <div className="space-y-5">
      <Link className="inline-flex text-sm font-bold text-blue-600 hover:text-blue-700" href="/user/courses">
        Back to courses
      </Link>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="min-h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${mediaUrl(course.image) || course.image})` }}
          />
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                {course.category}
              </span>
              <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${course.access === "Free" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}>
                {course.access}
              </span>
              <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                {course.difficulty}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-950">{course.title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoTile label="Instructor" value={course.instructor} />
              <InfoTile label="Lessons" value={`${course.lessons} lessons`} />
              <InfoTile label="Duration" value={course.duration} />
            </div>

            <CourseProgressCircle courseSlug={course.slug} totalLessons={course.lessonItems.length} />

            {certificate ? (
              <Link
                className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
                href={`/user/certificates/${course.slug}`}
              >
                View Certificate
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <CourseLessonsList courseSlug={course.slug} lessons={course.lessonItems} />
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
