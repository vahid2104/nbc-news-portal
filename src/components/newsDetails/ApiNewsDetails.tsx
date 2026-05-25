"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import type { NewsApiArticle } from "@/types/news";
import { useNews } from "@/hooks/useNews";
import ActionIcons from "@/components/ui/ActionIcons";
import BookmarkButton from "@/components/ui/BookmarkButton";
import LikeButton from "@/components/ui/LikeButton";
import {
  getArticleAuthor,
  getArticleDescription,
  getArticleImage,
  getArticleTimeAgo,
  getReadTime,
  getStableNumber,
} from "@/lib/newsHelpers";
import {
  getArticleFromSession,
  saveArticleToSession,
} from "@/lib/articleStorage";
import { newsDetailsStyles as styles } from "./newsDetails.styles";
import { FaTwitter } from "react-icons/fa6";

function shuffleArticles<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function ApiNewsDetails() {
  const searchParams = useSearchParams();
  const articleUrl = searchParams.get("url");

  const [article, setArticle] = useState<NewsApiArticle | null>(null);
  const [isArticleLoaded, setIsArticleLoaded] = useState(false);

  useEffect(() => {
    if (!articleUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsArticleLoaded(true);
      return;
    }

    const storedArticle = getArticleFromSession(articleUrl);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArticle(storedArticle);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsArticleLoaded(true);
  }, [articleUrl]);

  const { articles: recommendedArticles, loading: recommendedLoading } =
    useNews({
      category: "general",
      pageSize: 12,
    });

  if (!isArticleLoaded) {
    return (
      <main className="min-h-[70vh] bg-[#f4f4f4] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="h-12 w-3/4 animate-pulse rounded bg-gray-300" />
          <div className="mt-8 h-[420px] w-full animate-pulse bg-gray-300" />
        </div>
      </main>
    );
  }

  if (!articleUrl) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f4f4] px-4">
        <section className="max-w-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Article URL is missing
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Please go back to the homepage and choose a news article again.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
          >
            Back to homepage
          </Link>
        </section>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f4f4] px-4">
        <section className="max-w-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Article data is not available
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            This can happen if the page was opened directly, refreshed after
            session data was cleared, or shared without selecting it from the
            homepage first.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
          >
            Back to homepage
          </Link>
        </section>
      </main>
    );
  }

  const image = getArticleImage(article);
  const description = getArticleDescription(article);
  const author = getArticleAuthor(article);
  const timeAgo = getArticleTimeAgo(article);
  const readTime = getReadTime(article);
  const likes = getStableNumber(article.url, 20, 95);
  const shares = getStableNumber(article.title, 10, 80);

  const content = article.content
    ? article.content.replace(/\[\+\d+ chars\]/g, "").trim()
    : description;

  const availableRecommendations = shuffleArticles(
    recommendedArticles.filter((item) => item.url !== article.url)
  );

  const recommended = availableRecommendations.slice(0, 2);
  const related = availableRecommendations.slice(2, 6);
  const basedOnLikeArticle = availableRecommendations[6] || related[0];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>{article.title}</h1>
        </div>
      </section>

      <div className={styles.imageOuter}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={article.title}
            fill
            priority
            className={styles.image}
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>
      </div>

      <section className={styles.body}>
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
                newsId={article.url}
                likes={likes}
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
                newsId={article.url}
                iconSize={24}
                className={styles.verticalActionButton}
              />
            </div>
          </div>
        </aside>

        <article className={styles.article}>
          <div className={styles.meta}>
            <span>{timeAgo}</span>
            <span>By {author}</span>
            <span>{readTime}</span>
            <span>{article.source.name}</span>
          </div>

          <p className={styles.intro}>{description}</p>

          <div className={styles.content}>
            <p className={styles.paragraph}>
              {content || "No article preview is available for this story."}
            </p>

            <p className={styles.paragraph}>
              This detail page is generated from the available NewsAPI article
              fields. NewsAPI provides the title, description, source, image,
              published date, original URL and a shortened content preview.
            </p>

            <p className={styles.paragraph}>
              In a production version, the full article body would usually come
              from the publisher page, a CMS, or a dedicated backend content
              service. For this demo, we display as much information as the API
              provides.
            </p>
          </div>

          <h2 className={styles.highlight}>{description}</h2>

          <section className={styles.newsletter}>
            <h2 className={styles.newsletterTitle}>
              Sign up for The NBC News Newsletter
            </h2>

            <p className={styles.newsletterAuthor}>By {author}</p>

            <p className={styles.newsletterText}>
              A weekly, ad-free newsletter that helps readers stay in the know,
              be productive, and think more critically about the world.
            </p>

            <button type="button" className={styles.newsletterButton}>
              <Mail size={16} />
              Get this newsletter
            </button>
          </section>

          <div className={styles.tags}>
            <span className={styles.tag}>{article.source.name}</span>
            <span className={styles.tag}>Trending</span>
            <span className={styles.tag}>NewsAPI</span>
            <span className={styles.tag}>Live Data</span>
          </div>

          <div className={styles.bottomActions}>
            <ActionIcons
              newsId={article.url}
              likes={likes}
              shares={shares}
            />
          </div>

          <section className={styles.authorBox}>
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt={author}
              width={64}
              height={64}
              className={styles.authorAvatar}
            />

            <div>
              <p className={styles.authorLabel}>Author</p>

              <h3 className={styles.authorName}>{author}</h3>

              <p className={styles.authorText}>
                This article was provided by {article.source.name}. The full
                original story is available on the publisher website.
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-600 transition hover:text-red-700"
              >
                Read original article
                <ExternalLink size={16} />
              </a>
            </div>

            <button type="button" className={styles.followButton}>
              <FaTwitter size={16} />
              Follow
            </button>
          </section>
        </article>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarBlock}>
            <h2 className={styles.sidebarTitle}>Recommended for you</h2>

            {recommendedLoading && (
              <>
                <div className="h-48 animate-pulse bg-gray-300" />
                <div className="h-48 animate-pulse bg-gray-300" />
              </>
            )}

            {!recommendedLoading && recommended.length === 0 && (
              <p className="text-sm leading-6 text-gray-500">
                No recommended articles available right now.
              </p>
            )}

            {!recommendedLoading &&
              recommended.map((item) => {
                const href = `/news/article?url=${encodeURIComponent(
                  item.url
                )}`;

                return (
                  <Link
                    key={item.url}
                    href={href}
                    onClick={() => saveArticleToSession(item)}
                    className={styles.smallCard}
                  >
                    <div className={styles.smallImageWrapper}>
                      <Image
                        src={getArticleImage(item)}
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
                );
              })}
          </section>

          {basedOnLikeArticle && (
            <section className={styles.sidebarBlock}>
              <h2 className={styles.sidebarTitle}>Based on like</h2>

              <Link
                href={`/news/article?url=${encodeURIComponent(
                  basedOnLikeArticle.url
                )}`}
                onClick={() => saveArticleToSession(basedOnLikeArticle)}
                className={styles.smallCard}
              >
                <div className={styles.smallImageWrapper}>
                  <Image
                    src={getArticleImage(basedOnLikeArticle)}
                    alt={basedOnLikeArticle.title}
                    fill
                    className={styles.image}
                    sizes="300px"
                  />
                </div>

                <div className={styles.smallContent}>
                  <h3 className={styles.smallTitle}>
                    {basedOnLikeArticle.title}
                  </h3>
                </div>
              </Link>
            </section>
          )}
        </aside>
      </section>

      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>Related topics</h2>

        {recommendedLoading && (
          <div className={styles.relatedGrid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse bg-white shadow-sm"
              />
            ))}
          </div>
        )}

        {!recommendedLoading && related.length === 0 && (
          <p className="text-sm text-gray-500">
            No related topics available right now.
          </p>
        )}

        {!recommendedLoading && related.length > 0 && (
          <div className={styles.relatedGrid}>
            {related.map((item) => {
              const href = `/news/article?url=${encodeURIComponent(item.url)}`;
              const itemLikes = getStableNumber(item.url, 20, 95);
              const itemShares = getStableNumber(item.title, 10, 80);

              return (
                <article key={item.url} className={styles.relatedCard}>
                  <Link href={href} onClick={() => saveArticleToSession(item)}>
                    <div className={styles.relatedImageWrapper}>
                      <Image
                        src={getArticleImage(item)}
                        alt={item.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1024px) 50vw, 300px"
                      />
                    </div>
                  </Link>

                  <div className={styles.relatedContent}>
                    <Link
                      href={href}
                      onClick={() => saveArticleToSession(item)}
                    >
                      <h3 className={styles.relatedCardTitle}>{item.title}</h3>
                    </Link>

                    <div className={styles.relatedActions}>
                      <ActionIcons
                        newsId={item.url}
                        likes={itemLikes}
                        shares={itemShares}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}