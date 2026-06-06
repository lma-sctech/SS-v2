import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { publicAsset } from "@/lib/assets";
import { phoneLink, whatsappLink } from "@/lib/contact";

export function ContactStrip({ service }: { service?: string }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/45 bg-navy p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] sm:p-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${publicAsset("/img/legal_consultancy2.jpg")})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/38" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-champagne/35 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-28px_70px_rgba(15,23,42,0.42)]" />
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">We are here when you need us</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Ready to move forward?</h2>
          <p className="mt-2 text-sm leading-6 text-white/72">Call, message us on WhatsApp, or send a quick request through the form. Our team is available Monday to Saturday, 9:00 AM to 6:00 PM.</p>
        </div>
        <CTAGroup align="right" className="md:max-w-md">
          <ButtonLink href={phoneLink()} variant="contact" fullMobile>Contact us</ButtonLink>
          <ButtonLink href={whatsappLink(service)} variant="whatsapp" fullMobile target="_blank" rel="noreferrer">Message on WhatsApp</ButtonLink>
        </CTAGroup>
      </div>
    </section>
  );
}
