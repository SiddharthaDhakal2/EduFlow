import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
        <Link href="/" className="flex w-fit items-center gap-2.5">
          <img
            alt="EduFlow"
            className="h-10 w-10"
            src="/eduflow-logo.svg"
          />
          <span className="text-lg font-bold text-slate-900">EduFlow</span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-slate-600 md:flex">
          <Link
            href="/#home"
            className="transition hover:-translate-y-0.5 hover:text-slate-950"
          >
            Home
          </Link>
          <Link
            href="/#courses"
            className="transition hover:-translate-y-0.5 hover:text-slate-950"
          >
            Courses
          </Link>
          <Link
            href="/#pricing"
            className="transition hover:-translate-y-0.5 hover:text-slate-950"
          >
            Pricing
          </Link>
          <Link
            href="/#about"
            className="transition hover:-translate-y-0.5 hover:text-slate-950"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-5">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-slate-700 transition hover:text-slate-950 sm:inline"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
