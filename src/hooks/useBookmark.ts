"use client";

import { useLocalStorageToggle } from "./useLocalStorageToggle";

const STORAGE_KEY = "bookmarked-news";

export function useBookmark(newsId: string | number) {
  const { isSelected, toggle } = useLocalStorageToggle(STORAGE_KEY, newsId);

  return {
    isBookmarked: isSelected,
    toggleBookmark: toggle,
  };
}