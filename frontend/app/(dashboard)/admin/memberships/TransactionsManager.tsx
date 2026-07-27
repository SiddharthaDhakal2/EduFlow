"use client";

import { useMemo, useState } from "react";

type TransactionStatus = "Paid" | "Pending" | "Failed";

type Transaction = {
  id: string;
  user: string;
  email: string;
  course: string;
  amount: number;
  method: string;
  date: string;
  status: TransactionStatus;
};

const transactions: Transaction[] = [
  { id: "TXN-2401", user: "Siddhartha Dhakal", email: "student@eduflow.com", course: "Complete Web Development Bootcamp", amount: 2499, method: "eSewa", date: "Jul 26, 2026", status: "Paid" },
  { id: "TXN-2402", user: "Maya Gurung", email: "maya@example.com", course: "Python for Data Science", amount: 2499, method: "Khalti", date: "Jul 25, 2026", status: "Paid" },
  { id: "TXN-2403", user: "Aarav Sharma", email: "aarav@example.com", course: "React Native - Build Mobile Apps", amount: 1999, method: "Card", date: "Jul 24, 2026", status: "Pending" },
  { id: "TXN-2404", user: "Nisha Thapa", email: "nisha@example.com", course: "Flutter App Development", amount: 1999, method: "eSewa", date: "Jul 23, 2026", status: "Failed" },
  { id: "TXN-2405", user: "Rohan Chettri", email: "rohan@example.com", course: "Java Programming Masterclass", amount: 1499, method: "Bank Transfer", date: "Jul 22, 2026", status: "Paid" },
  { id: "TXN-2406", user: "Priyanka Rai", email: "priyanka@example.com", course: "Advanced JavaScript & TypeScript", amount: 1499, method: "Khalti", date: "Jul 21, 2026", status: "Paid" },
];

const statuses = ["All statuses", "Paid", "Pending", "Failed"];

export default function TransactionsManager() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(statuses[0]);

  const visibleTransactions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        transaction.user.toLowerCase().includes(normalizedQuery) ||
        transaction.email.toLowerCase().includes(normalizedQuery) ||
        transaction.course.toLowerCase().includes(normalizedQuery) ||
        transaction.id.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "All statuses" || transaction.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const paidTransactions = transactions.filter((transaction) => transaction.status === "Paid");
  const pendingCount = transactions.filter((transaction) => transaction.status === "Pending").length;
  const failedCount = transactions.filter((transaction) => transaction.status === "Failed").length;
  const totalRevenue = paidTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Transactions</h1>
        <p className="mt-1 text-sm text-slate-500">
          View all course purchase transactions.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Revenue" value={`NPR ${totalRevenue.toLocaleString()}`} tone="blue" icon="revenue" />
        <SummaryCard label="Paid Transactions" value={paidTransactions.length.toString()} tone="emerald" icon="paid" />
        <SummaryCard label="Pending" value={pendingCount.toString()} tone="amber" icon="pending" />
        <SummaryCard label="Failed" value={failedCount.toString()} tone="red" icon="failed" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px]">
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-11 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              placeholder="Search transactions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <Select label="Status filter" value={status} options={statuses} onChange={setStatus} />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[0.8fr_1.2fr_1.5fr_0.7fr_0.7fr_0.8fr_0.7fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 xl:grid">
          <span>ID</span>
          <span>User</span>
          <span>Course</span>
          <span>Amount</span>
          <span>Method</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-slate-100">
          {visibleTransactions.map((transaction) => (
            <article
              key={transaction.id}
              className="grid gap-4 px-5 py-4 text-sm xl:grid-cols-[0.8fr_1.2fr_1.5fr_0.7fr_0.7fr_0.8fr_0.7fr] xl:items-center"
            >
              <TableCell label="ID">{transaction.id}</TableCell>
              <div>
                <h2 className="font-bold text-slate-950">{transaction.user}</h2>
                <p className="mt-1 text-xs text-slate-500">{transaction.email}</p>
              </div>
              <TableCell label="Course">{transaction.course}</TableCell>
              <TableCell label="Amount">NPR {transaction.amount.toLocaleString()}</TableCell>
              <TableCell label="Method">{transaction.method}</TableCell>
              <TableCell label="Date">{transaction.date}</TableCell>
              <div className="flex items-center justify-between xl:block">
                <span className="text-xs font-bold text-slate-400 xl:hidden">Status</span>
                <span className={`rounded-md px-2 py-1 text-xs font-bold ${statusClass(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}

function SummaryCard({ label, value, icon, tone }: { label: string; value: string; icon: string; tone: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClass(tone)}`}>
          <MetricIcon name={icon} />
        </span>
      </div>
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TableCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-slate-600 xl:block">
      <span className="text-xs font-bold text-slate-400 xl:hidden">{label}</span>
      <span className="font-medium xl:font-normal">{children}</span>
    </div>
  );
}

function statusClass(status: TransactionStatus) {
  if (status === "Paid") return "bg-emerald-50 text-emerald-700";
  if (status === "Pending") return "bg-orange-50 text-orange-700";
  return "bg-red-50 text-red-700";
}

function toneClass(tone: string) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };
  return tones[tone] ?? tones.blue;
}

function MetricIcon({ name }: { name: string }) {
  if (name === "paid") return <CheckIcon />;
  if (name === "pending") return <ClockIcon />;
  if (name === "failed") return <AlertIcon />;
  return <RevenueIcon />;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m21 21-4.5-4.5M10.75 18.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 4v16M6 8.5h8.5a3 3 0 0 1 0 6H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 8v5m0 3h.01M10.3 4.3 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
