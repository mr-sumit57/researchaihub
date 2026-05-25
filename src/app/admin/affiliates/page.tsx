import { tools } from "@/data/tools";

export default function AdminAffiliatesPage() {
  const withAffiliate = tools.filter((t) => t.affiliate_url);

  return (
    <div>
      <h1 className="text-2xl font-bold">Affiliate Links</h1>
      <p className="mt-2 text-sm text-muted-foreground">Manage affiliate URLs for monetization.</p>
      <ul className="mt-6 space-y-3">
        {withAffiliate.length > 0 ? (
          withAffiliate.map((t) => (
            <li key={t.id} className="rounded-lg border border-border p-4">
              <p className="font-medium">{t.name}</p>
              <p className="mt-1 truncate text-sm text-primary">{t.affiliate_url}</p>
            </li>
          ))
        ) : (
          <li className="text-sm text-muted-foreground">No affiliate links in seed data.</li>
        )}
      </ul>
    </div>
  );
}
