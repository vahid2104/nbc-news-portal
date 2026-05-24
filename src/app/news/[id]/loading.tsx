export default function NewsDetailsLoading() {
  return (
    <main className="bg-[#f4f4f4]">
      <section className="bg-slate-950 px-4 pb-28 pt-12 md:pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="h-10 w-3/4 animate-pulse rounded bg-slate-800 md:h-14" />
          <div className="mt-4 h-10 w-1/2 animate-pulse rounded bg-slate-800 md:h-14" />
        </div>
      </section>

      <div className="mx-auto -mt-20 max-w-6xl px-4">
        <div className="h-65 w-full animate-pulse bg-gray-300 md:h-107.5" />
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-[90px_minmax(0,1fr)_300px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-gray-300" />
            <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-gray-300" />
            <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-gray-300" />
          </div>
        </aside>

        <article className="space-y-5">
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-300" />
          <div className="h-6 w-full animate-pulse rounded bg-gray-300" />
          <div className="h-6 w-5/6 animate-pulse rounded bg-gray-300" />
          <div className="h-6 w-4/5 animate-pulse rounded bg-gray-300" />
          <div className="mt-8 h-40 w-full animate-pulse rounded bg-gray-300" />
        </article>

        <aside className="space-y-5">
          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-300" />
          <div className="h-48 w-full animate-pulse rounded bg-gray-300" />
          <div className="h-48 w-full animate-pulse rounded bg-gray-300" />
        </aside>
      </section>
    </main>
  );
}