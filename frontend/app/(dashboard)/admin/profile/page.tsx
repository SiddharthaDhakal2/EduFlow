"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch, apiUpload, getStoredUser, mediaUrl, setSession, type User } from "../../../lib/api";
import { showToast } from "../../../lib/toast";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setProfileForm({ name: storedUser?.name || "", email: storedUser?.email || "" });
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = profileForm.name.trim();
    const email = profileForm.email.trim().toLowerCase();

    if (!name || !email) {
      setNotice("Full name and email address are required.");
      return;
    }

    if (!emailPattern.test(email)) {
      setNotice("Please enter a valid email address.");
      return;
    }

    try {
      const data = await apiFetch<{ user: User }>("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name, email }),
      });
      const token = window.localStorage.getItem("eduflow-token") || "";
      setSession(token, data.user);
      setUser(data.user);
      setProfileForm({ name: data.user.name, email: data.user.email });
      setNotice("");
      showToast("Profile updated.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Profile update failed.";
      setNotice(message);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!passwordForm.currentPassword.trim() || !passwordForm.newPassword.trim() || !passwordForm.confirmPassword.trim()) {
      setNotice("All password fields are required.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setNotice("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setNotice("New password must be at least 6 characters.");
      return;
    }

    try {
      await apiFetch("/auth/password", {
        method: "PUT",
        body: JSON.stringify(passwordForm),
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setNotice("");
      showToast("Password updated.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Password update failed.";
      setNotice(message);
    }
  }

  async function uploadProfileImage(file: File | undefined) {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const data = await apiUpload<{ user: User }>("/uploads/profile", formData);
      const token = window.localStorage.getItem("eduflow-token") || "";
      setSession(token, data.user);
      setUser(data.user);
      setNotice("");
      showToast("Profile photo updated.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Profile photo upload failed.";
      setNotice(message);
    }
  }

  return (
    <div className="space-y-5">
      {notice ? <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{notice}</div> : null}
      <section>
        <h1 className="text-2xl font-bold text-slate-950">Admin Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account information and password.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-600 text-2xl font-bold text-white">
              {user?.profileImage ? (
                <img alt={user.name} className="h-full w-full object-cover" src={mediaUrl(user.profileImage)} />
              ) : (
                user?.avatar || "A"
              )}
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-950 text-white">
                <CameraIcon />
              </span>
              <input
                accept="image/*"
                className="sr-only"
                type="file"
                onChange={(event) => uploadProfileImage(event.target.files?.[0])}
              />
            </label>
            <div>
              <h2 className="text-xl font-bold leading-tight text-slate-950">{user?.name || "Admin"}</h2>
              <p className="mt-1 text-sm text-slate-500">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ProfileCard icon={<UserIcon />} title="Profile Information">
          <form className="grid gap-4" onSubmit={saveProfile}>
            <Field label="Full Name" required value={profileForm.name} onChange={(value) => setProfileForm((current) => ({ ...current, name: value }))} />
            <Field label="Email Address" required type="email" value={profileForm.email} onChange={(value) => setProfileForm((current) => ({ ...current, email: value }))} />
            <button
              type="submit"
              className="h-11 w-fit rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </ProfileCard>

        <ProfileCard icon={<LockIcon />} title="Security" description="Change your password to protect admin access.">
          <form className="grid gap-4" onSubmit={changePassword}>
            <Field label="Current Password" required type="password" value={passwordForm.currentPassword} onChange={(value) => setPasswordForm((current) => ({ ...current, currentPassword: value }))} />
            <Field label="New Password" required type="password" value={passwordForm.newPassword} onChange={(value) => setPasswordForm((current) => ({ ...current, newPassword: value }))} />
            <Field label="Confirm New Password" required type="password" value={passwordForm.confirmPassword} onChange={(value) => setPasswordForm((current) => ({ ...current, confirmPassword: value }))} />
            <button
              type="submit"
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
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
        value={value || ""}
        onChange={(event) => onChange?.(event.target.value)}
        type={type}
        required={required}
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

function CameraIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path d="M8 7h1.5L11 5h2l1.5 2H16a4 4 0 0 1 4 4v4.5a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 15.5V11a4 4 0 0 1 4-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
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
