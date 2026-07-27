import Footer from "../components/Footer";
import Header from "../components/Header";
import TestimonialsCarousel from "./TestimonialsCarousel";

const courses = [
  {
    title: "Full-Stack Mastery: MERN",
    category: "Web Development",
    description: "Build complete web applications with MongoDB, Express, React, and Node.js.",
    instructor: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    lessons: 42,
    duration: "12 hours",
    level: "Advanced",
    access: "Paid",
  },
  {
    title: "Modern UI/UX with Figma",
    category: "Design",
    description: "Design clean interfaces, reusable components, and modern product flows.",
    instructor: "Priyanka Sharma",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    lessons: 31,
    duration: "9 hours",
    level: "Intermediate",
    access: "Free",
  },
  {
    title: "Video Editing for Creators",
    category: "Media",
    description: "Learn editing workflow, cuts, color, audio, and export for online content.",
    instructor: "Rohan Chettri",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
    lessons: 28,
    duration: "8 hours",
    level: "Beginner",
    access: "Free",
  },
  {
    title: "JavaScript Deep Dive",
    category: "Programming",
    description: "Master JavaScript fundamentals, async patterns, DOM work, and practical projects.",
    instructor: "Alex Martinez",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    lessons: 36,
    duration: "10 hours",
    level: "Intermediate",
    access: "Paid",
  },
  {
    title: "Freelancing from Scratch",
    category: "Career",
    description: "Set up your portfolio, find clients, price your work, and manage projects.",
    instructor: "Lisa Park",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    lessons: 24,
    duration: "7 hours",
    level: "Beginner",
    access: "Paid",
  },
  {
    title: "AI Tools for Productivity",
    category: "AI",
    description: "Use modern AI tools to plan, write, research, automate, and work faster.",
    instructor: "Dr. Emily Watson",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    lessons: 20,
    duration: "6 hours",
    level: "Beginner",
    access: "Free",
  },
];

const benefits = [
  {
    number: "01",
    title: "Expert Instructors",
    text: "Learn from practitioners who explain concepts with real examples.",
  },
  {
    number: "02",
    title: "Flexible Learning",
    text: "Study at your own pace with lessons available whenever you need them.",
  },
  {
    number: "03",
    title: "Project-Based Courses",
    text: "Build practical work that helps you apply each skill confidently.",
  },
  {
    number: "04",
    title: "Community Support",
    text: "Ask questions, share progress, and learn with other motivated learners.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "NPR 0",
    period: "",
    text: "Perfect for exploring EduFlow for the first time.",
    features: ["Access to 2 free courses", "Community forum access", "Progress tracking"],
    cta: "Get Started Free",
  },
  {
    name: "Pro Yearly",
    price: "NPR 2,999",
    period: "/ year",
    text: "For serious learners who want full access and certifications.",
    features: [
      "Unlimited course access",
      "Industry certifications",
      "Downloadable resources",
      "1 year unlimited access",
    ],
    cta: "Start Yearly Plan",
    featured: true,
  },
  {
    name: "Monthly",
    price: "NPR 500",
    period: "/ month",
    text: "Full pro access billed monthly.",
    features: [
      "Unlimited course access",
      "Industry certifications",
      "Downloadable resources",
      "1 month unlimited access",
    ],
    cta: "Start Monthly Plan",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-950">
        <section
          id="home"
          className="hero-motion relative flex min-h-[320px] items-center justify-center overflow-hidden bg-cover bg-center px-5 text-center text-white md:min-h-[380px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.42), rgba(0,0,0,.78)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=85')",
          }}
        >
          <div className="hero-copy max-w-2xl pt-2">
            <p className="mx-auto mb-4 w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
              Learn without limits
            </p>
            <h1 className="text-[36px] font-bold leading-[1.02] tracking-[-0.02em] drop-shadow-lg md:text-[52px]">
              Find Your Perfect Course
              <br />
              on EduFlow
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-sm font-medium leading-6 text-white/85 md:text-base">
              Unlock your potential with our curated courses designed to help
              you learn faster, grow stronger, and reach your goals.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#courses"
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore Courses
              </a>
              <a
                href="#pricing"
                className="rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle title="Featured Courses" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className="landing-card reveal group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <div
                    className="h-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-blue-700 shadow-sm">
                    {course.category}
                  </span>
                  <span className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm ${course.access === "Free" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}>
                    {course.access}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 min-h-10 overflow-hidden text-base font-bold leading-tight text-slate-950">{course.title}</h3>
                  <p className="mt-2 line-clamp-2 min-h-10 overflow-hidden text-sm leading-5 text-slate-500">{course.description}</p>

                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-slate-800">{course.instructor}</p>
                      <span className="shrink-0 rounded-md bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>

                  <a
                    href={course.access === "Free" ? "#courses" : "#pricing"}
                    className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Enroll Now
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm font-bold text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              View All Courses
              <ArrowRightIcon />
            </a>
          </div>
        </section>

        <section id="about" className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle
              eyebrow="Our Benefits"
              title="Why Choose EduFlow?"
              subtitle="Everything you need to learn, build skills, and move forward."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((item, index) => (
                <div
                  key={item.title}
                  className="landing-card reveal rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                    {item.number}
                  </div>
                  <h3 className="mt-4 text-[14px] font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle eyebrow="Pricing" title="Simple, Transparent Pricing" />
          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`landing-card reveal relative flex min-h-[350px] flex-col rounded-xl border p-6 shadow-sm ${
                  plan.featured
                    ? "scale-[1.03] border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200"
                    : "border-slate-200 bg-white text-slate-950"
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {plan.featured ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold text-slate-950">
                    Most Popular
                  </div>
                ) : null}
                <h3 className="text-base font-bold">{plan.name}</h3>
                <p
                  className={`mt-2 min-h-10 text-sm leading-5 ${
                    plan.featured ? "text-blue-50" : "text-slate-500"
                  }`}
                >
                  {plan.text}
                </p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-3xl font-bold tracking-[-0.02em]">
                    {plan.price}
                  </span>
                  {plan.period ? (
                    <span className={`pb-1 text-sm ${plan.featured ? "text-blue-50" : "text-slate-500"}`}>
                      {plan.period}
                    </span>
                  ) : null}
                </div>
                <ul
                  className={`mt-7 space-y-3 text-sm ${
                    plan.featured ? "text-blue-50" : "text-slate-600"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <PricingCheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#courses"
                  className={`mt-auto inline-flex w-full justify-center rounded-lg px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                    plan.featured
                      ? "bg-white text-blue-600"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 pt-3">
          <SectionTitle eyebrow="Testimonials" title="What Our Learners Say" />
          <TestimonialsCarousel />
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="reveal text-center">
      {eyebrow ? (
        <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-[28px] font-bold tracking-[-0.02em] text-slate-950">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-2 max-w-lg text-[12px] leading-5 text-slate-500">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PricingCheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
