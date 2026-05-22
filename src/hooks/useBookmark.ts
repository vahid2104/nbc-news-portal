"use client";

import { useState } from "react";

const STORAGE_KEY = "bookmarked-news";

function getStoredBookmarks(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const storedBookmarks = localStorage.getItem(STORAGE_KEY);
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  } catch {
    return [];
  }
}

export function useBookmark(newsId: number) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() =>
    getStoredBookmarks()
  );

  const isBookmarked = bookmarkedIds.includes(newsId);

  const toggleBookmark = () => {
    setBookmarkedIds((prevIds) => {
      const updatedIds = prevIds.includes(newsId)
        ? prevIds.filter((id) => id !== newsId)
        : [...prevIds, newsId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

      return updatedIds;
    });
  };

  return {
    isBookmarked,
    toggleBookmark,
  };
}