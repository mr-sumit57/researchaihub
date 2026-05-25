import Link from "next/link";
import Image from "next/image";
import {
  Microscope,
  PenLine,
  Code2,
  Zap,
  Presentation,
  GitBranch,
  Video,
  Image as ImageIcon,
  FileText,
  BookMarked,
  Workflow,
} from "lucide-react";
import { Hero } from "@/components/home/hero";
import { SectionHeader } from "@/components/home/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { BlogCard } from "@/components/blog/blog-card";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchFeaturedTools, fetchTrendingTools, fetchLatestPosts, faqs, testimonials } from "@/lib/data";
import { categories } from "@/data/categories";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Star } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Microscope,
  PenLine,
  Code2,
  Zap,
  Presentation,
  GitBranch,
  Video,
  Image: ImageIcon,
  FileText,
  BookMarked,
  Workflow,
};

export default async function HomePage() {
  const [featured, trending, latestPosts] = await Promise.all([
    fetchFeaturedTools(6),
    fetchTrendingTools(4),
    fetchLatestPosts(3),
  ]);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />

      <section className="container mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="Featured AI Tools" description="Hand-picked tools for research and productivity" href="/tools" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeader title="Trending Now" href="/trending" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="Popular Categories" description="Browse tools by use case" href="/tools" />
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Microscope;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all card-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeader title="Latest from the Blog" href="/blog" />
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="AI Tool Comparisons" description="Side-by-side guides to help you choose" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="card-hover">
            <CardContent className="p-6">
              <h3 className="font-semibold">Cursor vs GitHub Copilot</h3>
              <p className="mt-2 text-sm text-muted-foreground">Which AI coding assistant wins for developers?</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link href="/blog/cursor-vs-github-copilot-comparison">Read comparison →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6">
              <h3 className="font-semibold">ChatPDF vs PDF.ai</h3>
              <p className="mt-2 text-sm text-muted-foreground">Best PDF AI for reading research papers.</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link href="/blog/chatpdf-vs-pdf-ai-comparison">Read comparison →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16">
        <NewsletterForm variant="card" />
      </section>

      <section className="border-t border-border py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeader title="Trusted by Researchers" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <Card key={t.id} className="glass">
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full" unoptimized />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="Frequently Asked Questions" />
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* AdSense placeholder */}
      <div className="container mx-auto max-w-7xl px-4 pb-8">
        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
          Advertisement — Google AdSense placement
        </div>
      </div>
    </>
  );
}
