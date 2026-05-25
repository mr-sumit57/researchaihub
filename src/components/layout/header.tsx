"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Sparkles, Moon, Sun, Bookmark } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/tools", label: "Directory" },
  { href: "/trending", label: "Trending" },
  { href: "/free-tools", label: "Free Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="hidden sm:inline">
            Research<span className="text-primary">AI</span>Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/tools">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/bookmarks" aria-label="Saved tools">
              <Bookmark className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button size="sm" variant="ghost" className="hidden sm:flex" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button size="sm" className="hidden sm:flex" asChild>
            <Link href="/submit">Submit Tool</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/submit" className="rounded-lg px-3 py-2 text-sm text-primary" onClick={() => setOpen(false)}>
            Submit Tool
          </Link>
        </nav>
      </div>
    </header>
  );
}
