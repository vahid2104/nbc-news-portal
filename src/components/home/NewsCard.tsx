import Image from "next/image";
import { BookmarkIcon, Heart, Share2 } from "lucide-react";

import type { NewsItem } from "@/lib/mockData";

type ViewMode = "grid" | "list";

type NewsCardProps = {
  news: NewsItem;
  viewMode: ViewMode;
};

export default function NewsCard({ news, viewMode }: NewsCardProps) {
  const isList = viewMode === "list";

  return (
    <article
      className={`bg-white shadow-sm ${
        isList ? "flex gap-4 p-4" : "overflow-hidden"
      }`}
    >
      <div
        className={
          isList
            ? "relative h-32 w-48 shrink-0"
            : "relative h-48 w-full"
        }
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
        />

        <span className="absolute bottom-3 right-3 bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
          {news.category}
        </span>
      </div>

      <div className={isList ? "flex flex-1 flex-col" : "p-5"}>
        <h3 className="mb-2 text-base font-bold leading-snug text-gray-900">
          {news.title}
        </h3>

        <p className="mb-4 text-sm leading-6 text-gray-600">
          {news.description}
        </p>

        <div className="mb-5 flex items-center gap-3 text-xs text-gray-500">
          <span>{news.timeAgo}</span>
          <span>By {news.author}</span>
          <span>{news.readTime}</span>
        </div>

        <div className="mt-auto flex items-center justify-center gap-5 text-xs text-gray-500 border-t border-gray-200 pt-4">
          <button className="flex items-center gap-1 hover:text-red-600">
            <Heart size={18} />
            {news.likes}
          </button>

          <button className="flex items-center gap-1 hover:text-red-600">
            <Share2 size={18} />
            {news.shares}
          </button>

          <button className="flex items-center gap-1 hover:text-red-600">
            <BookmarkIcon size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}