"use client";

import { Bookmark } from "lucide-react";

import { useBookmark } from "@/hooks/useBookmark";

type BookmarkButtonProps = {
  newsId: number;
  className?: string;
};

export default function BookmarkButton({
  newsId,
  className = "",
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
        size={14}
        className={isBookmarked ? "fill-red-600" : "fill-none"}
      />
    </button>
  );
}