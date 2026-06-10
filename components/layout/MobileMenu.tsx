import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navItems } from "@/data/site";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { AboutStoryTrigger } from "@/components/marketing/AboutStoryTrigger";

export function MobileMenu() {
  return (
    <details className="group relative z-20 xl:hidden">
      <summary className="focus-ring flex size-10 cursor-pointer list-none items-center justify-center rounded-md [&::-webkit-details-marker]:hidden" aria-label="Open navigation menu">
        <span className="flex w-6 flex-col gap-1.5">
          <span className="h-0.5 rounded-full bg-white transition group-open:translate-y-2 group-open:rotate-45" />
          <span className="h-0.5 rounded-full bg-white transition group-open:opacity-0" />
          <span className="h-0.5 rounded-full bg-white transition group-open:-translate-y-2 group-open:-rotate-45" />
        </span>
      </summary>

      <div className="absolute right-0 top-14 w-[min(17.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/45 bg-[#F2A30F] p-3 text-navy shadow-[0_22px_70px_rgba(15,23,42,0.22)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -left-10 top-0 h-full w-20 bg-gradient-to-r from-white/45 to-transparent blur-xl" />
        <div className="pointer-events-none absolute -right-10 top-0 h-full w-20 bg-gradient-to-l from-white/35 to-transparent blur-xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-navy/10" />
        <nav aria-label="Mobile navigation" className="relative z-10 grid gap-1.5">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-xl px-4 py-3 text-sm font-bold text-navy transition hover:bg-white/35">
              {item.label}
            </Link>
          ))}
          <AboutStoryTrigger className="focus-ring rounded-xl px-4 py-3 text-left text-sm font-bold text-navy transition hover:bg-white/35">
            About us
          </AboutStoryTrigger>
        </nav>
        <div className="relative z-10 mt-4 grid gap-2">
          <ButtonLink href={phoneLink()} variant="contact" fullMobile>
            Contact us
          </ButtonLink>
          <ButtonLink href={whatsappLink()} variant="whatsapp" fullMobile target="_blank" rel="noreferrer">
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </details>
  );
}
