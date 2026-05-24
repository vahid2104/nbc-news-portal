import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Share2 } from "lucide-react";

import type { NewsItem } from "@/lib/mockData";
import { newsData } from "@/lib/mockData";
import ActionIcons from "@/components/ui/ActionIcons";
import BookmarkButton from "@/components/ui/BookmarkButton";
import LikeButton from "@/components/ui/LikeButton";
import { newsDetailsStyles as styles } from "./newsDetails.styles";
import { FaTwitter } from "react-icons/fa6";

type NewsDetailsProps = {
  news: NewsItem;
};

function getRecommendedNews(currentId: number, count: number) {
  return newsData.filter((item) => item.id !== currentId).slice(0, count);
}

function getRelatedNews(currentId: number, count: number) {
  return newsData.filter((item) => item.id !== currentId).slice(3, 3 + count);
}

export default function NewsDetails({ news }: NewsDetailsProps) {
  const contentParagraphs = news.content
    .split("\n")
    .filter((paragraph) => paragraph.trim().length > 0);

  const recommendedNews = getRecommendedNews(news.id, 2);
  const relatedNews = getRelatedNews(news.id, 4);

  const basedOnLikeNews = relatedNews[0];
  const inlineImage = recommendedNews[0]?.image || news.image;

  return (
    <main className={styles.page}>
      {/* Hero title area */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>{news.title}</h1>
        </div>
      </section>

      {/* Main centered image */}
      <div className={styles.imageOuter}>
        <div className={styles.imageWrapper}>
          <Image
            src={news.image}
            alt={news.title}
            fill
            priority
            className={styles.image}
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>
      </div>

      {/* Main body */}
      <section className={styles.body}>
        {/* Left sticky actions */}
        <aside className={styles.leftActions}>
          <div className={styles.leftActionsInner}>
            <div>
              <p className={styles.likeQuestion}>See more like this?</p>

              <div className={styles.colorDots}>
                <span className={styles.greenDot} />
                <span className={styles.orangeDot} />
              </div>
            </div>

            <div className={styles.verticalActions}>
              <LikeButton
                newsId={news.id}
                likes={news.likes}
                iconSize={24}
                className={styles.verticalActionButton}
              />

              <button type="button" className={styles.verticalActionButton}>
                <MessageCircle size={24} />
                <span>21</span>
              </button>

              <button type="button" className={styles.verticalActionButton}>
                <Share2 size={22} />
              </button>

              <BookmarkButton
                newsId={news.id}
                iconSize={24}
                className={styles.verticalActionButton}
              />
            </div>
          </div>
        </aside>

        {/* Article content */}
        <article className={styles.article}>
          <div className={styles.meta}>
            <span>{news.timeAgo}</span>
            <span>By {news.author}</span>
            <span>{news.readTime}</span>
          </div>

          <p className={styles.intro}>{news.description}</p>

          <div className={styles.content}>
            {contentParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <p className={styles.paragraph}>
              This story is currently powered by static mock data. Later, the
              same structure can be connected to a real news API, where the
              title, image, content, author, recommendations and comments will
              come dynamically from the backend.
            </p>

            <p className={styles.paragraph}>
              For now, this page demonstrates how a real article details page
              can be structured with reusable components, localStorage actions,
              recommended news and related topics.
            </p>
          </div>

          <h2 className={styles.highlight}>
            Solemn crowds watch as the story continues to shape public memory
            and national conversation.
          </h2>

          <div className={styles.inlineImageWrapper}>
            <Image
              src={inlineImage}
              alt="Related visual"
              fill
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 700px"
            />
          </div>

          {/* Fake newsletter/comment-style block */}
          <section className={styles.newsletter}>
            <h2 className={styles.newsletterTitle}>
              Sign up for The NBC News Newsletter
            </h2>

            <p className={styles.newsletterAuthor}>By {news.author}</p>

            <p className={styles.newsletterText}>
              A weekly, ad-free newsletter that helps readers stay in the know,
              be productive, and think more critically about the world.
            </p>

            <button type="button" className={styles.newsletterButton}>
              <Mail size={16} />
              Get this newsletter
            </button>
          </section>

          {/* Tags */}
          <div className={styles.tags}>
            <span className={styles.tag}>NBCBLK</span>
            <span className={styles.tag}>Trending</span>
            <span className={styles.tag}>{news.category}</span>
            <span className={styles.tag}>Freebie</span>
          </div>

          {/* Bottom actions */}
          <div className={styles.bottomActions}>
            <ActionIcons
              newsId={news.id}
              likes={news.likes}
              shares={news.shares}
            />
          </div>

          {/* Fake author/comment block */}
          <section className={styles.authorBox}>
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt={news.author}
              width={64}
              height={64}
              className={styles.authorAvatar}
            />

            <div>
              <p className={styles.authorLabel}>Author</p>
              <h3 className={styles.authorName}>{news.author}</h3>

              <p className={styles.authorText}>
                {news.author} is a writer and editor covering culture, politics,
                health, technology and public life for this demo news portal.
              </p>
            </div>

            <button type="button" className={styles.followButton}>
              <FaTwitter size={16} />
              Follow
            </button>
          </section>
        </article>

        {/* Right sidebar */}
        <aside className={styles.sidebar}>
          <section className={styles.sidebarBlock}>
            <h2 className={styles.sidebarTitle}>Recommended for you</h2>

            {recommendedNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className={styles.smallCard}
              >
                <div className={styles.smallImageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                    sizes="300px"
                  />
                </div>

                <div className={styles.smallContent}>
                  <h3 className={styles.smallTitle}>{item.title}</h3>
                </div>
              </Link>
            ))}
          </section>

          {basedOnLikeNews && (
            <section className={styles.sidebarBlock}>
              <h2 className={styles.sidebarTitle}>Based on like</h2>

              <Link
                href={`/news/${basedOnLikeNews.id}`}
                className={styles.smallCard}
              >
                <div className={styles.smallImageWrapper}>
                  <Image
                    src={basedOnLikeNews.image}
                    alt={basedOnLikeNews.title}
                    fill
                    className={styles.image}
                    sizes="300px"
                  />
                </div>

                <div className={styles.smallContent}>
                  <h3 className={styles.smallTitle}>{basedOnLikeNews.title}</h3>
                </div>
              </Link>
            </section>
          )}
        </aside>
      </section>

      {/* Related topics */}
      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>Related topics</h2>

        <div className={styles.relatedGrid}>
          {relatedNews.map((item) => (
            <article key={item.id} className={styles.relatedCard}>
              <Link href={`/news/${item.id}`}>
                <div className={styles.relatedImageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 1024px) 50vw, 300px"
                  />
                </div>
              </Link>

              <div className={styles.relatedContent}>
                <Link href={`/news/${item.id}`}>
                  <h3 className={styles.relatedCardTitle}>{item.title}</h3>
                </Link>

                <div className={styles.relatedActions}>
                  <ActionIcons
                    newsId={item.id}
                    likes={item.likes}
                    shares={item.shares}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
