import Link from "next/link";

const benefits = [
  "Unlimited access to all courses",
  "New courses added regularly",
  "Download course materials",
  "Track your learning progress",
  "Certificate of completion",
  "Priority support",
];

export const metadata = {
  title: "Membership - EduFlow",
};

export default function MembershipPage() {
  return (
    <div className="max-w-3xl space-y-5">
      <section>
        <h1 className="text-2xl font-black tracking-[-0.02em] text-slate-950">
          Membership
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your EduFlow Premium Subscription
        </p>
      </section>

      <section className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-xl font-black tracking-[-0.01em] text-slate-950">
              EduFlow Premium
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Unlimited access to all courses
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white">
            Not Active
          </span>
        </div>

        <Link
          href="/#pricing"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
        >
          <CardIcon />
          Buy Membership
        </Link>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-950">
          Membership Benefits
        </h2>
        <div className="mt-5 grid gap-x-16 gap-y-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 text-sm text-slate-600"
            >
              <CheckIcon />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-950">Pricing</h2>
        <p className="mt-1 text-sm text-slate-500">
          Simple, transparent pricing
        </p>
        <div className="mt-6 flex items-end gap-1 text-slate-950">
          <span className="text-4xl font-black tracking-[-0.03em]">
            NPR 2,999
          </span>
          <span className="pb-1 text-lg text-slate-600">/ year</span>
        </div>
      </section>
    </div>
  );
}

function CardIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7h16v10H4V7Zm0 3h16M7 14h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m8 12 2.5 2.5L16 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
