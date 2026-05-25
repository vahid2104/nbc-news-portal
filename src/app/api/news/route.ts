import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const NEWS_API_BASE_URL = "https://newsapi.org/v2/top-headlines";

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { status: "error", message: "NEWS_API_KEY is missing" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") || "general";
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "8";

  try {
    const response = await axios.get(NEWS_API_BASE_URL, {
      headers: {
        "X-Api-Key": apiKey,
      },
      params: {
        country: "us",
        category: category === "general" ? undefined : category,
        q: query || undefined,
        page,
        pageSize,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return NextResponse.json(
      {
        status: "error",
        message:
          axiosError.response?.data?.message ||
          "Something went wrong while fetching news",
      },
      { status: axiosError.response?.status || 500 }
    );
  }
}