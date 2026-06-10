import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { siteConfig } from "@/data/site";
import { localBusinessSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/img/hero-poster.webp",
        width: 1200,
        height: 630,
        alt: "Sanaa Services travel support for World Cup 2026 and family trips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/img/hero-poster.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="site-background-scrim pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
        <div className="relative z-10 min-h-screen">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
          <Header />
          <main className="site-main relative z-10 pt-[var(--site-header-height)]">{children}</main>
          <Footer />
        </div>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
