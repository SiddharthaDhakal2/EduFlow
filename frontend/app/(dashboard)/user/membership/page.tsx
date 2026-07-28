"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { showToast } from "../../../lib/toast";

const membershipBenefits = [
  "Unlimited access to all courses",
  "Download course materials",
  "Certificate of completion",
  "New courses added regularly",
  "Track your learning progress",
  "Priority support",
];

type PaymentRecord = {
  id: string;
  course: string;
  amount: number;
  date: string;
  status: string;
};

export default function MembershipPage() {
  const [membership, setMembership] = useState<{ active?: boolean; startDate?: string; expiryDate?: string }>({ active: false });
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<"khalti" | "esewa" | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [modalError, setModalError] = useState("");

  async function loadMembership() {
    const data = await apiFetch<{ membership: typeof membership; payments: PaymentRecord[] }>("/membership");
    setMembership(data.membership);
    setPaymentHistory(data.payments);
  }

  useEffect(() => {
    loadMembership();
  }, []);

  function closePlanModal() {
    setShowPlanModal(false);
    setSelectedPlan(null);
    setSelectedPayment(null);
    setIsPaying(false);
    setModalError("");
  }

  function chooseEsewa() {
    setSelectedPayment("esewa");
    setModalError("");
    showToast("eSewa payment is coming soon.", "info");
  }

  async function buyMembership() {
    if (!selectedPlan || selectedPayment !== "khalti") return;

    setError("");
    setModalError("");
    setIsPaying(true);

    try {
      const data = await apiFetch<{ paymentUrl: string }>("/membership/khalti/initiate", {
        method: "POST",
        body: JSON.stringify({ plan: selectedPlan }),
      });

      if (!data.paymentUrl) {
        throw new Error("Khalti payment URL was not returned.");
      }

      showToast(`${selectedPlan === "monthly" ? "Monthly" : "Yearly"} plan selected. Redirecting to Khalti.`, "info");
      window.location.href = data.paymentUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to start Khalti payment.";
      setError(message);
      setModalError(message);
      setIsPaying(false);
    }
  }

  return (
    <div className="max-w-6xl space-y-5">
      {notice ? <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</div> : null}
      {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div> : null}
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
          <button
            type="button"
            onClick={() => setShowPlanModal(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <CardIcon />
            Buy Membership
          </button>
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
                key={payment.id}
                className="grid gap-3 p-5 text-sm md:grid-cols-[1fr_1.2fr_0.8fr_0.8fr_0.6fr] md:items-center"
              >
                <div>
                  <p className="font-bold text-slate-950">{payment.id}</p>
                  <p className="mt-1 text-xs text-slate-500 md:hidden">Invoice</p>
                </div>
                <p className="font-semibold text-slate-700">{payment.course}</p>
                <p className="font-bold text-slate-950">NPR {payment.amount.toLocaleString()}</p>
                <p className="text-slate-500">{payment.date}</p>
                <span className="w-fit rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {showPlanModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 py-6 backdrop-blur-[8px]">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Buy EduFlow Premium</h2>
                <p className="mt-1 text-sm text-slate-500">Choose your plan and payment method to continue.</p>
              </div>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                type="button"
                onClick={closePlanModal}
              >
                x
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <CardIcon />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950">Premium includes every paid course</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Learn without limits, keep progress tracking, and unlock certificates while your membership is active.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-bold text-slate-950">1. Select plan</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <PlanButton
                amount="NPR 500"
                disabled={isPaying}
                label="Monthly"
                selected={selectedPlan === "monthly"}
                period="/ month"
                detail="Best for short-term learning goals"
                onClick={() => setSelectedPlan("monthly")}
              />
              <PlanButton
                amount="NPR 2,999"
                disabled={isPaying}
                label="Yearly"
                selected={selectedPlan === "yearly"}
                period="/ year"
                detail="Best value for long-term access"
                badge="Save more"
                onClick={() => setSelectedPlan("yearly")}
              />
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-bold text-slate-950">2. Select payment method</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <PaymentButton
                  label="Khalti"
                  description="Pay securely using Khalti sandbox."
                  selected={selectedPayment === "khalti"}
                  disabled={isPaying}
                  onClick={() => {
                    setSelectedPayment("khalti");
                    setModalError("");
                  }}
                />
                <PaymentButton
                  label="eSewa"
                  description="This payment option will be available soon."
                  selected={selectedPayment === "esewa"}
                  disabled={isPaying}
                  onClick={chooseEsewa}
                />
              </div>
            </div>

            {modalError ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {modalError}
              </div>
            ) : null}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                type="button"
                onClick={closePlanModal}
              >
                Cancel
              </button>
              <button
                className="h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!selectedPlan || selectedPayment !== "khalti" || isPaying}
                type="button"
                onClick={buyMembership}
              >
                {isPaying ? "Redirecting..." : "Continue to Khalti"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PlanButton({
  amount,
  badge,
  detail,
  disabled,
  label,
  period,
  selected,
  onClick,
}: {
  amount: string;
  badge?: string;
  detail: string;
  disabled: boolean;
  label: string;
  period: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`relative rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
        selected ? "border-blue-500 bg-blue-50 ring-4 ring-blue-600/10" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
      }`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {badge ? (
        <span className="absolute right-3 top-3 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
      <p className="text-sm font-bold text-slate-950">{label} Subscription</p>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-2xl font-bold text-slate-950">{amount}</span>
        <span className="pb-1 text-sm font-semibold text-slate-500">{period}</span>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500">{detail}</p>
    </button>
  );
}

function PaymentButton({
  description,
  disabled,
  label,
  onClick,
  selected,
}: {
  description: string;
  disabled: boolean;
  label: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      className={`rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
        selected ? "border-blue-500 bg-blue-50 ring-4 ring-blue-600/10" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
      }`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-950">{label}</span>
        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-transparent"}`}>
          <CheckSmallIcon />
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
    </button>
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
