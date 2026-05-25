"use client";

import Image from "next/image";
import Link from "next/link";

import { useNews } from "@/hooks/useNews";
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
import { heroStyles as styles } from "./hero.styles";

export default function HeroSection() {
  const { articles, loading, error } = useNews({
    category: "general",
    pageSize: 1,
  });

  if (loading) {
    return (
      <section className={styles.mainContainer}>
        <div className="h-80 w-full animate-pulse bg-gray-300 md:w-1/2" />
        <div className="w-full space-y-4 md:w-1/2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-300" />
          <div className="h-10 w-4/5 animate-pulse rounded bg-gray-300" />
          <div className="h-20 w-full animate-pulse rounded bg-gray-300" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.mainContainer}>
        <div className="w-full bg-red-50 p-6 text-sm text-red-600">
          Failed to load hero news: {error}
        </div>
      </section>
    );
  }

  const heroArticle = articles[0];

  if (!heroArticle) return null;

  const image = getArticleImage(heroArticle);
  const description = getArticleDescription(heroArticle);
  const author = getArticleAuthor(heroArticle);
  const timeAgo = getArticleTimeAgo(heroArticle);
  const readTime = getReadTime(heroArticle);
  const likes = getStableNumber(heroArticle.url, 20, 95);
  const shares = getStableNumber(heroArticle.title, 10, 80);

  const detailsHref = `/news/article?url=${encodeURIComponent(heroArticle.url)}`;

  const handleSaveArticle = () => {
    saveArticleToSession(heroArticle);
  };

  return (
    <section className={styles.mainContainer}>
      <Link
        href={detailsHref}
        onClick={handleSaveArticle}
        className={styles.imageWrapper}
      >
        <Image
          src={image}
          alt={heroArticle.title}
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <ActionIcons
            newsId={heroArticle.url}
            likes={likes}
            shares={shares}
          />
        </div>

        <span className={styles.trending}>Trending</span>

        <Link href={detailsHref} onClick={handleSaveArticle}>
          <h1 className={styles.title}>{heroArticle.title}</h1>
        </Link>

        <p className={styles.description}>{description}</p>

        <div className={styles.metaInfo}>
          <span className={styles.metaHighlight}>{timeAgo}</span>
          <span className={styles.metaHighlight}>By {author}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </section>
  );
}