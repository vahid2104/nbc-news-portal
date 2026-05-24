import Image from "next/image";
import Link from "next/link";

import { heroNews } from "@/lib/mockData";
import ActionIcons from "@/components/ui/ActionIcons";
import { heroStyles as styles } from "./hero.styles";

export default function HeroSection() {
  if (!heroNews) return null;

  return (
    <section className={styles.mainContainer}>
      <Link href={`/news/${heroNews.id}`} className={styles.imageWrapper}>
        <Image
          src={heroNews.image}
          alt={heroNews.title}
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.contentTop}>
          <span className={styles.trending}>Trending</span>
          <div className={styles.iconContainer}>
            <ActionIcons
              newsId={heroNews.id}
              likes={heroNews.likes}
              shares={heroNews.shares}
            />
          </div>
        </div>

        <Link href={`/news/${heroNews.id}`}>
          <h1 className={styles.title}>{heroNews.title}</h1>
        </Link>

        <p className={styles.description}>{heroNews.description}</p>

        <div className={styles.metaInfo}>
          <span className={styles.metaHighlight}>{heroNews.timeAgo}</span>
          <span className={styles.metaHighlight}>By {heroNews.author}</span>
          <span>{heroNews.readTime}</span>
        </div>
      </div>
    </section>
  );
}
