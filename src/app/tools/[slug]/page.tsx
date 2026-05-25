import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Check, X } from "lucide-react";
import { ToolDetailActions } from "@/components/tools/tool-detail-actions";
import { ToolViewTracker } from "@/components/tools/tool-view-tracker";
import { buildMetadata, toolSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fetchTool,
  fetchRelatedTools,
  fetchAlternatives,
  getReviewsForTool,
} from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = await fetchTool(slug);
  if (!tool) return {};
  return buildMetadata({
    title: `${tool.name} Review & Features`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    image: tool.logo_url,
  });
}

export async function generateStaticParams() {
  const { tools } = await import("@/data/tools");
  return tools.map((t) => ({ slug: t.slug }));
}

const toolFaqs = (name: string) => [
  { question: `Is ${name} free?`, answer: `Check the pricing section above for current plans including free tiers.` },
  { question: `Who is ${name} best for?`, answer: `Researchers, students, and professionals looking for AI-powered workflows.` },
  { question: `Does ${name} support academic citations?`, answer: `See features and use cases for citation and reference management support.` },
];

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await fetchTool(slug);
  if (!tool) notFound();

  const [related, alternatives, reviews] = await Promise.all([
    fetchRelatedTools(tool),
    fetchAlternatives(tool),
    Promise.resolve(getReviewsForTool(tool.id)),
  ]);

  const visitUrl = tool.affiliate_url || tool.website_url;
  const faqs = toolFaqs(tool.name);

  return (
    <>
      <JsonLd data={[toolSchema(tool), faqSchema(faqs)]} />
      <ToolViewTracker toolId={tool.id} />
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <Breadcrumbs
          items={[
            { name: "Tools", href: "/tools" },
            { name: tool.name, href: `/tools/${tool.slug}` },
          ]}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border">
                <Image src={tool.logo_url} alt={tool.name} fill className="object-cover" unoptimized />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold">{tool.name}</h1>
                  {tool.is_sponsored && <Badge variant="sponsored">Sponsored</Badge>}
                </div>
                <p className="mt-2 max-w-2xl text-muted-foreground">{tool.long_description || tool.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {tool.rating} ({tool.review_count} reviews)
                  </span>
                  <Badge>{tool.price_label || tool.pricing}</Badge>
                  {tool.category && (
                    <Link href={`/categories/${tool.category.slug}`}>
                      <Badge variant="outline">{tool.category.name}</Badge>
                    </Link>
                  )}
                </div>
                <ToolDetailActions
                  toolId={tool.id}
                  visitUrl={visitUrl}
                  hasAffiliate={Boolean(tool.affiliate_url)}
                />
              </div>
            </div>

            {tool.features && tool.features.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-semibold">Features</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(tool.pros || tool.cons) && (
              <section className="mt-10 grid gap-6 md:grid-cols-2">
                {tool.pros && (
                  <Card>
                    <CardHeader><CardTitle className="text-lg text-emerald-600">Pros</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {tool.pros.map((p) => (
                        <p key={p} className="flex gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-emerald-500" />{p}</p>
                      ))}
                    </CardContent>
                  </Card>
                )}
                {tool.cons && (
                  <Card>
                    <CardHeader><CardTitle className="text-lg text-destructive">Cons</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {tool.cons.map((c) => (
                        <p key={c} className="flex gap-2 text-sm"><X className="h-4 w-4 shrink-0 text-destructive" />{c}</p>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </section>
            )}

            {tool.use_cases && (
              <section className="mt-10">
                <h2 className="text-xl font-semibold">Use Cases</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.use_cases.map((uc) => (
                    <Badge key={uc} variant="secondary">{uc}</Badge>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="mt-4 space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{r.user_name}</span>
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {r.rating}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review on the official site.</p>
                )}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">FAQ</h2>
              <Accordion type="single" collapsible className="mt-4">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={String(i)}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <aside className="w-full lg:w-80 space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-5">
                <p className="text-sm font-medium">Quick Info</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Pricing</dt><dd>{tool.price_label || tool.pricing}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Rating</dt><dd>{tool.rating}/5</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Reviews</dt><dd>{tool.review_count}</dd></div>
                </dl>
                <Button className="mt-4 w-full" asChild>
                  <a href={visitUrl} target="_blank" rel="noopener noreferrer sponsored">Get {tool.name}</a>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        {alternatives.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold">Alternatives</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alternatives.map((t, i) => <ToolCard key={t.id} tool={t} index={i} />)}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold">Related Tools</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t, i) => <ToolCard key={t.id} tool={t} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
