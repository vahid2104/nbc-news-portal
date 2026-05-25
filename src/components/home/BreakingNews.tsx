"use client";

import { useNews } from "@/hooks/useNews";

export default function BreakingNews() {
  const { articles, loading, error } = useNews({
    category: "general",
    pageSize: 5,
  });

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4">
        <div className="h-14 animate-pulse bg-red-200" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4">
        <div className="bg-red-50 px-4 py-3 text-sm text-red-600">
          Breaking news failed to load: {error}
        </div>
      </section>
    );
  }

  const tickerText = articles.map((article) => article.title).join(" • ");

  return (
    <section className="mx-auto max-w-7xl  my-6">
      <div className="flex overflow-hidden px-4 py-6  bg-red-700 text-white">
        <div className="shrink-0 bg-white px-6 py-4 text-xs font-bold uppercase tracking-wide text-red-700">
          Breaking News
        </div>

        <div className="relative flex flex-1 items-center overflow-hidden">
          <p className="animate-[ticker_25s_linear_infinite] whitespace-nowrap px-6 text-sm font-medium">
            {tickerText}
          </p>
        </div>
      </div>
    </section>
  );
}