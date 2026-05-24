import { notFound } from "next/navigation";

import { newsData } from "@/lib/mockData";
import NewsDetails from "@/components/newsDetails";

type NewsDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsDetailsPage({
  params,
}: NewsDetailsPageProps) {
  const { id } = await params;

  const news = newsData.find((item) => item.id === Number(id));

  if (!news) {
    notFound();
  }

  return <NewsDetails news={news} />;
}

export function generateStaticParams() {
  return newsData.map((item) => ({
    id: String(item.id),
  }));
}