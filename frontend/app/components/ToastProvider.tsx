"use client";

import { useEffect, useState } from "react";
import type { ToastTone } from "../lib/toast";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function dismissToast(id: number) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  useEffect(() => {
    function handleToast(event: Event) {
      const detail = (event as CustomEvent<{ message?: string; tone?: ToastTone }>).detail;
      if (!detail?.message) return;

      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message: detail.message || "", tone: detail.tone || "success" }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 3500);
    }

    window.addEventListener("eduflow-toast", handleToast);
    return () => window.removeEventListener("eduflow-toast", handleToast);
  }, []);

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`group relative overflow-hidden rounded-xl border bg-white/95 p-4 pr-11 text-slate-950 shadow-2xl shadow-slate-950/12 backdrop-blur ${toastToneClass(toast.tone).card}`}
        >
          <div className="flex items-start gap-3">
            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${toastToneClass(toast.tone).icon}`}>
              <ToastIcon tone={toast.tone} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-950">{toastTitle(toast.tone)}</p>
              <p className="mt-1 text-sm leading-5 text-slate-600">{toast.message}</p>
            </div>
          </div>
          <button
            aria-label="Dismiss notification"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            type="button"
            onClick={() => dismissToast(toast.id)}
          >
            <CloseIcon />
          </button>
          <span className={`absolute bottom-0 left-0 h-1 animate-[toast-progress_3.5s_linear_forwards] ${toastToneClass(toast.tone).bar}`} />
        </div>
      ))}
    </div>
  );
}

function toastToneClass(tone: ToastTone) {
  if (tone === "error") {
    return {
      card: "border-red-100 ring-1 ring-red-50",
      icon: "bg-red-50 text-red-600",
      bar: "bg-red-500",
    };
  }

  if (tone === "info") {
    return {
      card: "border-blue-100 ring-1 ring-blue-50",
      icon: "bg-blue-50 text-blue-600",
      bar: "bg-blue-500",
    };
  }

  return {
    card: "border-emerald-100 ring-1 ring-emerald-50",
    icon: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
  };
}

function toastTitle(tone: ToastTone) {
  if (tone === "error") return "Needs attention";
  if (tone === "info") return "Notice";
  return "Success";
}

function ToastIcon({ tone }: { tone: ToastTone }) {
  if (tone === "error") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M12 8v5m0 3h.01M10.3 4.3 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (tone === "info") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M12 11v5m0-8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
