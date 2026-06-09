import { phoneLink, whatsappLink } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/95 px-3 py-2 shadow-soft backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <ButtonLink href={phoneLink()} variant="contact" size="mobileBar" className="w-full">
          <span className="truncate">Plan My Trip</span>
        </ButtonLink>
        <ButtonLink href={whatsappLink()} variant="whatsapp" size="mobileBar" className="w-full" target="_blank" rel="noreferrer">
          WhatsApp
        </ButtonLink>
      </div>
    </div>
  );
}
