import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";
import { fetchFreeTools } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Free AI Tools",
  description: "Curated list of free and freemium AI tools for research, writing, and productivity.",
  path: "/free-tools",
});

export default async function FreeToolsPage() {
  const tools = await fetchFreeTools();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Free Tools", href: "/free-tools" }]} />
      <h1 className="text-3xl font-bold">Free AI Tools</h1>
      <p className="mt-2 text-muted-foreground">No credit card required. Perfect for students and budget-conscious researchers.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
