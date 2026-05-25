"use client";

import Image from "next/image";
import Link from "next/link";

import type { NewsApiArticle } from "@/types/news";
import ActionIcons from "@/components/ui/ActionIcons";
import {
  getArticleAuthor,
  getArticleDescription,
  getArticleImage,
  getArticleTimeAgo,
  getReadTime,
  getStableNumber,
} from "@/lib/newsHelpers";
import { saveArticleToSession } from "@/lib/articleStorage";
import { articleCardStyles as styles } from "./articleCard.styles";

type ViewMode = "grid" | "list";

type ArticleCardProps = {
  article: NewsApiArticle;
  viewMode: ViewMode;
};

export default function ArticleCard({ article, viewMode }: ArticleCardProps) {
  const isList = viewMode === "list";

  const image = getArticleImage(article);
  const author = getArticleAuthor(article);
  const description = getArticleDescription(article);
  const timeAgo = getArticleTimeAgo(article);
  const readTime = getReadTime(article);
  const likes = getStableNumber(article.url, 20, 95);
  const shares = getStableNumber(article.title, 10, 80);

  const detailsHref = `/news/article?url=${encodeURIComponent(article.url)}`;

  const handleSaveArticle = () => {
    saveArticleToSession(article);
  };

  return (
    <article
      className={`${styles.articleBase} ${
        isList ? styles.articleList : styles.articleGrid
      }`}
    >
      <Link
        href={detailsHref}
        onClick={handleSaveArticle}
        className={isList ? styles.imageWrapperList : styles.imageWrapperGrid}
      >
        <Image
          src={image}
          alt={article.title}
          fill
          className={styles.image}
          sizes={
            isList
              ? "(max-width: 768px) 100vw, 220px"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />

        <span className={styles.categoryBadge}>{article.source.name}</span>
      </Link>

      <div className={isList ? styles.contentList : styles.contentGrid}>
        <Link href={detailsHref} onClick={handleSaveArticle}>
          <h3 className={styles.title}>{article.title}</h3>
        </Link>

        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          <span>{timeAgo}</span>
          <span>By {author}</span>
          <span>{readTime}</span>
        </div>

        <div className={styles.actions}>
          <ActionIcons
            newsId={article.url}
            likes={likes}
            shares={shares}
            className={styles.actionIcons}
          />
        </div>
      </div>
    </article>
  );
}