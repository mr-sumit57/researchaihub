import Link from "next/link";
import { tools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminToolsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Tools</h1>
        <Button disabled>Add Tool (Supabase)</Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        With Supabase connected, use the service role to CRUD tools. This table shows seed data.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Pricing</th>
              <th className="p-3 text-left">Flags</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr key={t.id} className="border-b border-border/50">
                <td className="p-3 font-medium">{t.name}</td>
                <td className="p-3">{t.category?.name}</td>
                <td className="p-3">{t.pricing}</td>
                <td className="p-3 flex gap-1">
                  {t.is_featured && <Badge variant="secondary">Featured</Badge>}
                  {t.is_sponsored && <Badge variant="sponsored">Sponsored</Badge>}
                </td>
                <td className="p-3">
                  <Link href={`/tools/${t.slug}`} className="text-primary hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
