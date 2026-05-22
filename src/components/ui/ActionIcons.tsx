"use client";

import { Heart, Share2 } from "lucide-react";

import BookmarkButton from "@/components/ui/BookmarkButton";

type ActionIconsProps = {
  newsId: number;
  likes: number;
  shares: number;
  className?: string;
  iconSize?: number;
};

export default function ActionIcons({
  newsId,
  likes,
  shares,
  className = "",
  iconSize = 14,
}: ActionIconsProps) {
  return (
    <div
      className={`flex items-center gap-5 text-xs text-gray-500 ${className}`}
    >
      <button
        type="button"
        className="flex items-center gap-1 transition hover:text-red-600"
        aria-label="Like news"
      >
        <Heart size={iconSize} />
        <span>{likes}</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-1 transition hover:text-red-600"
        aria-label="Share news"
      >
        <Share2 size={iconSize} />
        <span>{shares}</span>
      </button>

      <BookmarkButton newsId={newsId} />
    </div>
  );
}