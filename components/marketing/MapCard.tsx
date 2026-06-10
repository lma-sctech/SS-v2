import { siteConfig } from "@/data/site";
import { CardSurface } from "@/components/ui/CardSurface";

export function MapCard() {
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;
  const mapQuery = encodeURIComponent(`${siteConfig.name}, ${addressLine}`);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <CardSurface glow className="flex min-h-72 items-center justify-center bg-[linear-gradient(135deg,#e5e9ef,#f1f3f6_45%,#e8ecf1)] p-6">
      <div className="max-w-sm text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Visit us in Astoria</p>
        <p className="mt-3 text-xl font-bold text-navy">{siteConfig.address.street}</p>
        <p className="mt-2 text-sm leading-6 text-slate">
          {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
        </p>
        <a className="focus-ring mt-4 inline-flex rounded-full bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-ink" href={mapLink} target="_blank" rel="noreferrer">
          Open in Google Maps
        </a>
      </div>
    </CardSurface>
  );
}
