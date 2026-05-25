import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";
import { fetchCategory, fetchTools } from "@/lib/data";
import { categories } from "@/data/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await fetchCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} Tools`,
    description: category.description,
    path: `/categories/${slug}`,
  });
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await fetchCategory(slug);
  if (!category) notFound();

  const tools = await fetchTools({ category: slug });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Categories", href: "/tools" },
          { name: category.name, href: `/categories/${slug}` },
        ]}
      />
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
      <p className="mt-4 text-sm text-muted-foreground">{tools.length} tools</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
