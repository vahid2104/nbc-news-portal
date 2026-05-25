import type { NewsApiArticle } from "@/types/news";

export function getArticleImage(article: NewsApiArticle) {
  return (
    article.urlToImage ||
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80"
  );
}

export function getArticleAuthor(article: NewsApiArticle) {
  return article.author || article.source.name || "NBC News";
}

export function getArticleDescription(article: NewsApiArticle) {
  return article.description || "Read the latest updates from trusted sources.";
}

export function getArticleTimeAgo(article: NewsApiArticle) {
  const publishedDate = new Date(article.publishedAt);
  const now = new Date();

  const diffMs = now.getTime() - publishedDate.getTime();
  const diffHours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

export function getReadTime(article: NewsApiArticle) {
  const text = `${article.title} ${article.description || ""} ${
    article.content || ""
  }`;

  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 200));

  return `${minutes}min read`;
}

export function getStableNumber(seed: string, min: number, max: number) {
  const total = seed
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return min + (total % (max - min + 1));
}