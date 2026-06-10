import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CardSurface } from "@/components/ui/CardSurface";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { ServiceLeadForm } from "@/components/forms/ServiceLeadForm";
import { ContactStrip } from "@/components/marketing/ContactStrip";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { services, getService } from "@/data/services";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata(service.seo.title, service.seo.description, `/services/${service.slug}`);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-navy/10 bg-[#eef1f5]/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">{service.eyebrow}</p>
            <h1 className="mt-4 font-sans text-5xl font-bold tracking-normal text-navy sm:text-6xl">{service.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate">{service.description}</p>
            {service.disclaimer ? (
              <p className="mt-5 rounded-2xl border border-champagne/40 bg-champagne/15 p-4 text-sm leading-6 text-navy">{service.disclaimer}</p>
            ) : null}
            <CTAGroup className="mt-8">
              <ButtonLink href={phoneLink()} variant="contact" size="lg">Contact us</ButtonLink>
              <ButtonLink href={whatsappLink(service.title)} variant="whatsapp" size="lg" target="_blank" rel="noreferrer">Message on WhatsApp</ButtonLink>
            </CTAGroup>
          </div>
          <CardSurface glow className="p-6">
            <p className="text-sm font-bold text-champagne">Prepare before contacting us</p>
            <ul className="mt-5 grid gap-3">
              {service.documents.map((document) => (
                <CardSurface as="li" key={document} interactive className="bg-ivory px-4 py-3 text-sm font-semibold text-navy">{document}</CardSurface>
              ))}
            </ul>
          </CardSurface>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading eyebrow="Covered needs" title={`What ${service.title.toLowerCase()} support can include.`} />
          <div className="mt-8 grid gap-4">
            {service.problems.map((item) => (
              <CardSurface key={item} interactive className="p-5 text-sm font-bold text-navy">{item}</CardSurface>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Process" title="A simple path to follow-up." />
          <ol className="mt-8 space-y-4">
            {service.process.map((step, index) => (
              <CardSurface as="li" key={step} interactive className="p-5">
                <div className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-champagne font-bold text-navy">{index + 1}</span>
                <span className="text-sm font-semibold leading-6 text-navy">{step}</span>
                </div>
              </CardSurface>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <SectionHeading eyebrow="Questions" title="Service FAQ." />
          <div className="mt-8">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </div>
        <ServiceLeadForm service={service} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ContactStrip service={service.title} />
      </section>
    </>
  );
}
