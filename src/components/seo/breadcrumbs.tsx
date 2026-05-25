import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getSiteUrl } from "@/lib/seo";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl();
  const schemaItems = [{ name: "Home", url: siteUrl }, ...items.map((i) => ({ name: i.name, url: `${siteUrl}${i.href}` }))];

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center hover:text-foreground">
          <Home className="h-4 w-4" />
        </Link>
        {items.map((item) => (
          <span key={item.href} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4" />
            <Link href={item.href} className="hover:text-foreground">
              {item.name}
            </Link>
          </span>
        ))}
      </nav>
    </>
  );
}
