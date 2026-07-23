"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../../components/Header";

const stats = [
  { value: "42k+", label: "Learners" },
  { value: "850+", label: "Courses" },
  { value: "4.9", label: "Rating" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/user/dashboard");
  }

  function handleAdminLogin() {
    router.push("/admin/dashboard");
  }

  return (
    <>
      <Header />
      <main className="h-[calc(100vh-64px)] overflow-hidden bg-white text-slate-950">
        <div className="grid h-full lg:grid-cols-2">
          <section className="relative hidden overflow-hidden bg-blue-700 px-8 py-8 text-white lg:block">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-16"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.14),transparent_30%),linear-gradient(135deg,rgba(37,99,235,0.96),rgba(30,64,175,0.96))]" />

            <div className="hero-copy relative mx-auto flex h-full max-w-md flex-col justify-center">
              <Link href="/" className="absolute top-0 flex w-fit items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/15">
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
                <span className="text-xl font-black">EduFlow</span>
              </Link>

              <div>
                <h1 className="max-w-sm text-[34px] font-black leading-tight tracking-[-0.03em]">
                  Welcome back to your learning journey.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-6 text-blue-50">
                  Pick up right where you left off. Your courses, progress, and
                  certificates are waiting.
                </p>

                <div className="mt-8 flex gap-8">
                  {stats.map((item) => (
                    <div key={item.label}>
                      <div className="text-2xl font-black">{item.value}</div>
                      <div className="mt-1 text-xs text-blue-100">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-5 py-4 sm:px-8">
            <div className="reveal w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <p className="text-sm font-bold uppercase text-blue-600">
                  EduFlow
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.03em]">
                  Welcome back.
                </h1>
              </div>

              <h2 className="text-[28px] font-black tracking-[-0.03em]">
                Sign in to EduFlow
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Welcome back! Enter your details below.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <Field label="Email address">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                    placeholder="you@example.com"
                    type="email"
                  />
                </Field>

                <Field label="Password">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                    placeholder="Enter your password"
                    type="password"
                  />
                </Field>

                <div className="text-right">
                  <a href="#" className="text-xs font-bold text-blue-600">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={handleAdminLogin}
                  className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950"
                >
                  Login as Admin
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-black text-blue-600">
                  Create one free
                </Link>
              </p>

              <p className="mt-7 text-center text-xs text-slate-400">
                By signing in, you agree to our{" "}
                <a href="#" className="font-semibold text-blue-600">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-blue-600">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}
