"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../../components/Header";

const benefits = [
  "Access 2 free courses instantly",
  "Earn industry recognized certificates",
  "Learn at your own pace with no deadlines",
  "Join 42,000+ learners worldwide",
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/user/dashboard");
  }

  return (
    <>
      <Header />
      <main className="h-[calc(100vh-64px)] overflow-hidden bg-white text-slate-950">
        <div className="grid h-full lg:grid-cols-2">
          <section className="relative hidden overflow-hidden bg-blue-700 px-8 py-8 text-white lg:block">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(135deg,rgba(37,99,235,0.96),rgba(30,64,175,0.96))]" />
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
                  Start learning today, for free.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-6 text-blue-50">
                  Create your free EduFlow account and unlock access to hundreds
                  of courses and certifications.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-blue-50">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/35 text-[10px] font-black">
                        OK
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
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
                  Start learning today, for free.
                </h1>
              </div>

              <h2 className="text-[28px] font-black tracking-[-0.03em]">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                It&apos;s free. No credit card required.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <Field label="Full name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="auth-input"
                    placeholder="Enter your name"
                  />
                </Field>

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
                    placeholder="Create a strong password"
                    type="password"
                  />
                </Field>

                <Field label="Confirm password">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="auth-input"
                    placeholder="Re-enter your password"
                    type="password"
                  />
                </Field>

                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <input
                    required
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="font-semibold text-blue-600">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-semibold text-blue-600">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-black text-blue-600">
                  Sign in
                </Link>
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
