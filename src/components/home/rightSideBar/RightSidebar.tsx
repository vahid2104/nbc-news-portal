"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, PlayCircle } from "lucide-react";

import { useNews } from "@/hooks/useNews";
import { getArticleImage } from "@/lib/newsHelpers";
import { saveArticleToSession } from "@/lib/articleStorage";
import { rightSidebarStyles as styles } from "./rightSideBar.styles";

export default function RightSidebar() {
  const [location, setLocation] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  const {
    articles: liveArticles,
    loading: liveLoading,
    error: liveError,
  } = useNews({
    category: "general",
    pageSize: 1,
  });

  const {
    articles: locationArticles,
    loading: locationLoading,
    error: locationError,
  } = useNews({
    category: "general",
    query: submittedLocation,
    pageSize: 2,
  });

  const liveArticle = liveArticles[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location.trim()) return;

    setSubmittedLocation(location.trim());
    setLocation("");
  };

  return (
    <aside className={styles.aside}>
      <section className={styles.section}>
        <div className={styles.sectionTitleWrapper}>
          <span className={styles.liveDot} />
          <h2 className={styles.sectionTitle}>Live</h2>
        </div>

        {liveLoading && <div className="h-64 animate-pulse bg-gray-300" />}

        {!liveLoading && liveError && (
          <p className="bg-red-50 p-4 text-sm text-red-600">
            Live news failed to load: {liveError}
          </p>
        )}

        {!liveLoading && !liveError && liveArticle && (
          <Link
            href={`/news/article?url=${encodeURIComponent(liveArticle.url)}`}
            onClick={() => saveArticleToSession(liveArticle)}
            className={styles.liveCard}
          >
            <div className={styles.liveImageWrapper}>
              <Image
                src={getArticleImage(liveArticle)}
                alt={liveArticle.title}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 320px"
              />

              <div className={styles.imageOverlay}>
                <span className={styles.playButton} aria-label="Play live news">
                  <PlayCircle size={28} />
                </span>
              </div>

              <span className={styles.liveBadge}>Live</span>
            </div>

            <div className={styles.liveContent}>
              <h3 className={styles.liveTitle}>{liveArticle.title}</h3>

              <p className={styles.liveDescription}>
                {liveArticle.description ||
                  "Read the latest live update from trusted sources."}
              </p>
            </div>
          </Link>
        )}

        {!liveLoading && !liveError && !liveArticle && (
          <p className={styles.emptyText}>No live news available.</p>
        )}
      </section>

      <section className={styles.locationSection}>
        <div className={styles.sectionTitleWrapper}>
          <MapPin size={18} className={styles.locationIcon} />
          <h2 className={styles.sectionTitle}>Location News</h2>
        </div>

        <p className={styles.locationText}>
          Search news by city, country, or location keyword.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className={styles.input}
          />

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>

        {submittedLocation && (
          <p className={styles.submittedText}>
            Showing news for{" "}
            <span className={styles.submittedLocation}>
              {submittedLocation}
            </span>
            .
          </p>
        )}

        {submittedLocation && locationLoading && (
          <div className="mt-5 space-y-3">
            <div className="h-20 animate-pulse bg-gray-300" />
            <div className="h-20 animate-pulse bg-gray-300" />
          </div>
        )}

        {submittedLocation && !locationLoading && locationError && (
          <p className="mt-4 bg-red-50 p-3 text-sm text-red-600">
            Location news failed to load: {locationError}
          </p>
        )}

        {submittedLocation &&
          !locationLoading &&
          !locationError &&
          locationArticles.length > 0 && (
            <div className="mt-5 space-y-4">
              {locationArticles.map((item) => (
                <Link
                  key={item.url}
                  href={`/news/article?url=${encodeURIComponent(item.url)}`}
                  onClick={() => saveArticleToSession(item)}
                  className="block border-t border-gray-200 pt-4"
                >
                  <h3 className="text-sm font-bold leading-snug text-gray-900 transition hover:text-red-600">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">
                    {item.source.name}
                  </p>
                </Link>
              ))}
            </div>
          )}

        {submittedLocation &&
          !locationLoading &&
          !locationError &&
          locationArticles.length === 0 && (
            <p className="mt-4 text-sm text-gray-500">
              No location news found.
            </p>
          )}
      </section>
    </aside>
  );
}