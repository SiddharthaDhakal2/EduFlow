import Link from "next/link";
import type { CourseLesson } from "../../../../lib/courseCatalog";

export default function CourseLessonsList({ courseSlug, lessons }: { courseSlug: string; lessons: CourseLesson[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">Course Lessons</h2>
      <p className="mt-1 text-sm text-slate-500">Select a lesson to view its content.</p>

      <div className="mt-6 space-y-4">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.title}
            className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:bg-blue-50/60"
            href={`/user/courses/${courseSlug}/lessons/${index + 1}`}
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-base font-bold text-slate-800">
                {index + 1}
              </span>
              <h3 className="truncate text-base font-bold text-slate-950">{lesson.title}</h3>
            </div>
            <span className="shrink-0 text-xl font-bold text-blue-600">&gt;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
