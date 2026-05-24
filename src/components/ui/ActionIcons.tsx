"use client";

import { Share2 } from "lucide-react";

import BookmarkButton from "@/components/ui/BookmarkButton";
import LikeButton from "@/components/ui/LikeButton";

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
  iconSize = 18,
}: ActionIconsProps) {
  return (
    <div
      className={`flex items-center gap-5 text-xs text-gray-500 ${className}`}
    >
      <LikeButton newsId={newsId} likes={likes} iconSize={iconSize} />

      <button
        type="button"
        className="flex items-center gap-1 transition hover:text-red-600"
        aria-label="Share news"
      >
        <Share2 size={iconSize} />
        <span>{shares}</span>
      </button>

      <BookmarkButton newsId={newsId} iconSize={iconSize} />
    </div>
  );
}