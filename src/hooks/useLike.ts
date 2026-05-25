"use client";

import { useLocalStorageToggle } from "./useLocalStorageToggle";

const STORAGE_KEY = "liked-news";

export function useLike(newsId: string | number) {
  const { isSelected, toggle } = useLocalStorageToggle(STORAGE_KEY, newsId);

  return {
    isLiked: isSelected,
    toggleLike: toggle,
  };
}