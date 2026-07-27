export const metadata = {
  title: "Admin Profile - EduFlow",
};

export default function AdminProfilePage() {
  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Admin Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account information and password.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              A
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight text-slate-950">Admin User</h2>
              <p className="mt-1 text-sm text-slate-500">admin@eduflow.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ProfileCard icon={<UserIcon />} title="Profile Information">
          <form className="grid gap-4">
            <Field label="Full Name" defaultValue="Admin User" />
            <Field label="Email Address" defaultValue="admin@eduflow.com" />
            <button
              type="button"
              className="h-11 w-fit rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </ProfileCard>

        <ProfileCard icon={<LockIcon />} title="Security" description="Change your password to protect admin access.">
          <form className="grid gap-4">
            <Field label="Current Password" type="password" />
            <Field label="New Password" type="password" />
            <Field label="Confirm New Password" type="password" />
            <button
              type="button"
              className="h-11 w-fit rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Change Password
            </button>
          </form>
        </ProfileCard>
      </section>
    </div>
  );
}

function ProfileCard({ icon, title, description, children }: { icon: React.ReactNode; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
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
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
        defaultValue={defaultValue}
        type={type}
      />
    </label>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M7 10V8a5 5 0 0 1 10 0v2M5 10h14v10H5V10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
