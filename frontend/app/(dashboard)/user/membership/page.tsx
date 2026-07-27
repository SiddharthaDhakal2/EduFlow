import Link from "next/link";

const membershipBenefits = [
  "Unlimited access to all courses",
  "Download course materials",
  "Certificate of completion",
  "New courses added regularly",
  "Track your learning progress",
  "Priority support",
];

const paymentHistory: PaymentRecord[] = [];

const membership = {
  active: false,
  startDate: "2026-01-15",
  expiryDate: "2027-01-15",
};

type PaymentRecord = {
  invoice: string;
  plan: string;
  amount: string;
  date: string;
  status: string;
};

export const metadata = {
  title: "Membership - EduFlow",
};

export default function MembershipPage() {
  return (
    <div className="max-w-6xl space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Membership</h1>
        <p className="mt-1 text-sm text-slate-500">Your EduFlow Premium Subscription</p>
      </section>

      <section
        className={`rounded-xl border p-5 ${
          membership.active
            ? "border-emerald-300 bg-emerald-50/50"
            : "border-blue-200 bg-blue-50/40"
        }`}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-xl font-bold text-slate-950">EduFlow Premium</h2>
            <p className="mt-2 text-sm text-slate-500">Unlimited access to all courses</p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-white ${
              membership.active ? "bg-emerald-600" : "bg-slate-950"
            }`}
          >
            {membership.active ? <CheckSmallIcon /> : null}
            {membership.active ? "Active" : "Not Active"}
          </span>
        </div>

        {membership.active ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <CalendarIcon />
                Start Date
              </div>
              <p className="mt-1 text-sm font-bold text-slate-950">{membership.startDate}</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <CalendarIcon />
                Expiry Date
              </div>
              <p className="mt-1 text-sm font-bold text-slate-950">{membership.expiryDate}</p>
            </div>
          </div>
        ) : (
          <Link
            href="/user/membership"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <CardIcon />
            Buy Membership
          </Link>
        )}
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-950">Membership Benefits</h2>
          <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {membershipBenefits.map((benefit) => (
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
          <p className="mt-1 text-sm text-slate-500">Simple, transparent pricing</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
              <p className="text-sm font-bold text-slate-950">Monthly Subscription</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold text-slate-950">NPR 500</span>
                <span className="pb-1 text-sm font-semibold text-slate-500">/ month</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-bold text-slate-950">Yearly Subscription</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold text-slate-950">NPR 2,999</span>
                <span className="pb-1 text-sm font-semibold text-slate-500">/ year</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {paymentHistory.length > 0 ? (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-sm font-bold text-slate-950">Payment History</h2>
            <p className="mt-1 text-sm text-slate-500">Your recent membership payments</p>
          </div>

          <div className="hidden grid-cols-[1fr_1.2fr_0.8fr_0.8fr_0.6fr] gap-4 bg-blue-50/50 px-5 py-3 text-xs font-bold uppercase text-slate-500 md:grid">
            <span>Invoice</span>
            <span>Plan</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-slate-100">
            {paymentHistory.map((payment) => (
              <div
                key={payment.invoice}
                className="grid gap-3 p-5 text-sm md:grid-cols-[1fr_1.2fr_0.8fr_0.8fr_0.6fr] md:items-center"
              >
                <div>
                  <p className="font-bold text-slate-950">{payment.invoice}</p>
                  <p className="mt-1 text-xs text-slate-500 md:hidden">Invoice</p>
                </div>
                <p className="font-semibold text-slate-700">{payment.plan}</p>
                <p className="font-bold text-slate-950">{payment.amount}</p>
                <p className="text-slate-500">{payment.date}</p>
                <span className="w-fit rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
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

function CalendarIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
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
