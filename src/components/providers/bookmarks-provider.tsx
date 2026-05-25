"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useBookmarks } from "@/hooks/use-bookmarks";

type BookmarksContextValue = ReturnType<typeof useBookmarks>;

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const value = useBookmarks();
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarksContext() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarksContext must be used within BookmarksProvider");
  return ctx;
}
