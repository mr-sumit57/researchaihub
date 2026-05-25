/**
 * Seed Supabase with categories, tools, and blog posts from src/data
 *
 * Usage:
 *   npx tsx scripts/seed-supabase.ts
 *
 * Requires .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { categories } from "../src/data/categories";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1).replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  console.log("Seeding categories...");
  const categoryIdMap = new Map<string, string>();

  for (const cat of categories) {
    const { data, error } = await supabase
      .from("categories")
      .upsert(
        {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single();

    if (error) {
      const existing = await supabase.from("categories").select("id").eq("slug", cat.slug).single();
      if (existing.data) categoryIdMap.set(cat.id, existing.data.id);
      else console.error("Category error:", cat.slug, error.message);
    } else if (data) {
      categoryIdMap.set(cat.id, data.id);
    }
  }

  console.log(`Categories: ${categoryIdMap.size}`);

  console.log("Seeding tools...");
  let toolCount = 0;
  for (const tool of tools) {
    const categoryUuid = categoryIdMap.get(tool.category_id);
    const { error } = await supabase.from("tools").upsert(
      {
        legacy_id: tool.id,
        name: tool.name,
        slug: tool.slug,
        description: tool.description,
        long_description: tool.long_description,
        logo_url: tool.logo_url,
        website_url: tool.website_url,
        affiliate_url: tool.affiliate_url,
        pricing: tool.pricing,
        price_label: tool.price_label,
        category_id: categoryUuid,
        tags: tool.tags,
        rating: tool.rating,
        review_count: tool.review_count,
        is_featured: tool.is_featured,
        is_trending: tool.is_trending,
        is_sponsored: tool.is_sponsored,
        is_free: tool.is_free,
        features: tool.features || [],
        pros: tool.pros || [],
        cons: tool.cons || [],
        use_cases: tool.use_cases || [],
        screenshots: tool.screenshots || [],
        created_at: tool.created_at,
        updated_at: tool.updated_at,
      },
      { onConflict: "slug" }
    );

    if (error) console.error("Tool error:", tool.slug, error.message);
    else toolCount++;
  }
  console.log(`Tools: ${toolCount}/${tools.length}`);

  console.log("Seeding blog posts...");
  let blogCount = 0;
  for (const post of blogPosts) {
    const { error } = await supabase.from("blog_posts").upsert(
      {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        category: post.category,
        author_name: post.author_name,
        author_avatar: post.author_avatar,
        author_bio: post.author_bio,
        published_at: post.published_at,
        reading_time: post.reading_time,
        tags: post.tags,
        seo_title: post.seo_title,
        seo_description: post.seo_description,
      },
      { onConflict: "slug" }
    );

    if (error) console.error("Blog error:", post.slug, error.message);
    else blogCount++;
  }
  console.log(`Blog posts: ${blogCount}/${blogPosts.length}`);
  console.log("Done!");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
