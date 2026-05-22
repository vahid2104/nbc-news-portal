"use client";

import { useState } from "react";
import { Grid2X2, List } from "lucide-react";

import { latestStories } from "@/lib/mockData";
import type { NewsItem } from "@/lib/mockData";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import NewsCard from "../newsCard";
import { latestStoriesStyles as styles } from "./latestStories.styles";

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
    4
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButtonBase} ${
                activeTab === tab
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive
              }`}
            >
              {tab}
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

      {visibleItems.length > 0 ? (
        <div
          className={
            viewMode === "grid" ? styles.gridWrapper : styles.listWrapper
          }
        >
          {visibleItems.map((item) => (
            <NewsCard key={item.id} news={item} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>
          No stories found for this category.
        </p>
      )}

      {hasMore && (
        <div className={styles.viewMoreWrapper}>
          <button
            type="button"
            onClick={loadMore}
            className={styles.viewMoreButton}
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}