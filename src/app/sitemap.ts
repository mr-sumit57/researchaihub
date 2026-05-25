import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://researchaihub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/tools",
    "/trending",
    "/free-tools",
    "/blog",
    "/about",
    "/contact",
    "/submit",
    "/newsletter",
    "/bookmarks",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const toolPages = tools.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: new Date(t.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${BASE}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...blogPages, ...categoryPages];
}
