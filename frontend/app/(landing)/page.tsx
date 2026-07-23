import Footer from "../components/Footer";
import Header from "../components/Header";

const courses = [
  {
    title: "Full-Stack Mastery: MERN",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    lessons: "42 lessons",
    level: "Advanced",
    tag: "Popular",
  },
  {
    title: "Modern UI/UX with Figma",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
    lessons: "31 lessons",
    level: "Intermediate",
    tag: "New",
  },
  {
    title: "Video Editing for Creators",
    category: "Media",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
    rating: "4.7",
    lessons: "28 lessons",
    level: "Beginner",
    tag: "Trending",
  },
  {
    title: "JavaScript Deep Dive",
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    lessons: "36 lessons",
    level: "Intermediate",
    tag: "Hot",
  },
  {
    title: "Freelancing from Scratch",
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
    lessons: "24 lessons",
    level: "Beginner",
    tag: "Starter",
  },
  {
    title: "AI Tools for Productivity",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    lessons: "20 lessons",
    level: "Beginner",
    tag: "Featured",
  },
];

const platformCards = [
  {
    number: "01",
    title: "Comprehensive Library",
    text: "Access well-organized courses across technology, design, business, and career skills.",
    color: "text-blue-600",
  },
  {
    number: "02",
    title: "Always Free Access",
    text: "Start learning without hidden setup fees or complicated enrollment steps.",
    color: "text-emerald-600",
  },
  {
    number: "03",
    title: "High Quality Resources",
    text: "Use structured lessons, practical projects, and clear materials built for progress.",
    color: "text-violet-600",
  },
  {
    number: "04",
    title: "Updated Training Paths",
    text: "Follow fresh course paths aligned with current tools and workplace needs.",
    color: "text-orange-500",
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
    text: "Perfect for exploring EduFlow for the first time.",
    features: ["Access to 5 free courses", "Community Q&A access", "Progress tracking"],
    cta: "Start Free",
  },
  {
    name: "Pro Plan",
    price: "NPR 2,999",
    text: "Everything you need to learn faster, earn certificates, and build projects.",
    features: [
      "Unlimited course access",
      "Verified certificates",
      "Priority mentor support",
      "Career-ready projects",
    ],
    cta: "Start Pro Plan",
    featured: true,
  },
  {
    name: "Monthly",
    price: "NPR 500",
    text: "A flexible plan for short-term learning goals.",
    features: ["Monthly course access", "Cancel anytime", "Email support"],
    cta: "Start Monthly Plan",
  },
];

const testimonials = [
  {
    name: "Rohan Chettri",
    role: "Web Developer",
    color: "bg-blue-600",
    quote:
      "EduFlow helped me move step by step. The lessons were clear and the projects made everything easier to remember.",
  },
  {
    name: "Priyanka",
    role: "Designer",
    color: "bg-violet-600",
    quote:
      "I finally understood UI design basics because the course examples were practical and easy to follow.",
  },
  {
    name: "Ramesh Karki",
    role: "Student",
    color: "bg-pink-600",
    quote:
      "The platform made learning feel simple. I liked having everything in one clean place.",
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
            <h1 className="text-[36px] font-black leading-[1.02] tracking-[-0.02em] drop-shadow-lg md:text-[52px]">
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
          <SectionTitle eyebrow="Explore Courses" title="Featured Courses" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className="landing-card reveal group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="overflow-hidden">
                  <div
                    className="relative h-[160px] bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${course.image})` }}
                  >
                    <span className="absolute left-3 top-3 rounded-md bg-blue-600 px-2.5 py-1.5 text-[9px] font-bold uppercase text-white">
                      {course.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase text-blue-600">
                    {course.category}
                  </p>
                  <h3 className="mt-1 min-h-9 text-[15px] font-extrabold leading-[1.2] text-slate-950">
                    {course.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-[11px]">
                    <span className="rounded bg-amber-100 px-2 py-1 font-bold text-amber-700">
                      Rated
                    </span>
                    <span className="font-semibold text-slate-500">
                      {course.rating}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 rounded-lg bg-slate-50 p-3 text-center text-[11px] text-slate-500">
                    <div>
                      <div className="font-black text-slate-950">
                        {course.rating}
                      </div>
                      <div>Rating</div>
                    </div>
                    <div className="border-x border-slate-200">
                      <div className="font-black text-slate-950">
                        {course.lessons.split(" ")[0]}
                      </div>
                      <div>Lessons</div>
                    </div>
                    <div>
                      <div className="font-black text-slate-950">8</div>
                      <div>Weeks</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase text-blue-600">
                      {course.level}
                    </span>
                    <a
                      href="#pricing"
                      className="rounded-md bg-blue-600 px-4 py-2 text-[10px] font-bold text-white transition hover:bg-blue-700"
                    >
                      View Course
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="#pricing"
              className="inline-flex rounded-lg border border-blue-600 px-5 py-2 text-[11px] font-bold text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              View All Courses -&gt;
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 pt-2">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {platformCards.map((item, index) => (
                <div
                  key={item.title}
                  className="landing-card reveal rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className={`text-xl font-black ${item.color}`}>
                    {item.number}
                  </div>
                  <h3 className="mt-4 text-[14px] font-extrabold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="reveal flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:p-8">
              <p className="text-[10px] font-black uppercase tracking-wide text-blue-600">
                Why EduFlow
              </p>
              <h2 className="mt-2 text-[28px] font-black leading-[1.05] tracking-[-0.02em]">
                One Free, Fully Packed
                <br />
                Learning Platform
              </h2>
              <p className="mt-4 max-w-md text-[12px] leading-6 text-slate-500">
                EduFlow makes learning accessible for all with a simple platform
                that brings courses, resources, and progress together in one
                place.
              </p>
              <ul className="mt-5 space-y-3 text-[12px] font-semibold text-slate-700">
                <li>
                  <span className="text-blue-600">OK</span> Practical courses
                  with structured learning paths
                </li>
                <li>
                  <span className="text-blue-600">OK</span> Progress tools that
                  help learners stay consistent
                </li>
                <li>
                  <span className="text-blue-600">OK</span> Certificates and
                  project work for every major track
                </li>
                <li>
                  <span className="text-blue-600">OK</span> A clean dashboard
                  built for focused study
                </li>
              </ul>
              <a
                href="#courses"
                className="mt-6 inline-flex w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-[11px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Start Learning -&gt;
              </a>
            </div>
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
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-600">
                    {item.number}
                  </div>
                  <h3 className="mt-4 text-[14px] font-extrabold">
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
                className={`landing-card reveal relative rounded-xl border p-6 shadow-sm ${
                  plan.featured
                    ? "scale-[1.02] border-blue-600 bg-blue-600 text-white shadow-blue-200"
                    : "border-slate-200 bg-white text-slate-950"
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {plan.featured ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-black text-slate-950">
                    Popular
                  </div>
                ) : null}
                <h3 className="text-[15px] font-black">{plan.name}</h3>
                <p
                  className={`mt-2 min-h-10 text-[11px] leading-5 ${
                    plan.featured ? "text-blue-50" : "text-slate-500"
                  }`}
                >
                  {plan.text}
                </p>
                <div className="mt-4 text-[25px] font-black tracking-[-0.02em]">
                  {plan.price}
                </div>
                <ul
                  className={`mt-5 space-y-3 text-[12px] ${
                    plan.featured ? "text-white" : "text-slate-600"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature}>OK {feature}</li>
                  ))}
                </ul>
                <a
                  href="#courses"
                  className={`mt-7 inline-flex w-full justify-center rounded-lg px-4 py-2.5 text-[11px] font-black transition hover:-translate-y-0.5 ${
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
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className="landing-card reveal rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="text-[11px] font-bold uppercase tracking-wide text-amber-600">
                  5 star review
                </div>
                <p className="mt-3 min-h-20 text-[12px] leading-6 text-slate-600">
                  &quot;{item.quote}&quot;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${item.color} text-[12px] font-black text-white`}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black">{item.name}</h3>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="reveal text-center">
      <p className="text-[10px] font-black uppercase tracking-wide text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[28px] font-black tracking-[-0.02em] text-slate-950">
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
