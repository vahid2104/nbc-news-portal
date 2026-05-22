import Image from "next/image";
import { BookmarkIcon, Heart, Share2 } from "lucide-react";
import type { NewsItem } from "@/lib/mockData";
import { newsCardStyles as styles } from "./newsCard.styles";

type ViewMode = "grid" | "list";

type NewsCardProps = {
  news: NewsItem;
  viewMode: ViewMode;
};

export default function NewsCard({ news, viewMode }: NewsCardProps) {
  const isList = viewMode === "list";

  return (
    <article
      className={styles.articleBase}
    >
      <div
        className={
          isList
            ? styles.imageWrapperList
            : styles.imageWrapperGrid
        }
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          className={styles.image}
        />

        <span className={styles.categoryBadge}>
          {news.category}
        </span>
      </div>

      <div className={isList ? styles.contentList : styles.contentGrid}>
        <h3 className={styles.title}>
          {news.title}
        </h3>

        <p className={styles.description}>
          {news.description}
        </p>

        <div className={styles.meta}>
          <span>{news.timeAgo}</span>
          <span>By {news.author}</span>
          <span>{news.readTime}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <Heart size={18} />
            {news.likes}
          </button>

          <button className={styles.actionButton}>
            <Share2 size={18} />
            {news.shares}
          </button>

          <button className={styles.actionButton}>
            <BookmarkIcon size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}