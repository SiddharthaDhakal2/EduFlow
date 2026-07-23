import Link from "next/link";

const learningCourses = [
  {
    title: "Complete Web Development Bootcamp 2026",
    category: "Web Development",
    instructor: "Sarah Johnson",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Python for Data Science & Machine Learning",
    category: "Python",
    instructor: "Dr. Emily Watson",
    progress: 78,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Java Programming Masterclass",
    category: "Java",
    instructor: "David Kumar",
    progress: 23,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
  },
];

export const metadata = {
  title: "My Learning - EduFlow",
};

export default function MyLearningPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-black tracking-[-0.03em] text-slate-950">
          My Learning
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your progress and continue learning
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black tracking-[-0.02em]">
          In Progress
        </h2>

        <div className="grid gap-5 xl:grid-cols-2">
          {learningCourses.map((course, index) => (
            <article
              key={course.title}
              className="landing-card reveal grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:grid-cols-[160px_1fr]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className="min-h-40 bg-cover bg-center sm:min-h-full"
                style={{ backgroundImage: `url(${course.image})` }}
              />
              <div className="p-5">
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-700">
                  {course.category}
                </span>
                <h3 className="mt-3 text-base font-black text-slate-950">
                  {course.title}
                </h3>
                <p className="mt-3 text-sm text-slate-500">
                  {course.instructor}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-slate-950"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  href="/user/courses"
                  className="mt-4 inline-flex w-full justify-center rounded-lg bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
                >
                  Continue Learning
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
