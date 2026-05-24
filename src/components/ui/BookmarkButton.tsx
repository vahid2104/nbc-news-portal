"use client";

import { Bookmark } from "lucide-react";

import { useBookmark } from "@/hooks/useBookmark";

type BookmarkButtonProps = {
  newsId: number;
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
};

export default function BookmarkButton({
  newsId,
  className = "",
  iconSize = 14,
  showLabel = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmark(newsId);

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={`flex items-center gap-1 transition ${
        isBookmarked ? "text-red-600" : "text-gray-500 hover:text-red-600"
      } ${className}`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        size={iconSize}
        className={isBookmarked ? "fill-red-600" : "fill-none"}
      />

      {showLabel && (
        <span>{isBookmarked ? "Saved" : "Save"}</span>
      )}
    </button>
  );
}