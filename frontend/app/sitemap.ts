import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";
const lastModified = new Date("2026-06-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/reviews", "/faq", "/contact", "/privacy"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);

  return [...routes, ...serviceRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
