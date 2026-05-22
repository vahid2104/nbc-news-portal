"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, PlayCircle } from "lucide-react";
import { rightSidebarStyles as styles } from "./rightSideBar.styles";
import { liveNews } from "@/lib/mockData";

export default function RightSidebar() {
  const [location, setLocation] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location.trim()) return;

    setSubmittedLocation(location.trim());
    setLocation("");
  };

  return (
    <aside className={styles.aside}>
      {/* Live Section */}
      <section>
        <div className={styles.sectionTitleWrapper}>
          <span className={styles.liveDot}></span>
          <h2 className={styles.sectionTitle}>Live</h2>
        </div>

        {liveNews ? (
          <article className={styles.liveCard}>
            <div className={styles.liveImageWrapper}>
              <Image
                src={liveNews.image}
                alt={liveNews.title}
                fill
                className={styles.image}
              />

              <div className={styles.imageOverlay}>
                <button
                  className={styles.playButton}
                  aria-label="Play live news"
                >
                  <PlayCircle size={28} />
                </button>
              </div>

              <span className={styles.liveBadge}>
                Live
              </span>
            </div>

            <div className={styles.liveContent}>
              <h3 className={styles.liveTitle}>
                {liveNews.title}
              </h3>

              <p className={styles.liveDescription}>
                {liveNews.description}
              </p>
            </div>
          </article>
        ) : (
          <p className={styles.emptyText}>No live news available.</p>
        )}
      </section>

      {/* Location News Section */}
      <section className={styles.locationSection}>
        <div className={styles.sectionTitleWrapper}>
          <MapPin size={18} className={styles.locationIcon} />
          <h2 className={styles.sectionTitle}>Location News</h2>
        </div>

        <p className={styles.locationText}>
          Get the latest news and updates from your area.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className={styles.input}
          />

          <button
            type="submit"
            className={styles.submitButton}
          >
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
      </section>
    </aside>
  );
}