"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { apiFetch } from "../../lib/api";
import { showToast } from "../../lib/toast";

export default function KhaltiPaymentCallbackPage() {
  return (
    <Suspense fallback={<PaymentStatus message="Verifying Khalti payment..." />}>
      <KhaltiPaymentCallbackClient />
    </Suspense>
  );
}

function KhaltiPaymentCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying Khalti payment...");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    async function verifyPayment() {
      const pidx = searchParams.get("pidx");
      const purchaseOrderId = searchParams.get("purchase_order_id");
      const status = searchParams.get("status");

      if (!pidx) {
        const nextMessage = "Payment verification failed. Missing Khalti payment id.";
        setMessage(nextMessage);
        setIsDone(true);
        return;
      }

      if (status === "User canceled") {
        const nextMessage = "Payment was canceled.";
        setMessage(nextMessage);
        setIsDone(true);
        return;
      }

      try {
        const result = await apiFetch<{ verified: boolean; status: string }>("/membership/khalti/verify", {
          method: "POST",
          body: JSON.stringify({
            pidx,
            purchase_order_id: purchaseOrderId,
          }),
        });

        const nextMessage = result.verified ? "Payment verified. Membership activated." : `Payment status: ${result.status}.`;
        setMessage(nextMessage);
        showToast(nextMessage, result.verified ? "success" : "info");
        if (result.verified) {
          window.setTimeout(() => router.replace("/user/dashboard"), 1200);
        }
      } catch (err) {
        const nextMessage = err instanceof Error ? err.message : "Payment verification failed.";
        setMessage(nextMessage);
      } finally {
        setIsDone(true);
      }
    }

    verifyPayment();
  }, [router, searchParams]);

  return <PaymentStatus isDone={isDone} message={message} />;
}

function PaymentStatus({ isDone = false, message }: { isDone?: boolean; message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-slate-950">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold">Khalti Payment</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
        {isDone ? (
          <Link
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
            href="/user/membership"
          >
            Back to Membership
          </Link>
        ) : null}
      </section>
    </main>
  );
}
