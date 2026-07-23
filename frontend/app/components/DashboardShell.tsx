"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

const navItems = [
  { label: "Dashboard", href: "/user/dashboard", icon: "grid" },
  { label: "Courses", href: "/user/courses", icon: "book" },
  { label: "My Learning", href: "/user/learning", icon: "cap" },
  { label: "Membership", href: "/user/membership", icon: "card" },
  { label: "Announcements", href: "/user/announcements", icon: "megaphone" },
  { label: "Profile", href: "/user/profile", icon: "user" },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[220px] border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <Link
          href="/"
          className="flex h-14 items-center gap-2.5 border-b border-slate-200 px-5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BookIcon />
          </span>
          <span className="text-lg font-black">EduFlow</span>
        </Link>

        <nav className="flex-1 space-y-2 px-3 py-5">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <DashboardIcon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600"
          >
            <DashboardIcon name="logout" />
            Logout
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[220px]">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-6">
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BookIcon />
            </span>
            <span className="font-black">EduFlow</span>
          </Link>
          <div className="hidden text-base font-black lg:block">
            EduFlow Learning Platform
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
            S
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px]"
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
  );
}

function DashboardIcon({ name }: { name: string }) {
  const common = "h-4 w-4";

  if (name === "grid") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "cap") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="m3 8.5 9-4 9 4-9 4-9-4Z M7 11v4c2.8 2 7.2 2 10 0v-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "card") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M4 6h16v12H4V6Zm0 4h16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "megaphone") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M4 13h3l9 4V7l-9 4H4v2Zm3 0 1.5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <path d="M10 17H5V7h5M14 8l4 4-4 4M18 12H9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
