import { ContactStrip } from "@/components/marketing/ContactStrip";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { generalFaqs } from "@/data/faq";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "FAQ",
  "Frequently asked questions about Sanaa Services requests, uploads and contact options.",
  "/faq",
);

export default function FAQPage() {
  const serviceFaqs = services.flatMap((service) => service.faqs.slice(0, 1));

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="FAQ" title="Answers before you send a request." />
      <div className="mt-8">
        <FAQAccordion faqs={[...generalFaqs, ...serviceFaqs]} />
      </div>
      <div className="mt-12">
        <ContactStrip />
      </div>
    </div>
  );
}
