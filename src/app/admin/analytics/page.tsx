import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Tool views are tracked via the <code className="rounded bg-muted px-1">tool_views</code> table when Supabase is connected.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Page Views", "Tool Clicks", "Newsletter Signups"].map((metric) => (
          <Card key={metric}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-muted-foreground">Connect Supabase for live data</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
