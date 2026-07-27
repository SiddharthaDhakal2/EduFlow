import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "../../../../lib/courseCatalog";
import CourseLessonsList from "./CourseLessonsList";
import CourseProgressCircle from "./CourseProgressCircle";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  return {
    title: course ? `${course.title} - EduFlow` : "Course - EduFlow",
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) notFound();

  return (
    <div className="space-y-5">
      <Link className="inline-flex text-sm font-bold text-blue-600 hover:text-blue-700" href="/user/courses">
        Back to courses
      </Link>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="min-h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${course.image})` }}
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
