import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BlogCard } from "@/components/blog/blog-card";
import { fetchBlogPosts } from "@/lib/data";
import { blogCategories } from "@/data/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Blog — AI Research & Productivity",
  description: "Guides, tutorials, comparisons, and news about AI tools for research, students, and developers.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
      <p className="mt-2 text-muted-foreground">Insights on AI tools for research, coding, and productivity.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {blogCategories.map((cat) => (
          <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              {cat}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
