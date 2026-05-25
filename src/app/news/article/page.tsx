import { Suspense } from "react";

import ApiNewsDetails from "@/components/newsDetails/ApiNewsDetails";

export default function ApiNewsDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] bg-[#f4f4f4] px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="h-12 w-3/4 animate-pulse rounded bg-gray-300" />
            <div className="mt-8 h-105 w-full animate-pulse bg-gray-300" />
          </div>
        </main>
      }
    >
      <ApiNewsDetails />
    </Suspense>
  );
}