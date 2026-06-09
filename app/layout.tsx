import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { HeroVideo } from "@/components/media/HeroVideo";
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <HeroVideo video="/vid/hero-vid1.mp4" fixed priority />
        <div className="site-background-scrim pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
        <div className="relative z-10 min-h-screen">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
          <Header />
          <main className="site-main relative z-10 pt-[var(--site-header-height)]">{children}</main>
          <Footer />
        </div>
        <ScrollToTopButton />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
