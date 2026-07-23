import React from "react";
import DashboardShell from "../../components/DashboardShell";

export const metadata = {
  title: "User - EduFlow",
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
