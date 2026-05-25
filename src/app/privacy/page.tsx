import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "ResearchAIHub privacy policy and data practices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <div className="prose-blog mt-8 space-y-4 text-muted-foreground">
        <p>Last updated: May 2025</p>
        <h2>Information We Collect</h2>
        <p>We collect email addresses for newsletter subscriptions, account information when you sign in, and usage analytics to improve our directory.</p>
        <h2>How We Use Data</h2>
        <p>Data is used to deliver newsletter content, manage bookmarks, and improve tool recommendations. We do not sell personal information.</p>
        <h2>Cookies</h2>
        <p>We use cookies for theme preferences, authentication, and analytics. Third-party services (e.g., Google AdSense) may set additional cookies.</p>
        <h2>Contact</h2>
        <p>For privacy inquiries, contact us via the Contact page.</p>
      </div>
    </div>
  );
}
