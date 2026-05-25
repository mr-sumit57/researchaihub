import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";
import { fetchTrendingTools } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Trending AI Tools",
  description: "The hottest AI tools for research, coding, and productivity right now.",
  path: "/trending",
});

export default async function TrendingPage() {
  const tools = await fetchTrendingTools(20);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Trending", href: "/trending" }]} />
      <h1 className="text-3xl font-bold">Trending AI Tools</h1>
      <p className="mt-2 text-muted-foreground">Most popular tools this month among researchers and developers.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
