"use client";

import { useEffect, useState } from "react";

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

export function useLocalStorageToggle(storageKey: string, itemId: StorageId) {
  const [selectedIds, setSelectedIds] = useState<StorageId[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedIds = readStorage(storageKey);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIds(storedIds);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, [storageKey]);

  const isSelected = isLoaded && selectedIds.includes(itemId);

  const toggle = () => {
    setSelectedIds((prevIds) => {
      const updatedIds = prevIds.includes(itemId)
        ? prevIds.filter((id) => id !== itemId)
        : [...prevIds, itemId];

      localStorage.setItem(storageKey, JSON.stringify(updatedIds));

      return updatedIds;
    });

    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  return {
    isSelected,
    toggle,
  };
}