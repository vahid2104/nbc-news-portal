"use client";

import { useState } from "react";

type StorageId = string | number;

function readStorage(storageKey: string): StorageId[] {
  if (typeof window === "undefined") return [];

  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function useLocalStorageToggle(
  storageKey: string,
  itemId: StorageId
) {
  const [selectedIds, setSelectedIds] = useState<StorageId[]>(() =>
    readStorage(storageKey)
  );

  const isSelected = selectedIds.includes(itemId);

  const toggle = () => {
    setSelectedIds((prevIds) => {
      const updatedIds = prevIds.includes(itemId)
        ? prevIds.filter((id) => id !== itemId)
        : [...prevIds, itemId];

      localStorage.setItem(storageKey, JSON.stringify(updatedIds));

      return updatedIds;
    });
  };

  return {
    isSelected,
    toggle,
  };
}