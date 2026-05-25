import Link from "next/link";
import { LayoutDashboard, Wrench, FileText, BarChart3, Link2, Star, Mail } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/affiliates", label: "Affiliates", icon: Link2 },
  { href: "/admin/featured", label: "Featured", icon: Star },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 border-r border-border bg-card p-4">
        <p className="mb-4 px-2 text-xs font-semibold uppercase text-muted-foreground">Admin</p>
        <nav className="space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
