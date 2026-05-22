import Image from "next/image";

import type { NewsItem } from "@/lib/mockData";
import ActionIcons from "@/components/ui/ActionIcons";
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
      className={`${styles.articleBase} ${
        isList ? styles.articleList : styles.articleGrid
      }`}
    >
      <div
        className={
          isList ? styles.imageWrapperList : styles.imageWrapperGrid
        }
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          className={styles.image}
          sizes={
            isList
              ? "(max-width: 768px) 100vw, 220px"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />

        <span className={styles.categoryBadge}>{news.category}</span>
      </div>

      <div className={isList ? styles.contentList : styles.contentGrid}>
        <h3 className={styles.title}>{news.title}</h3>

        <p className={styles.description}>{news.description}</p>

        <div className={styles.meta}>
          <span>{news.timeAgo}</span>
          <span>By {news.author}</span>
          <span>{news.readTime}</span>
        </div>

        <div className={styles.actions}>
          <ActionIcons
            newsId={news.id}
            likes={news.likes}
            shares={news.shares}
            className={styles.actionIcons}
          />
        </div>
      </div>
    </article>
  );
}