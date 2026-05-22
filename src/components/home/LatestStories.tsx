"use client";

import { useState } from "react";
import { Grid2X2, List } from "lucide-react";

import { latestStories, NewsItem } from "@/lib/mockData";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import NewsCard from "./NewsCard";

type TabType = "Latest Stories" | "Think" | "Health";
type ViewMode = "grid" | "list";

const tabs: TabType[] = ["Latest Stories", "Think", "Health"];

export default function LatestStories() {
  const [activeTab, setActiveTab] = useState<TabType>("Latest Stories");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredStories: NewsItem[] =
    activeTab === "Latest Stories"
      ? latestStories
      : latestStories.filter((item) => item.category === activeTab);

  const { visibleItems, hasMore, loadMore } = useInfiniteScroll<NewsItem>(
    filteredStories,
    4,
    4,
  );

  return (
    <section className="w-2/3">
      <div className="mb-5 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-b-2 border-red-600 text-black"
                  : "border-b-2 border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pb-3">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded p-1.5 transition ${
              viewMode === "grid"
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="Grid view"
          >
            <Grid2X2 size={16} />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`rounded p-1.5 transition ${
              viewMode === "list"
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {visibleItems.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2"
              : "flex flex-col gap-5"
          }
        >
          {visibleItems.map((item: NewsItem) => (
            <NewsCard key={item.id} news={item} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-sm text-gray-500">
          No stories found for this category.
        </p>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="border border-red-200 px-10 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}
