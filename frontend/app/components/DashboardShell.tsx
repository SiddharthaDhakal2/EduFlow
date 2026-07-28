"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { apiFetch, clearSession, getStoredUser, mediaUrl, type User } from "../lib/api";
import { showToast } from "../lib/toast";

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
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    function syncUser() {
      const nextUser = getStoredUser();
      setUser(nextUser);
      if (!nextUser) router.push("/login");
      if (nextUser?.role === "admin") router.push("/admin/dashboard");
    }

    syncUser();
    window.addEventListener("eduflow-auth-updated", syncUser);
    return () => window.removeEventListener("eduflow-auth-updated", syncUser);
  }, [router]);

  function logout() {
    apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    clearSession();
    showToast("Logged out successfully.");
    router.push("/");
  }

  if (user?.role !== "user") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-sm font-semibold text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-55 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <Link
          href="/"
          className="flex h-14 items-center gap-2.5 border-b border-slate-200 px-5"
        >
          <img alt="EduFlow" className="h-8 w-8" src="/eduflow-logo.svg" />
          <span className="text-lg font-bold">EduFlow</span>
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
          <button
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600"
            type="button"
            onClick={() => setShowLogoutModal(true)}
          >
            <DashboardIcon name="logout" />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-55">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-6">
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <img alt="EduFlow" className="h-8 w-8" src="/eduflow-logo.svg" />
            <span className="font-bold">EduFlow</span>
          </Link>
          <div className="hidden text-base font-bold lg:block">
            EduFlow Learning Platform
          </div>
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-sm font-bold text-white">
            {user?.profileImage ? (
              <img alt={user.name} className="h-full w-full object-cover" src={mediaUrl(user.profileImage)} />
            ) : (
              user?.avatar || "U"
            )}
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-6 lg:px-6">{children}</main>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Logout?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Are you sure you want to logout?
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <DashboardIcon name="logout" />
              </span>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                type="button"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
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
