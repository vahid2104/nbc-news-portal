"use client";

import { Heart } from "lucide-react";

import { useLike } from "@/hooks/useLike";

type LikeButtonProps = {
  newsId: string | number;
  likes: number;
  className?: string;
  iconSize?: number;
  showCount?: boolean;
};

export default function LikeButton({
  newsId,
  likes,
  className = "",
  iconSize = 14,
  showCount = true,
}: LikeButtonProps) {
  const { isLiked, toggleLike } = useLike(newsId);

  const visibleLikes = isLiked ? likes + 1 : likes;

  return (
    <button
      type="button"
      onClick={toggleLike}
      className={`flex items-center gap-1 transition ${
        isLiked ? "text-red-600" : "text-gray-500 hover:text-red-600"
      } ${className}`}
      aria-label={isLiked ? "Unlike news" : "Like news"}
    >
      <Heart
        size={iconSize}
        className={isLiked ? "fill-red-600" : "fill-none"}
      />

      {showCount && <span>{visibleLikes}</span>}
    </button>
  );
}