"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { editorsPicks } from "@/lib/mockData";
import ActionIcons from "@/components/ui/ActionIcons";
import { editorsPicksStyles as styles } from "./editorsPicks.styles";

export default function EditorsPicks() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = useState(0);

  const dotsCount = Math.ceil(editorsPicks.length / 3);

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

      <div ref={scrollRef} className={styles.scrollWrapper}>
        {editorsPicks.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.image}
                sizes="260px"
              />

              <span className={styles.categoryBadge}>
                {item.category}
              </span>
            </div>

            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{item.title}</h3>

              <ActionIcons
                newsId={item.id}
                likes={item.likes}
                shares={item.shares}
                className={styles.actions}
              />
            </div>
          </article>
        ))}
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
    </section>
  );
}