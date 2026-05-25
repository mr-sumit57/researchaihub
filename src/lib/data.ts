/**
 * Unified data layer — uses Supabase when configured, falls back to seed data.
 * Phase 2: plug in recommendation engine and personalized suggestions here.
 */

import { tools, getToolBySlug, filterTools, getFeaturedTools, getTrendingTools, getFreeTools, getRelatedTools, getAlternatives } from "@/data/tools";
import { blogPosts, getBlogBySlug, getLatestPosts, getRelatedPosts, getPostsByCategory } from "@/data/blog";
import { categories, getCategoryBySlug } from "@/data/categories";
import { faqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { getReviewsForTool } from "@/data/reviews";
import type { ToolFilters } from "@/types";

const useSupabase = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function fetchTools(filters?: ToolFilters) {
  if (useSupabase()) {
    const { fetchToolsFromSupabase } = await import("@/lib/supabase/queries");
    return fetchToolsFromSupabase(filters);
  }
  return filterTools({
    search: filters?.search,
    category: filters?.category,
    pricing: filters?.pricing,
    freeOnly: filters?.freeOnly,
    sort: filters?.sort,
    tags: filters?.tags,
  });
}

export async function fetchTool(slug: string) {
  if (useSupabase()) {
    const { fetchToolBySlug } = await import("@/lib/supabase/queries");
    return fetchToolBySlug(slug);
  }
  return getToolBySlug(slug) ?? null;
}

export async function fetchFeaturedTools(limit = 6) {
  if (useSupabase()) {
    const { fetchFeaturedTools } = await import("@/lib/supabase/queries");
    return fetchFeaturedTools(limit);
  }
  return getFeaturedTools(limit);
}

export async function fetchTrendingTools(limit = 8) {
  if (useSupabase()) {
    const { fetchTrendingTools } = await import("@/lib/supabase/queries");
    return fetchTrendingTools(limit);
  }
  return getTrendingTools(limit);
}

export async function fetchFreeTools() {
  if (useSupabase()) {
    const { fetchFreeTools } = await import("@/lib/supabase/queries");
    return fetchFreeTools();
  }
  return getFreeTools();
}

export async function fetchCategories() {
  if (useSupabase()) {
    const { fetchCategories } = await import("@/lib/supabase/queries");
    return fetchCategories();
  }
  return categories;
}

export async function fetchCategory(slug: string) {
  if (useSupabase()) {
    const { fetchCategoryBySlug } = await import("@/lib/supabase/queries");
    return fetchCategoryBySlug(slug);
  }
  return getCategoryBySlug(slug) ?? null;
}

export async function fetchRelatedTools(tool: Parameters<typeof getRelatedTools>[0], limit = 4) {
  return getRelatedTools(tool, limit);
}

export async function fetchAlternatives(tool: Parameters<typeof getAlternatives>[0], limit = 3) {
  return getAlternatives(tool, limit);
}

export async function fetchBlogPosts() {
  return blogPosts;
}

export async function fetchBlogPost(slug: string) {
  if (useSupabase()) {
    const { fetchBlogBySlug } = await import("@/lib/supabase/queries");
    return fetchBlogBySlug(slug);
  }
  return getBlogBySlug(slug) ?? null;
}

export async function fetchLatestPosts(limit = 3) {
  return getLatestPosts(limit);
}

export async function fetchRelatedPosts(post: Parameters<typeof getRelatedPosts>[0], limit = 3) {
  return getRelatedPosts(post, limit);
}

export async function fetchPostsByCategory(category: string) {
  return getPostsByCategory(category);
}

export { faqs, testimonials, getReviewsForTool, tools, blogPosts, categories };
