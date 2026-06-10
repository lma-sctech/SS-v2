import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

const socialImage = {
  url: "/img/hero-poster.webp",
  width: 1200,
  height: 630,
  alt: "Sanaa Services travel support for World Cup 2026 and family trips",
};

export function buildMetadata(title: string, description: string, path = "/"): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
