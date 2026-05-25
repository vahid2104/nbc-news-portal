"use client";

import { useState } from "react";
import { Grid2X2, List } from "lucide-react";

import { useNews } from "@/hooks/useNews";
import type { NewsCategory } from "@/types/news";
import { newsTabs } from "@/lib/constants";
import ArticleCard from "../articleCard/ArticleCard";
import { latestStoriesStyles as styles } from "./latestStories.styles";

type TabType = (typeof newsTabs)[number]["label"];
type ViewMode = "grid" | "list";

export default function LatestStories() {
  const [activeTab, setActiveTab] = useState<TabType>("Latest Stories");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const activeCategory = newsTabs.find((tab) => tab.label === activeTab)
    ?.value as NewsCategory;

  const {
    articles,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useNews({
    category: activeCategory,
    pageSize: 4,
  });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tabsWrapper}>
          {newsTabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`${styles.tabButtonBase} ${
                activeTab === tab.label
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.toggleWrapper}>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`${styles.toggleButtonBase} ${
              viewMode === "grid"
                ? styles.toggleButtonActive
                : styles.toggleButtonInactive
            }`}
            aria-label="Grid view"
          >
            <Grid2X2 size={16} />
          </button>

          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`${styles.toggleButtonBase} ${
              viewMode === "list"
                ? styles.toggleButtonActive
                : styles.toggleButtonInactive
            }`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {loading && (
        <div className={styles.gridWrapper}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-107.5 animate-pulse bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="bg-red-50 p-4 text-sm text-red-600">
          Failed to load latest stories: {error}
        </p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div
          className={
            viewMode === "grid" ? styles.gridWrapper : styles.listWrapper
          }
        >
          {articles.map((article) => (
            <ArticleCard
              key={article.url}
              article={article}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className={styles.emptyText}>
          No stories found for this category.
        </p>
      )}

      {!loading && !error && hasMore && (
        <div className={styles.viewMoreWrapper}>
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className={styles.viewMoreButton}
          >
            {loadingMore ? "Loading..." : "View More"}
          </button>
        </div>
      )}
    </section>
  );
}