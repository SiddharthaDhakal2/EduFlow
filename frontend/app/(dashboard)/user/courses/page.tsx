import Link from "next/link";

const categories = [
  "All Courses",
  "Web Development",
  "App Development",
  "Python",
  "Java",
  "Data Science",
  "Machine Learning",
];

const courses = [
  {
    title: "Complete Web Development Bootcamp 2026",
    category: "Web Development",
    lessons: "5 lessons",
    instructor: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    description:
      "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real projects from scratch.",
  },
  {
    title: "React Native - Build Mobile Apps",
    category: "App Development",
    lessons: "4 lessons",
    instructor: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn to build cross-platform mobile applications using React Native. Create iOS and Android apps with one codebase.",
  },
  {
    title: "Python for Data Science & Machine Learning",
    category: "Python",
    lessons: "4 lessons",
    instructor: "Dr. Emily Watson",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    description:
      "Comprehensive Python course covering data analysis, visualization, machine learning, and practical notebooks.",
  },
  {
    title: "Java Programming Masterclass",
    category: "Java",
    lessons: "4 lessons",
    instructor: "David Kumar",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    description:
      "From basics to advanced Java concepts. Learn OOP, collections, multithreading, and build complete applications.",
  },
  {
    title: "Advanced JavaScript & TypeScript",
    category: "Web Development",
    lessons: "3 lessons",
    instructor: "Alex Martinez",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
    description:
      "Deep dive into modern JavaScript and TypeScript. Learn advanced concepts, design patterns, and production tooling.",
  },
  {
    title: "Flutter App Development",
    category: "App Development",
    lessons: "3 lessons",
    instructor: "Lisa Park",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
    description:
      "Build beautiful native apps on iOS and Android from a single codebase with Flutter and Dart.",
  },
];

export const metadata = {
  title: "Courses - EduFlow",
};

export default function CoursesPage() {
  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-black tracking-[-0.02em] text-slate-950">
          All Courses
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore our entire course catalog
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="relative block">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            className="w-full rounded-lg border border-slate-100 bg-slate-100 px-11 py-3 text-sm outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
            placeholder="Search courses..."
          />
        </label>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                index === 0
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600"
              }`}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, index) => (
          <article
            key={course.title}
            className="landing-card reveal overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div
              className="relative h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${course.image})` }}
            >
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-900 shadow-sm">
                {course.category}
              </span>
            </div>
            <div className="p-5">
              <h2 className="min-h-10 text-base font-black leading-tight text-slate-950">
                {course.title}
              </h2>
              <p className="mt-4 min-h-14 text-xs leading-5 text-slate-500">
                {course.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <BookSmallIcon />
                {course.lessons}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                by {course.instructor}
              </p>
              <Link
                href="/user/courses"
                className="mt-4 inline-flex w-full justify-center rounded-lg bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                View Course
              </Link>
            </div>
          </article>
        ))}
      </section>
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

function BookSmallIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 5.75A2.75 2.75 0 0 1 7.75 3H19v14.5H7.75A2.75 2.75 0 0 0 5 20.25V5.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
