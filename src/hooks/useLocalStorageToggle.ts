"use client";

import { useState } from "react";

function readStorage(storageKey: string): number[] {
  if (typeof window === "undefined") return [];

  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function useLocalStorageToggle(storageKey: string, newsId: number) {
  const [selectedIds, setSelectedIds] = useState<number[]>(() =>
    readStorage(storageKey)
  );

  const isSelected = selectedIds.includes(newsId);

  const toggle = () => {
    setSelectedIds((prevIds) => {
      const updatedIds = prevIds.includes(newsId)
        ? prevIds.filter((id) => id !== newsId)
        : [...prevIds, newsId];

      localStorage.setItem(storageKey, JSON.stringify(updatedIds));

      return updatedIds;
    });
  };

  return {
    isSelected,
    toggle,
  };
}