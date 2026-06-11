import Link from "next/link";
import { navItems } from "@/data/site";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { AboutStoryTrigger } from "@/components/marketing/AboutStoryTrigger";
import { SiteLogo } from "@/components/layout/SiteLogo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/25 bg-white/18 shadow-[0_12px_40px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
      <div className="relative mx-auto flex h-[var(--site-header-height)] max-w-[92rem] items-center justify-between px-4 py-0 sm:px-6 lg:px-8">
        <SiteLogo className="z-10" priority />
        <nav aria-label="Main navigation" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/25 bg-white/18 px-2 py-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-full px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-white/12 hover:text-champagne">
              {item.label}
            </Link>
          ))}
          <AboutStoryTrigger className="focus-ring rounded-full px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-white/12 hover:text-champagne">
            About us
          </AboutStoryTrigger>
        </nav>
        <div className="relative z-10 hidden items-center gap-2 xl:flex">
          <ButtonLink href={phoneLink()} variant="contact" size="sm">Contact us</ButtonLink>
          <ButtonLink href={whatsappLink()} variant="whatsapp" size="sm" target="_blank" rel="noreferrer">WhatsApp</ButtonLink>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
