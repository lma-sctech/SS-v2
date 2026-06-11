import Link from "next/link";
import { siteConfig } from "@/data/site";
import { AboutStoryTrigger } from "@/components/marketing/AboutStoryTrigger";
import { SiteLogo } from "@/components/layout/SiteLogo";

export function Footer() {
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;
  const mapQuery = encodeURIComponent(`${siteConfig.name}, ${addressLine}`);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <footer className="relative z-20 border-t border-[#253150]/80 bg-[#121B35]/95 pb-16 text-white shadow-[0_-18px_70px_rgba(18,27,53,0.28)] backdrop-blur-md md:pb-0">
      <div className="mx-auto grid max-w-7xl items-center gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_20rem] lg:px-8">
        <div>
          <SiteLogo size="footer" />
          <p className="max-w-xl text-sm leading-6 text-white/78 drop-shadow-sm">
            Travel planning, insurance, document support and essential services from Astoria, New York, with personalized guidance at every step.
          </p>
        </div>

        <div className="lg:text-right">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
            <iframe
              title="Sanaa Services location on Google Maps"
              src={mapSrc}
              className="h-32 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-2 text-sm leading-5 text-white/78">
            <p>{addressLine}</p>
            <p>{siteConfig.hours}</p>
            <a className="focus-ring rounded-sm font-semibold text-champagne hover:text-white" href={mapLink} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#253150]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-xs text-white/62 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright 2026 Sanaa Services. All rights reserved.</p>
          <div className="flex gap-4">
            <AboutStoryTrigger className="focus-ring rounded-sm text-left hover:text-white">
              About us
            </AboutStoryTrigger>
            <Link className="focus-ring rounded-sm hover:text-white" href="/contact">Contact</Link>
            <Link className="focus-ring rounded-sm hover:text-white" href="/privacy">Privacy</Link>
            <a className="focus-ring rounded-sm hover:text-white" href={siteConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Google Reviews</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
