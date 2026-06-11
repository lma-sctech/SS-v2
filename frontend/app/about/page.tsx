import { ContactStrip } from "@/components/marketing/ContactStrip";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { TrustBadgeRow } from "@/components/marketing/TrustBadgeRow";
import { CardSurface } from "@/components/ui/CardSurface";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "About",
  "Learn about Sanaa Services, an Astoria-based service team helping clients across the United States since 2006.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About Sanaa Services"
        title="A local services hub for documents, travel and everyday admin."
        body="Supporting individuals, families and newcomers across the United States since 2006 with notary, translation, insurance, immigration support, driving school and travel services."
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <CardSurface glow className="p-6">
          <p className="text-base leading-8 text-slate">
            Sanaa Services is a multilingual support desk for people who need practical help with paperwork and service coordination. We listen, explain what is needed, and help clients across the United States move forward with clear next steps in English, French and Arabic.
          </p>
          <div className="mt-8">
            <TrustBadgeRow />
          </div>
        </CardSurface>
        <CardSurface variant="dark" glow className="p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Astoria office</p>
          <p className="mt-4 text-sm leading-7 text-white/80">
            {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/80">{siteConfig.hours}</p>
          <p className="mt-2 text-sm leading-7 text-white/80">{siteConfig.serviceArea}</p>
          <p className="mt-6 rounded-2xl border border-white/15 bg-white/8 p-4 text-sm font-semibold leading-6 text-white/82">
            Support is available in English, French and Arabic for travel, documents, insurance and community services.
          </p>
        </CardSurface>
      </div>
      <div className="mt-12">
        <ContactStrip />
      </div>
    </div>
  );
}
