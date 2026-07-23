import Link from "next/link";

export default function UserPage() {
  return (
    <div className="flex flex-col items-start gap-6">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">User Area</h1>
      <p className="text-zinc-600 dark:text-zinc-400">This is the starting point for the user-side pages.</p>
      <div className="flex gap-3">
        <Link href="/" className="text-sm font-medium text-blue-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
