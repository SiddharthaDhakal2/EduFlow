export const metadata = {
  title: "My Profile - EduFlow",
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl space-y-5">
      <section>
        <h1 className="text-2xl font-black tracking-[-0.02em] text-slate-950">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account information
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-medium text-white">
            S
          </div>
          <div>
            <h2 className="text-xl font-black leading-tight text-slate-950">
              Siddhartha Dhakal
            </h2>
            <p className="text-sm text-slate-500">student@eduflow.com</p>
            <span className="mt-1 inline-flex rounded-md bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-white">
              Active Member
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionTitle
          icon={<UserIcon />}
          title="Profile Information"
          description="Update your personal information"
        />

        <form className="mt-5 space-y-4">
          <Field label="Full Name" defaultValue="Siddhartha Dhakal" />
          <Field label="Email Address" defaultValue="student@eduflow.com" />
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            <SaveIcon />
            Save Changes
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionTitle icon={<CardIcon />} title="Membership Details" />

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarIcon />
              <span>Member Since</span>
            </div>
            <p className="mt-3 text-sm font-black text-slate-950">
              2025-01-15
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarIcon />
              <span>Membership Expires</span>
            </div>
            <p className="mt-3 text-sm font-black text-slate-950">
              2027-01-15
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionTitle
          icon={<LockIcon />}
          title="Change Password"
          description="Update your password to keep your account secure"
        />

        <form className="mt-5 space-y-4">
          <Field label="Current Password" type="password" />
          <Field label="New Password" type="password" />
          <Field label="Confirm New Password" type="password" />
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            <LockIcon small />
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-black text-slate-950">
        {icon}
        <h2>{title}</h2>
      </div>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-950">{label}</span>
      <input
        className="mt-1 w-full rounded-md border border-transparent bg-slate-100 px-3 py-2 text-xs text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
        defaultValue={defaultValue}
        type={type}
      />
    </label>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 4h12l2 2v14H5V4Zm3 0v6h8V4M8 20v-6h8v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7h16v10H4V7Zm0 3h16"
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

function LockIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={small ? "h-3.5 w-3.5" : "h-4 w-4"}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2M5 10h14v10H5V10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
