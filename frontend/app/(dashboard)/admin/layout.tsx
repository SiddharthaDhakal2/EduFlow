import type React from "react";
import AdminShell from "../../components/AdminShell";

export const metadata = {
  title: "Admin - EduFlow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
