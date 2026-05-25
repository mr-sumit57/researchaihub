"use client";

import { Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBookmarksContext } from "@/components/providers/bookmarks-provider";

interface BookmarkButtonProps {
  toolId: string;
  size?: "default" | "sm" | "icon";
  variant?: "ghost" | "outline" | "secondary";
  className?: string;
  showLabel?: boolean;
}

export function BookmarkButton({
  toolId,
  size = "icon",
  variant = "ghost",
  className,
  showLabel = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggle, loading } = useBookmarksContext();
  const saved = isBookmarked(toolId);

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => toggle(toolId)}
      disabled={loading}
      aria-label={saved ? "Remove bookmark" : "Save tool"}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Bookmark className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
      )}
      {showLabel && <span className="ml-2">{saved ? "Saved" : "Save"}</span>}
    </Button>
  );
}
