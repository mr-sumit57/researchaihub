import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/tools", label: "AI Tools Directory" },
    { href: "/trending", label: "Trending Tools" },
    { href: "/free-tools", label: "Free Tools" },
    { href: "/bookmarks", label: "Saved Tools" },
    { href: "/submit", label: "Submit a Tool" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy/5 dark:bg-navy-light/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              ResearchAIHub
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Discover the best AI tools for research, thesis writing, coding, engineering, and productivity.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResearchAIHub. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Affiliate links may be used. Sponsored listings are clearly marked.
          </p>
        </div>
      </div>
    </footer>
  );
}
