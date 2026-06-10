import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { publicAsset } from "@/lib/assets";
import { AboutStoryTrigger } from "@/components/marketing/AboutStoryTrigger";

export function Footer() {
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;
  const mapQuery = encodeURIComponent(`${siteConfig.name}, ${addressLine}`);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <footer className="border-t border-[#253150]/80 bg-[#121B35]/90 text-white shadow-[0_-18px_70px_rgba(18,27,53,0.28)] backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div>
          <Link href="/" className="focus-ring relative inline-flex h-16 w-full max-w-[28rem] overflow-visible rounded-md" aria-label={`${siteConfig.name} home`}>
            <span className="absolute left-0 top-1/2 block h-40 w-full -translate-y-1/2 overflow-visible">
              <Image
                src={publicAsset("/img/optimized/logo/sanaa-logo-640.png")}
                alt=""
                fill
                sizes="448px"
                className="object-contain object-left drop-shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
              />
            </span>
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/78 drop-shadow-sm">
            Travel planning, insurance and document support from Astoria for families, Moroccan and Arab communities, and World Cup 2026 visitors.
          </p>
        </div>

        <div className="lg:text-right">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
            <iframe
              title="Sanaa Services location on Google Maps"
              src={mapSrc}
              className="h-44 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-3 text-sm leading-6 text-white/78">
            <p>{addressLine}</p>
            <p>{siteConfig.hours}</p>
            <a className="focus-ring rounded-sm font-semibold text-champagne hover:text-white" href={mapLink} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#253150]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/62 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
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
