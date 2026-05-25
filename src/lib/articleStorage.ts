import type { NewsApiArticle } from "@/types/news";

const STORAGE_KEY = "selected-news-articles";

function readStoredArticles(): Record<string, NewsApiArticle> {
  if (typeof window === "undefined") return {};

  try {
    const storedValue = sessionStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : {};
  } catch {
    return {};
  }
}

export function saveArticleToSession(article: NewsApiArticle) {
  if (typeof window === "undefined") return;

  const storedArticles = readStoredArticles();

  const updatedArticles = {
    ...storedArticles,
    [article.url]: article,
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
}

export function getArticleFromSession(url: string) {
  const storedArticles = readStoredArticles();

  return storedArticles[url] || null;
}