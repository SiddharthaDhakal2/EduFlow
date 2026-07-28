"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../../components/Header";
import { apiFetch, type User } from "../../lib/api";
import { showToast } from "../../lib/toast";

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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await apiFetch<{ token: string; user: User }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      showToast(`Account created for ${data.user.email}. Please login.`);
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
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
                <img alt="EduFlow" className="h-9 w-9" src="/eduflow-logo.svg" />
                <span className="text-xl font-bold">EduFlow</span>
              </Link>

              <div>
                <h1 className="max-w-sm text-[34px] font-bold leading-tight tracking-[-0.03em]">
                  Start learning today, for free.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-6 text-blue-50">
                  Create your free EduFlow account and unlock access to hundreds
                  of courses and certifications.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-blue-50">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/35 text-white">
                        <CheckCircleIcon />
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
                <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
                  Start learning today, for free.
                </h1>
              </div>

              <h2 className="text-[28px] font-bold tracking-[-0.03em]">
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
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
              </form>
              {error ? (
                <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                  {error}
                </p>
              ) : null}

              <p className="mt-4 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-blue-600">
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

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path d="m6 12 4 4 8-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
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
