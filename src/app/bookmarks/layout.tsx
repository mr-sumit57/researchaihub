import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Saved Tools",
  description: "Your bookmarked AI tools on ResearchAIHub.",
  path: "/bookmarks",
  noIndex: true,
});

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
