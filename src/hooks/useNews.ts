"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";

import type {
  NewsApiArticle,
  NewsApiResponse,
  NewsCategory,
} from "@/types/news";

type UseNewsParams = {
  category?: NewsCategory;
  query?: string;
  pageSize?: number;
};

type NewsRequestResult =
  | {
      data: NewsApiResponse;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

function cleanNewsArticles(articles: NewsApiArticle[]) {
  return articles.filter(
    (article) =>
      article.title &&
      article.title !== "[Removed]" &&
      article.url &&
      article.urlToImage
  );
}

export function useNews({
  category = "general",
  query = "",
  pageSize = 8,
}: UseNewsParams = {}) {
  const [articles, setArticles] = useState<NewsApiArticle[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const requestParams = useMemo(
    () => ({
      category,
      query: query.trim(),
      pageSize,
    }),
    [category, query, pageSize]
  );

  const requestNews = useCallback(
    async (pageNumber: number): Promise<NewsRequestResult> => {
      try {
        const response = await axios.get<NewsApiResponse>("/api/news", {
          params: {
            category: requestParams.category,
            q: requestParams.query || undefined,
            page: pageNumber,
            pageSize: requestParams.pageSize,
          },
        });

        return {
          data: response.data,
          error: null,
        };
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        return {
          data: null,
          error:
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to fetch news",
        };
      }
    },
    [requestParams]
  );

  useEffect(() => {
    let isCancelled = false;

    async function loadInitialNews() {
      const result = await requestNews(1);

      if (isCancelled) return;

      if (result.error) {
        setArticles([]);
        setTotalResults(0);
        setError(result.error);
        setPage(1);
        setLoading(false);
        return;
      }

      const cleanArticles = cleanNewsArticles(result.data.articles);

      setArticles(cleanArticles);
      setTotalResults(result.data.totalResults);
      setError("");
      setPage(1);
      setLoading(false);
    }

    void loadInitialNews();

    return () => {
      isCancelled = true;
    };
  }, [requestNews]);

  const hasMore = articles.length < totalResults;

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;

    setLoadingMore(true);

    const result = await requestNews(nextPage);

    if (result.error) {
      setError(result.error);
      setLoadingMore(false);
      return;
    }

    const cleanArticles = cleanNewsArticles(result.data.articles);

    setArticles((prevArticles) => [...prevArticles, ...cleanArticles]);
    setTotalResults(result.data.totalResults);
    setPage(nextPage);
    setError("");
    setLoadingMore(false);
  };

  return {
    articles,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}