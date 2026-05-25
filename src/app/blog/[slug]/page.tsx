import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { buildMetadata, articleSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { BlogCard } from "@/components/blog/blog-card";
import { Badge } from "@/components/ui/badge";
import { fetchBlogPost, fetchRelatedPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featured_image,
    type: "article",
  });
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^## .+$/gm) || [];
  if (headings.length === 0) return null;
  return (
    <nav className="rounded-xl border border-border bg-card p-5">
      <p className="font-semibold text-sm">Table of Contents</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {headings.map((h) => {
          const text = h.replace(/^## /, "");
          const id = text.toLowerCase().replace(/\s+/g, "-");
          return (
            <li key={id}>
              <a href={`#${id}`} className="hover:text-primary">
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();

  const related = await fetchRelatedPosts(post);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <article className="container mx-auto max-w-7xl px-4 py-10">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <div className="relative aspect-[21/9] max-w-4xl overflow-hidden rounded-2xl">
          <Image src={post.featured_image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        </div>

        <div className="mt-8 max-w-3xl">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatDate(post.published_at)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.reading_time} min read
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <MarkdownContent content={post.content} />

            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6">
              <div className="flex items-center gap-4">
                {post.author_avatar && (
                  <Image src={post.author_avatar} alt={post.author_name} width={56} height={56} className="rounded-full" unoptimized />
                )}
                <div>
                  <p className="font-semibold">{post.author_name}</p>
                  {post.author_bio && <p className="text-sm text-muted-foreground">{post.author_bio}</p>}
                </div>
              </div>
            </div>

            <section className="mt-10">
              <h3 className="font-semibold">Comments</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Comments coming soon. Connect Supabase to enable threaded discussions.
              </p>
            </section>
          </div>

          <aside className="space-y-6">
            <TableOfContents content={post.content} />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-16">
            <h2 className="text-xl font-semibold">Related Posts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
