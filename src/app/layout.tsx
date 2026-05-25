import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BookmarksProvider } from "@/components/providers/bookmarks-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NewsletterModal } from "@/components/newsletter/newsletter-modal";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ResearchAIHub — Best AI Tools for Research & Productivity",
    template: "%s | ResearchAIHub",
  },
  description:
    "Discover the best AI tools for research, thesis writing, coding, engineering, and productivity. Curated directory for researchers, students, and developers.",
  keywords: ["AI tools", "research AI", "thesis writing", "coding AI", "productivity", "literature review"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://researchaihub.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ThemeProvider>
          <BookmarksProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <NewsletterModal />
          </BookmarksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
