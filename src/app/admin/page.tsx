import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tools } from "@/data/tools";
import { blogPosts } from "@/data/blog";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Tools", value: tools.length },
    { label: "Featured", value: tools.filter((t) => t.is_featured).length },
    { label: "Blog Posts", value: blogPosts.length },
    { label: "Trending", value: tools.filter((t) => t.is_trending).length },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Connect Supabase and enable auth for live data. Seed data shown below.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="font-semibold">Phase 2 Ready</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Architecture supports AI recommendation engine, personalized suggestions, and smart comparisons via{" "}
            <code className="rounded bg-muted px-1">src/lib/data.ts</code> extension points.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
