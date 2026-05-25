import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with the ResearchAIHub team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-muted-foreground">Questions, partnerships, or feedback—we&apos;d love to hear from you.</p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
