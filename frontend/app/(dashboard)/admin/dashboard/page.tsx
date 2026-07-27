const stats = [
  { title: "Total Users", value: "1,248", icon: "users", tone: "blue" },
  { title: "Active Members", value: "684", icon: "member", tone: "emerald" },
  { title: "Free Users", value: "564", icon: "free", tone: "sky" },
  { title: "Courses", value: "32", icon: "course", tone: "violet" },
  { title: "Certificates", value: "512", icon: "certificate", tone: "amber" },
  { title: "Revenue", value: "NPR 2.1M", icon: "revenue", tone: "rose" },
];

const growth = [
  { month: "Aug", value: 410 },
  { month: "Sep", value: 455 },
  { month: "Oct", value: 500 },
  { month: "Nov", value: 520 },
  { month: "Dec", value: 545 },
  { month: "Jan", value: 565 },
];

const payments = [
  { user: "Ram Sharma", initials: "RS", transaction: "EDU-10234", method: "eSewa", amount: "NPR 2,999", status: "Successful", color: "bg-cyan-600" },
  { user: "Sita Rai", initials: "SR", transaction: "EDU-10235", method: "Khalti", amount: "NPR 2,999", status: "Pending", color: "bg-red-600" },
  { user: "Arjun Karki", initials: "AK", transaction: "EDU-10236", method: "Bank Transfer", amount: "NPR 2,999", status: "Successful", color: "bg-red-600" },
  { user: "Mina Thapa", initials: "MT", transaction: "EDU-10237", method: "eSewa", amount: "NPR 1,499", status: "Successful", color: "bg-indigo-600" },
  { user: "Nabin Gurung", initials: "NG", transaction: "EDU-10238", method: "Khalti", amount: "NPR 1,499", status: "Failed", color: "bg-slate-700" },
].slice(0, 5);

export const metadata = {
  title: "Admin Dashboard - EduFlow",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <div className="mt-2 text-2xl font-bold text-slate-950">
                  {item.value}
                </div>
              </div>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconTone(
                  item.tone,
                )}`}
              >
                <StatIcon name={item.icon} />
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">User Growth</h2>
          <div className="mt-5 grid h-[205px] grid-cols-[48px_1fr] grid-rows-[1fr_auto]">
            <div className="relative row-start-1 text-sm font-medium text-slate-400">
              {[800, 600, 400, 200, 0].map((label, index) => (
                <span
                  key={label}
                  className="absolute right-3 -translate-y-1/2"
                  style={{ top: `${index * 25}%` }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="relative row-start-1 overflow-hidden border-l border-b border-dashed border-slate-100 bg-[linear-gradient(to_bottom,rgba(226,232,240,0.6)_1px,transparent_1px),linear-gradient(to_right,rgba(226,232,240,0.45)_1px,transparent_1px)] bg-[size:100%_25%,16.666%_100%] px-3">
              <div className="flex h-full items-end justify-between gap-5">
                {growth.map((item) => (
                  <div key={item.month} className="flex h-full flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-12 rounded-t-[4px] bg-blue-600"
                      style={{ height: `${(item.value / 800) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-start-2 row-start-2 flex justify-between px-3 pt-2 text-sm font-medium text-slate-400">
              {growth.map((item) => (
                <span key={item.month} className="flex-1 text-center">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">Users</h2>
          <div className="mt-6 flex justify-center">
            <div className="h-32 w-32 rounded-full bg-[conic-gradient(#2563eb_0_86.9%,#e2e8f0_86.9%_100%)] p-6">
              <div className="h-full w-full rounded-full bg-white" />
            </div>
          </div>
          <div className="mt-7 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Active
              </span>
              <span className="font-semibold text-slate-950">1,084</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                Inactive
              </span>
              <span className="font-semibold text-slate-950">164</span>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-950">Recent Payments</h2>
          <a href="/admin/memberships" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </a>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[760px] w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr key={payment.transaction}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${payment.color}`}>
                        {payment.initials}
                      </span>
                      <span className="font-semibold text-slate-950">{payment.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-950">{payment.transaction}</td>
                  <td className="px-4 py-3 text-slate-950">{payment.method}</td>
                  <td className="px-4 py-3 font-bold text-slate-950">{payment.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusTone(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function iconTone(tone: string) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    sky: "bg-sky-50 text-sky-600",
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return tones[tone] ?? tones.blue;
}

function statusTone(status: string) {
  if (status === "Successful") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "Pending") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-red-50 text-red-700";
}

function StatIcon({ name }: { name: string }) {
  const common = "h-5 w-5";

  if (name === "users") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M15 14a5.5 5.5 0 0 1 6 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "member") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="m16.5 5.5 1 2 2.2.3-1.6 1.6.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.6 2.2-.3 1-2Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "free") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M7 11V8a5 5 0 0 1 9.6-2M6 11h12v9H6v-9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "course") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M5 5.75A2.75 2.75 0 0 1 7.75 3H19v14.5H7.75A2.75 2.75 0 0 0 5 20.25V5.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "certificate") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M9 8h6M9 12h6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <path d="M4 7h16v10H4V7Zm4 5h.01M16 12h.01M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
