import { ContactStrip } from "@/components/marketing/ContactStrip";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceGrid } from "@/components/marketing/ServiceGrid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Travel Services in Astoria",
  "Explore Sanaa Services travel planning, World Cup 2026 travel support, flights, hotels, insurance, translation, notary and document services in Astoria.",
  "/services",
);

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Travel-first support"
        title="Start with travel. Add documents, insurance and guidance when you need them."
        body="Sanaa Services helps families and travelers plan trips from Astoria with support for flights, hotels, travel insurance, World Cup 2026 travel planning and related documents."
      />
      <ServiceGrid featured className="mt-8" />
      <div className="mt-12">
        <ContactStrip service="travel planning" title="Need help planning a trip?" body="Send your destination, dates and traveler count. Our team can help with flights, hotels, insurance and related document support." image="/img/optimized/services/travel-1200.jpg" />
      </div>
    </div>
  );
}
