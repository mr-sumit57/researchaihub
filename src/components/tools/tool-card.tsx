"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Tool } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/tools/bookmark-button";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  index?: number;
  showBookmark?: boolean;
}

const pricingColors: Record<string, string> = {
  free: "success",
  freemium: "secondary",
  paid: "outline",
  enterprise: "outline",
};

export function ToolCard({ tool, index = 0, showBookmark = true }: ToolCardProps) {
  const visitUrl = tool.affiliate_url || tool.website_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className={cn("card-hover overflow-hidden", tool.is_sponsored && "ring-1 ring-amber-500/30")}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
              <Image src={tool.logo_url} alt={tool.name} fill className="object-cover" sizes="48px" unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/tools/${tool.slug}`} className="font-semibold hover:text-primary">
                  {tool.name}
                </Link>
                {tool.is_sponsored && <Badge variant="sponsored">Sponsored</Badge>}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant={pricingColors[tool.pricing] as "success" | "secondary" | "outline"}>
                  {tool.price_label || tool.pricing}
                </Badge>
                {tool.category && (
                  <Link href={`/categories/${tool.category.slug}`}>
                    <Badge variant="outline">{tool.category.name}</Badge>
                  </Link>
                )}
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {tool.rating} ({tool.review_count})
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t border-border/50 bg-muted/30 px-5 py-3">
          <Button size="sm" className="flex-1" asChild>
            <a href={visitUrl} target="_blank" rel="noopener noreferrer sponsored">
              Visit <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/tools/${tool.slug}`}>Details</Link>
          </Button>
          {showBookmark && <BookmarkButton toolId={tool.id} />}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
