import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SubmitToolForm } from "@/components/forms/submit-tool-form";

export const metadata = buildMetadata({
  title: "Submit an AI Tool",
  description: "Submit your AI tool to be listed on ResearchAIHub.",
  path: "/submit",
});

export default function SubmitPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Submit Tool", href: "/submit" }]} />
      <h1 className="text-3xl font-bold">Submit a Tool</h1>
      <p className="mt-2 text-muted-foreground">
        List your AI product in our directory. Featured and sponsored placements available.
      </p>
      <div className="mt-8">
        <SubmitToolForm />
      </div>
    </div>
  );
}
