import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Courses", href: "#courses" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Web Development", href: "#courses" },
      { label: "UI/UX Design", href: "#courses" },
      { label: "AI Tools", href: "#courses" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Get Started", href: "/signup" },
      { label: "Dashboard", href: "/user/dashboard" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/25">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 5.75A2.75 2.75 0 0 1 7.75 3H19v14.5H7.75A2.75 2.75 0 0 0 5 20.25V5.75Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 5.75A2.75 2.75 0 0 0 2.25 3H2v14.5h.25A2.75 2.75 0 0 1 5 20.25M8.5 7H16M8.5 10.5H16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <span className="text-xl font-extrabold">EduFlow</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Learn practical skills with focused courses, clear learning paths,
              and a simple platform built for steady progress.
            </p>
            <div className="mt-5 flex gap-3">
              {["f", "in", "x"].map((item) => (
                <a
                  key={item}
                  href="#home"
                  aria-label={`EduFlow social ${item}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-extrabold text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {new Date().getFullYear()} EduFlow. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#home" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#home" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
