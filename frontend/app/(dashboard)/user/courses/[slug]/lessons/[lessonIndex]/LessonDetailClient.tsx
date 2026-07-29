"use client";

import Link from "next/link";
import type { ReactNode } from "react";
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
          <LessonTextContent content={lesson.textContent} />
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

function LessonTextContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const elements: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      elements.push(
        <h2 key={elements.length} className="mt-5 first:mt-0 text-xl font-bold leading-tight text-slate-950">
          {headingMatch[2]}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (isPlainHeading(lines, index)) {
      elements.push(
        <h2 key={elements.length} className="mt-5 first:mt-0 text-xl font-bold leading-tight text-slate-950">
          {line}
        </h2>,
      );
      index += 1;
      continue;
    }

    const bulletItems: string[] = [];
    while (index < lines.length) {
      const bulletMatch = lines[index].trim().match(/^[-*•]\s+(.+)$/);
      if (!bulletMatch) break;
      bulletItems.push(bulletMatch[1]);
      index += 1;
    }
    if (bulletItems.length) {
      elements.push(
        <ul key={elements.length} className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {bulletItems.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const numberedItems: string[] = [];
    while (index < lines.length) {
      const numberedMatch = lines[index].trim().match(/^\d+[.)]\s+(.+)$/);
      if (!numberedMatch) break;
      numberedItems.push(numberedMatch[1]);
      index += 1;
    }
    if (numberedItems.length) {
      elements.push(
        <ol key={elements.length} className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
          {numberedItems.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{item}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      const currentLine = lines[index].trim();
      if (currentLine.match(/^(#{1,3})\s+(.+)$/) || currentLine.match(/^[-*•]\s+(.+)$/) || currentLine.match(/^\d+[.)]\s+(.+)$/)) break;
      paragraphLines.push(currentLine);
      index += 1;
    }

    elements.push(
      <p key={elements.length} className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
        {paragraphLines.join("\n")}
      </p>,
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

function isPlainHeading(lines: string[], index: number) {
  const line = lines[index].trim();
  const previousLine = index === 0 ? "" : lines[index - 1].trim();
  const nextLine = lines[index + 1]?.trim() || "";

  return (
    Boolean(line) &&
    Boolean(nextLine) &&
    !previousLine &&
    line.length <= 80 &&
    !line.match(/[.!?:;]$/) &&
    !line.match(/^[-*•]\s+(.+)$/) &&
    !line.match(/^\d+[.)]\s+(.+)$/)
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
