import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Newsletter",
  description: "Subscribe to weekly AI tool picks, comparisons, and research tips.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Newsletter", href: "/newsletter" }]} />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold">Weekly AI Tools Digest</h1>
        <p className="mt-4 text-muted-foreground">
          Join researchers and developers getting curated tool picks, exclusive comparisons, and sponsorship opportunities.
        </p>
        <div className="mt-8">
          <NewsletterForm variant="card" />
        </div>
        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {["Trending tools", "In-depth comparisons", "Student discounts"].map((benefit) => (
            <Card key={benefit}>
              <CardContent className="p-4 text-sm font-medium">{benefit}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
