"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Tool } from "@/types";
import { ToolCard } from "./tool-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";

interface ToolsDirectoryProps {
  initialTools: Tool[];
}

const PAGE_SIZE = 12;

export function ToolsDirectory({ initialTools }: ToolsDirectoryProps) {
  const searchParams = useSearchParams();
  const [tools, setTools] = useState(initialTools);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [pricing, setPricing] = useState(searchParams.get("pricing") || "");
  const [freeOnly, setFreeOnly] = useState(searchParams.get("free") === "1");
  const [sort, setSort] = useState(searchParams.get("sort") || "popular");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filterTools = useCallback(() => {
    let result = [...initialTools];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (category) {
      const c = categories.find((cat) => cat.slug === category);
      if (c) result = result.filter((t) => t.category_id === c.id);
    }
    if (freeOnly) result = result.filter((t) => t.is_free || t.pricing === "free");
    if (pricing) result = result.filter((t) => t.pricing === pricing);
    switch (sort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.review_count - a.review_count);
    }
    setTools(result);
    setVisible(PAGE_SIZE);
  }, [initialTools, search, category, pricing, freeOnly, sort]);

  useEffect(() => {
    filterTools();
  }, [filterTools]);

  const displayed = tools.slice(0, visible);
  const hasMore = visible < tools.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search AI tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="">All Pricing</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="name">A-Z</option>
          </select>
          <Button variant={freeOnly ? "default" : "outline"} size="sm" onClick={() => setFreeOnly(!freeOnly)}>
            <SlidersHorizontal className="mr-1 h-4 w-4" />
            Free only
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{tools.length} tools found</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>

      {tools.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          No tools match your filters. Try adjusting your search.
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
