"use client";

import { useMemo, useState } from "react";

export function useInfiniteScroll<T>(
  items: T[],
  initialCount = 4,
  step = 4
) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + step, items.length));
  };

  return {
    visibleItems,
    hasMore,
    loadMore,
    visibleCount,
  };
}