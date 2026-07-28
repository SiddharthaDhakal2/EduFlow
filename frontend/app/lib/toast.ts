export type ToastTone = "success" | "error" | "info";

export function showToast(message: string, tone: ToastTone = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("eduflow-toast", { detail: { message, tone } }));
}
