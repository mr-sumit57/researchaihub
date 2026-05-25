import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ToolsDirectory } from "@/components/tools/tools-directory";
import { fetchTools } from "@/lib/data";

export const metadata = buildMetadata({
  title: "AI Tools Directory",
  description: "Browse 30+ curated AI tools for research, writing, coding, and productivity. Filter by category, pricing, and ratings.",
  path: "/tools",
});

export default async function ToolsPage() {
  const tools = await fetchTools();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "AI Tools Directory", href: "/tools" }]} />
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Tools Directory</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Discover, compare, and bookmark the best AI tools for researchers, students, and engineers.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="text-muted-foreground">Loading tools...</div>}>
          <ToolsDirectory initialTools={tools} />
        </Suspense>
      </div>
    </div>
  );
}
