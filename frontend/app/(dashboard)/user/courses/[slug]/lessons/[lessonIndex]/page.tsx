import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "../../../../../../lib/courseCatalog";
import MarkAsReadButton from "./MarkAsReadButton";

type LessonDetailPageProps = {
  params: Promise<{
    slug: string;
    lessonIndex: string;
  }>;
};

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.lessonItems.map((_, index) => ({
      slug: course.slug,
      lessonIndex: (index + 1).toString(),
    })),
  );
}

export async function generateMetadata({ params }: LessonDetailPageProps) {
  const { slug, lessonIndex } = await params;
  const course = courses.find((item) => item.slug === slug);
  const lesson = course?.lessonItems[Number(lessonIndex) - 1];

  return {
    title: lesson && course ? `${lesson.title} - ${course.title}` : "Lesson - EduFlow",
  };
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { slug, lessonIndex } = await params;
  const course = courses.find((item) => item.slug === slug);
  const index = Number(lessonIndex) - 1;
  const lesson = course?.lessonItems[index];

  if (!course || !lesson || Number.isNaN(index)) notFound();

  const previousLesson = index > 0 ? `/user/courses/${course.slug}/lessons/${index}` : null;
  const nextLesson = index < course.lessonItems.length - 1 ? `/user/courses/${course.slug}/lessons/${index + 2}` : null;

  return (
    <div className="space-y-5">
      <Link className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700" href={`/user/courses/${course.slug}`}>
        <BackIcon />
        Back to lessons
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div>
            <p className="text-xs font-bold text-blue-600">
              Lesson {index + 1} of {course.lessonItems.length}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">{lesson.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{course.title}</p>
          </div>
        </div>
      </section>

      {lesson.videoTitle ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-[360px] items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            Video preview
          </div>
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
