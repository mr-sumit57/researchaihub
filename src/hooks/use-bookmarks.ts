"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const STORAGE_KEY = "rah_bookmarks";
const hasSupabase = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

function readLocal(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeLocal(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const refresh = useCallback(async () => {
    if (!hasSupabase()) {
      setBookmarkedIds(readLocal());
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      setBookmarkedIds(new Set(data.bookmarks || []));
      setAuthenticated(Boolean(data.authenticated));

      if (!data.authenticated) {
        const local = readLocal();
        if (local.size > 0) setBookmarkedIds(local);
      }
    } catch {
      setBookmarkedIds(readLocal());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!hasSupabase()) return;

    let mounted = true;
    (async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
        if (!mounted || event !== "SIGNED_IN") return;
        const local = readLocal();
        if (local.size === 0) return;
        await Promise.all(
          [...local].map((toolId) =>
            fetch("/api/bookmarks", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ toolId }),
            })
          )
        );
        writeLocal(new Set());
        refresh();
      });
      return () => subscription.unsubscribe();
    })();

    return () => {
      mounted = false;
    };
  }, [refresh]);

  const toggle = useCallback(
    async (toolId: string) => {
      const isBookmarked = bookmarkedIds.has(toolId);

      if (!hasSupabase()) {
        const next = new Set(bookmarkedIds);
        if (isBookmarked) next.delete(toolId);
        else next.add(toolId);
        setBookmarkedIds(next);
        writeLocal(next);
        return;
      }

      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        const next = new Set(bookmarkedIds);
        if (isBookmarked) next.delete(toolId);
        else next.add(toolId);
        setBookmarkedIds(next);
        writeLocal(next);

        router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (isBookmarked) next.delete(toolId);
        else next.add(toolId);
        return next;
      });

      try {
        const res = await fetch("/api/bookmarks", {
          method: isBookmarked ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolId }),
        });
        if (!res.ok) await refresh();
        else writeLocal(new Set());
      } catch {
        await refresh();
      }
    },
    [bookmarkedIds, pathname, refresh, router]
  );

  return {
    bookmarkedIds,
    isBookmarked: (toolId: string) => bookmarkedIds.has(toolId),
    toggle,
    loading,
    authenticated,
    refresh,
  };
}
