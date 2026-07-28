"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, mediaUrl, type Course } from "../../../../../../lib/api";
import MarkAsReadButton from "./MarkAsReadButton";

export default function LessonDetailClient({ slug, lessonIndex }: { slug: string; lessonIndex: number }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    apiFetch<{ course: Course }>(`/courses/${slug}`)
      .then((data) => setCourse(data.course))
      .catch((error) => setAccessError(error instanceof Error ? error.message : "Unable to open lesson."))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const index = lessonIndex - 1;
  const lesson = course?.lessonItems[index];

  if (isLoading) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-sm">Loading lesson...</div>;
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

  if (!course || !lesson || Number.isNaN(index)) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-sm">Lesson not found.</div>;
  }

  const previousLesson = index > 0 ? `/user/courses/${course.slug}/lessons/${index}` : null;
  const nextLesson = index < course.lessonItems.length - 1 ? `/user/courses/${course.slug}/lessons/${index + 2}` : null;

  return (
    <div className="space-y-5">
      <Link className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700" href={`/user/courses/${course.slug}`}>
        <BackIcon />
        Back to lessons
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold text-blue-600">
          Lesson {index + 1} of {course.lessonItems.length}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950">{lesson.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{course.title}</p>
      </section>

      {lesson.videoTitle ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {lesson.videoUrl ? (
            <video className="h-[360px] w-full rounded-xl bg-slate-950 object-contain" controls src={mediaUrl(lesson.videoUrl)} />
          ) : (
            <div className="flex h-[360px] items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              Video preview
            </div>
          )}
          <p className="mt-3 text-sm font-semibold text-slate-600">{lesson.videoTitle}</p>
        </section>
      ) : null}

      {lesson.textContent ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm leading-7 text-slate-600">{lesson.textContent}</p>
        </section>
      ) : null}

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {previousLesson ? (
            <Link
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              href={previousLesson}
            >
              &lt; Previous
            </Link>
          ) : (
            <span className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 px-4 text-sm font-bold text-slate-300">
              &lt; Previous
            </span>
          )}

          <MarkAsReadButton courseSlug={course.slug} lessonIndex={index + 1} />

          {nextLesson ? (
            <Link
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              href={nextLesson}
            >
              Next &gt;
            </Link>
          ) : (
            <Link
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
              href={`/user/courses/${course.slug}`}
            >
              <BackIcon />
              Back to Course
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

function BackIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
