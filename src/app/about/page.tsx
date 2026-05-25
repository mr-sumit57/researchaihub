import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "About ResearchAIHub",
  description: "Learn about our mission to help researchers and students discover the best AI tools.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      <h1 className="text-3xl font-bold">About ResearchAIHub</h1>
      <div className="mt-8 max-w-3xl space-y-6 text-muted-foreground">
        <p>
          ResearchAIHub is a professional directory helping researchers, students, engineers, developers, and productivity enthusiasts discover the best AI tools for their workflows.
        </p>
        <p>
          We curate, compare, and review tools across research, thesis writing, coding, engineering, presentations, diagrams, and automation—so you spend less time searching and more time building.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { title: "Curated", desc: "Every tool is evaluated for quality and relevance to academia and tech." },
          { title: "Transparent", desc: "Sponsored listings and affiliate links are always clearly disclosed." },
          { title: "Future-ready", desc: "Architecture prepared for AI recommendations and personalized search (Phase 2)." },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
