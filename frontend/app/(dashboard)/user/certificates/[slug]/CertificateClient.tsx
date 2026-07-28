"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Certificate } from "../../../../lib/api";
import { fetchCertificate } from "../../../../lib/courseProgress";

export default function CertificateClient({ slug }: { slug: string }) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertificate(slug)
      .then(setCertificate)
      .catch((fetchError) => setError(fetchError instanceof Error ? fetchError.message : "Certificate is not available."))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-sm">Loading certificate...</div>;
  }

  if (error || !certificate) {
    return (
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-950">Certificate locked</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{error || "Complete all lessons to unlock this certificate."}</p>
        <Link
          className="mt-5 inline-flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
          href={`/user/courses/${slug}`}
        >
          Back to Course
        </Link>
      </div>
    );
  }

  const issuedDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(certificate.issuedAt));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <Link className="inline-flex text-sm font-bold text-blue-600 hover:text-blue-700" href="/user/learning">
          Back to learning
        </Link>
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
          type="button"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </button>
      </div>

      <section className="bg-white p-4 shadow-sm print:p-0 print:shadow-none">
        <div className="mx-auto aspect-[1.414/1] w-full max-w-5xl border-[10px] border-blue-700 bg-white p-8 text-center print:max-w-none">
          <div className="flex h-full flex-col justify-between border-2 border-slate-200 px-8 py-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-700">EduFlow</p>
              <h1 className="mt-6 text-4xl font-bold text-slate-950">Certificate of Completion</h1>
              <p className="mt-5 text-sm text-slate-500">This certificate is proudly presented to</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{certificate.userName}</p>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
                for successfully completing the course
              </p>
              <p className="mx-auto mt-3 max-w-3xl text-2xl font-bold text-blue-700">{certificate.courseTitle}</p>
            </div>

            <div className="grid gap-5 text-left sm:grid-cols-3">
              <CertificateDetail label="Instructor" value={certificate.instructor} />
              <CertificateDetail label="Issued Date" value={issuedDate} />
              <CertificateDetail label="Certificate ID" value={certificate.id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CertificateDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-slate-200 pt-3">
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
