import { createClient } from "./server";
import type { Tool, Category, BlogPost, ToolFilters } from "@/types";

function mapTool(row: Record<string, unknown>): Tool {
  const cat = row.categories as Record<string, unknown> | null;
  return {
    id: (row.legacy_id as string) || (row.id as string),
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    long_description: row.long_description as string | undefined,
    logo_url: (row.logo_url as string) || "",
    website_url: row.website_url as string,
    affiliate_url: row.affiliate_url as string | undefined,
    pricing: row.pricing as Tool["pricing"],
    price_label: row.price_label as string | undefined,
    category_id: row.category_id as string,
    category: cat
      ? {
          id: cat.id as string,
          name: cat.name as string,
          slug: cat.slug as string,
          description: (cat.description as string) || "",
          icon: (cat.icon as string) || "Folder",
        }
      : undefined,
    tags: (row.tags as string[]) || [],
    rating: Number(row.rating) || 0,
    review_count: Number(row.review_count) || 0,
    is_featured: Boolean(row.is_featured),
    is_trending: Boolean(row.is_trending),
    is_sponsored: Boolean(row.is_sponsored),
    is_free: Boolean(row.is_free),
    features: row.features as string[] | undefined,
    pros: row.pros as string[] | undefined,
    cons: row.cons as string[] | undefined,
    use_cases: row.use_cases as string[] | undefined,
    screenshots: row.screenshots as string[] | undefined,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function fetchToolsFromSupabase(filters?: ToolFilters): Promise<Tool[]> {
  const supabase = await createClient();
  let query = supabase.from("tools").select("*, categories(*)");

  if (filters?.category) {
    const { data: cat } = await supabase.from("categories").select("id").eq("slug", filters.category).single();
    if (cat) query = query.eq("category_id", cat.id);
  }
  if (filters?.freeOnly) query = query.or("is_free.eq.true,pricing.eq.free");
  if (filters?.pricing?.length) query = query.in("pricing", filters.pricing);

  const { data, error } = await query.order("review_count", { ascending: false });
  if (error || !data) return [];

  let tools = data.map(mapTool);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
  return tools;
}

export async function fetchToolBySlug(slug: string): Promise<Tool | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tools").select("*, categories(*)").eq("slug", slug).single();
  if (error || !data) return null;
  return mapTool(data);
}

export async function fetchFeaturedTools(limit: number): Promise<Tool[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("tools").select("*, categories(*)").eq("is_featured", true).limit(limit);
  return (data || []).map(mapTool);
}

export async function fetchTrendingTools(limit: number): Promise<Tool[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("tools").select("*, categories(*)").eq("is_trending", true).limit(limit);
  return (data || []).map(mapTool);
}

export async function fetchFreeTools(): Promise<Tool[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("tools").select("*, categories(*)").or("is_free.eq.true,pricing.eq.free");
  return (data || []).map(mapTool);
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return (data || []) as Category[];
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).single();
  return data as Category | null;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  if (!data) return null;
  return data as BlogPost;
}
