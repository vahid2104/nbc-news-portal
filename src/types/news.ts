export type NewsApiArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsApiResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: NewsApiArticle[];
  message?: string;
};

export type NewsCategory =
  | "general"
  | "business"
  | "sports"
  | "health"
  | "technology"
  | "science"
  | "entertainment";