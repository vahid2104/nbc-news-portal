import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NewsNotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f4f4f4] px-4 py-16">
      <section className="max-w-xl bg-white px-8 py-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <SearchX size={32} />
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-600">
          404 News Not Found
        </p>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          This news article does not exist
        </h1>

        <p className="mb-8 text-sm leading-6 text-gray-600">
          The article you are looking for may have been removed, moved, or the
          URL may be incorrect.
        </p>

        <Link
          href="/"
          className="inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}