import { tools } from "@/data/tools";
import { Badge } from "@/components/ui/badge";

export default function AdminFeaturedPage() {
  const featured = tools.filter((t) => t.is_featured);
  const sponsored = tools.filter((t) => t.is_sponsored);

  return (
    <div>
      <h1 className="text-2xl font-bold">Featured & Sponsored</h1>
      <h2 className="mt-8 text-lg font-semibold">Featured Tools ({featured.length})</h2>
      <ul className="mt-4 space-y-2">
        {featured.map((t) => (
          <li key={t.id} className="flex items-center gap-2 rounded-lg border border-border p-3">
            {t.name}
            {t.is_sponsored && <Badge variant="sponsored">Sponsored</Badge>}
          </li>
        ))}
      </ul>
      <h2 className="mt-8 text-lg font-semibold">Sponsored ({sponsored.length})</h2>
      <ul className="mt-4 space-y-2">
        {sponsored.map((t) => (
          <li key={t.id} className="rounded-lg border border-border p-3">
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
