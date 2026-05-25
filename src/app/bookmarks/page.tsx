"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarksContext } from "@/components/providers/bookmarks-provider";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";

export default function BookmarksPage() {
  const { bookmarkedIds, loading, authenticated } = useBookmarksContext();
  const savedTools = tools.filter((t) => bookmarkedIds.has(t.id));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Saved Tools</h1>
      <p className="mt-2 text-muted-foreground">
        {authenticated
          ? "Your bookmarks are synced to your account."
          : "Bookmarks saved locally. Sign in to sync across devices."}
      </p>

      {loading ? (
        <p className="mt-8 text-muted-foreground">Loading bookmarks...</p>
      ) : savedTools.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-border py-16 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No saved tools yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/tools">Browse Directory</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      )}

      {!authenticated && savedTools.length > 0 && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>{" "}
          to sync bookmarks when Supabase is configured.
        </p>
      )}
    </div>
  );
}
