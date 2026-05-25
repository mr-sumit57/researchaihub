import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function AdminBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Blog</h1>
      <p className="mt-2 text-sm text-muted-foreground">Blog posts from seed data. Connect Supabase for CRUD.</p>
      <ul className="mt-6 space-y-2">
        {blogPosts.map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded-lg border border-border p-4">
            <span className="font-medium">{p.title}</span>
            <Link href={`/blog/${p.slug}`} className="text-sm text-primary hover:underline">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
