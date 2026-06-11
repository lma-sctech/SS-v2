import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CardSurface } from "@/components/ui/CardSurface";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { MapCard } from "@/components/marketing/MapCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { siteConfig } from "@/data/site";
import { emailLink, phoneLink, whatsappLink } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Contact",
  "Contact Sanaa Services by phone, WhatsApp, email or quick request form.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact" title="Call, message or send a quick request." body="Visit us in Astoria, Queens, or reach out by phone, WhatsApp or email." />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div className="space-y-5">
          <CardSurface glow className="p-6">
            <p className="text-sm font-bold text-champagne">Phone</p>
            <a className="focus-ring mt-2 block rounded-md text-xl font-bold text-navy" href={phoneLink()}>{siteConfig.phoneDisplay}</a>
          </CardSurface>
          <CardSurface glow className="p-6">
            <p className="text-sm font-bold text-champagne">Email</p>
            <a className="focus-ring mt-2 block rounded-md text-xl font-bold text-navy" href={emailLink()}>{siteConfig.email}</a>
          </CardSurface>
          <CTAGroup>
            <ButtonLink href={phoneLink()} variant="contact">Contact us</ButtonLink>
            <ButtonLink href={whatsappLink()} variant="whatsapp" target="_blank" rel="noreferrer">Message on WhatsApp</ButtonLink>
          </CTAGroup>
          <MapCard />
        </div>
        <QuickLeadForm />
      </div>
    </div>
  );
}
