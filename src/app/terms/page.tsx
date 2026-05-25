import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "ResearchAIHub terms of service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <div className="prose-blog mt-8 space-y-4 text-muted-foreground">
        <p>Last updated: May 2025</p>
        <h2>Acceptance</h2>
        <p>By using ResearchAIHub, you agree to these terms. If you disagree, please do not use our services.</p>
        <h2>Content & Listings</h2>
        <p>Tool descriptions and ratings are for informational purposes. We strive for accuracy but do not guarantee completeness. Affiliate links may be present and are disclosed.</p>
        <h2>User Submissions</h2>
        <p>By submitting tools or content, you grant us a license to display and promote that content on our platform.</p>
        <h2>Limitation of Liability</h2>
        <p>ResearchAIHub is provided as-is. We are not liable for decisions made based on tool listings or third-party services.</p>
      </div>
    </div>
  );
}
