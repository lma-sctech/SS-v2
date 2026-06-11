import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { PanelPromoCard } from "@/components/marketing/PanelPromoCard";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { phoneLink, whatsappLink } from "@/lib/contact";

export function ContactStrip({
  service,
  title = "Ready to move forward?",
  body = "Call, message us on WhatsApp, or send a quick request through the form. Our team is available Monday to Saturday, 9:00 AM to 6:00 PM.",
  eyebrow = "We are here when you need us",
  image,
  variant = "default",
}: {
  service?: string;
  title?: string;
  body?: string;
  eyebrow?: string;
  image?: string;
  variant?: "default" | "panel";
}) {
  if (variant === "panel") {
    if (!image) {
      return (
        <section className="relative h-full min-h-[26rem] overflow-hidden rounded-2xl border border-white/45 bg-navy text-center text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)]">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/72 to-navy/20" />
          <div className="relative z-10 flex min-h-[26rem] items-center justify-center px-6 py-10 sm:px-8 lg:px-10">
            <div className="flex min-h-[19rem] w-full max-w-2xl flex-col justify-between rounded-2xl border border-white/18 bg-navy/42 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">{eyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/78">{body}</p>
              </div>
              <CTAGroup align="center" className="sm:w-full">
                <ButtonLink href={phoneLink()} variant="contact">Contact us</ButtonLink>
                <ButtonLink href={whatsappLink(service)} variant="whatsapp" target="_blank" rel="noreferrer">Message on WhatsApp</ButtonLink>
              </CTAGroup>
            </div>
          </div>
        </section>
      );
    }

    return (
      <PanelPromoCard eyebrow={eyebrow} title={title} body={body} image={image}>
        <CTAGroup align="center" className="sm:w-full">
          <ButtonLink href={phoneLink()} variant="contact">Contact us</ButtonLink>
          <ButtonLink href={whatsappLink(service)} variant="whatsapp" target="_blank" rel="noreferrer">Message on WhatsApp</ButtonLink>
        </CTAGroup>
      </PanelPromoCard>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/45 bg-navy p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] sm:p-8">
      {image ? (
        <ResponsiveImage
          src={image}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="(min-width: 1024px) 70vw, 100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/38" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-28px_70px_rgba(15,23,42,0.42)]" />
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/72">{body}</p>
        </div>
        <CTAGroup align="right" className="md:max-w-md">
          <ButtonLink href={phoneLink()} variant="contact">Contact us</ButtonLink>
          <ButtonLink href={whatsappLink(service)} variant="whatsapp" target="_blank" rel="noreferrer">Message on WhatsApp</ButtonLink>
        </CTAGroup>
      </div>
    </section>
  );
}
