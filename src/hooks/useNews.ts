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

function cleanNewsArticles(articles: NewsApiArticle[]) {
  return articles.filter(
    (article) =>
      article.title &&
      article.title !== "[Removed]" &&
      article.url
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
    async (pageNumber: number) => {
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
          articles: response.data.articles,
          totalResults: response.data.totalResults,
          errorMessage: "",
        };
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        return {
          articles: [],
          totalResults: 0,
          errorMessage:
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
      setLoading(true);

      const result = await requestNews(1);

      if (isCancelled) return;

      if (result.errorMessage) {
        setArticles([]);
        setTotalResults(0);
        setError(result.errorMessage);
        setPage(1);
        setLoading(false);
        return;
      }

      const cleanArticles = cleanNewsArticles(result.articles);

      setArticles(cleanArticles);
      setTotalResults(result.totalResults);
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

    if (result.errorMessage) {
      setError(result.errorMessage);
      setLoadingMore(false);
      return;
    }

    const cleanArticles = cleanNewsArticles(result.articles);

    setArticles((prevArticles) => [...prevArticles, ...cleanArticles]);
    setTotalResults(result.totalResults);
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