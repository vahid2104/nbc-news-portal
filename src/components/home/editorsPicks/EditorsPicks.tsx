"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { useNews } from "@/hooks/useNews";
import ActionIcons from "@/components/ui/ActionIcons";
import {
  getArticleImage,
  getStableNumber,
} from "@/lib/newsHelpers";
import { saveArticleToSession } from "@/lib/articleStorage";
import { editorsPicksStyles as styles } from "./editorsPicks.styles";

export default function EditorsPicks() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = useState(0);

  const { articles, loading, error } = useNews({
    category: "technology",
    pageSize: 8,
  });

  const dotsCount = Math.ceil(articles.length / 3);

  const handleDotClick = (index: number) => {
    setActiveDot(index);

    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * index;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Editor&apos;s Picks</h2>
        <Star size={14} className={styles.star} />
      </div>

      {loading && (
        <div className={styles.scrollWrapper}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-w-65 max-w-65 h-75 animate-pulse bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="bg-red-50 p-4 text-sm text-red-600">
          Failed to load editor&apos;s picks: {error}
        </p>
      )}

      {!loading && !error && articles.length > 0 && (
        <>
          <div ref={scrollRef} className={styles.scrollWrapper}>
            {articles.map((item) => {
              const href = `/news/article?url=${encodeURIComponent(item.url)}`;
              const likes = getStableNumber(item.url, 20, 95);
              const shares = getStableNumber(item.title, 10, 80);

              return (
                <article key={item.url} className={styles.card}>
                  <Link
                    href={href}
                    onClick={() => saveArticleToSession(item)}
                    className={styles.imageWrapper}
                  >
                    <Image
                      src={getArticleImage(item)}
                      alt={item.title}
                      fill
                      className={styles.image}
                      sizes="260px"
                    />

                    <span className={styles.categoryBadge}>
                      {item.source.name}
                    </span>
                  </Link>

                  <div className={styles.content}>
                    <Link
                      href={href}
                      onClick={() => saveArticleToSession(item)}
                    >
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                    </Link>

                    <ActionIcons
                      newsId={item.url}
                      likes={likes}
                      shares={shares}
                      className={styles.actions}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {dotsCount > 1 && (
            <div className={styles.dotsWrapper}>
              {Array.from({ length: dotsCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={`${styles.dotBase} ${
                    activeDot === index
                      ? styles.dotActive
                      : styles.dotInactive
                  }`}
                  aria-label={`Go to editor picks page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-sm text-gray-500">
          No editor&apos;s picks available right now.
        </p>
      )}
    </section>
  );
}