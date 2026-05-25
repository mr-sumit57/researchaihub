"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/tools/bookmark-button";

interface ToolDetailActionsProps {
  toolId: string;
  visitUrl: string;
  hasAffiliate: boolean;
}

export function ToolDetailActions({ toolId, visitUrl, hasAffiliate }: ToolDetailActionsProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Button asChild>
        <a href={visitUrl} target="_blank" rel="noopener noreferrer sponsored">
          Visit Website <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
      <BookmarkButton toolId={toolId} size="default" variant="outline" showLabel />
      {hasAffiliate && (
        <p className="text-xs text-muted-foreground">Affiliate link — we may earn a commission</p>
      )}
    </div>
  );
}
