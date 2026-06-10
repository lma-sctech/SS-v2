import Link from "next/link";
import Image from "next/image";
import { navItems, siteConfig } from "@/data/site";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { publicAsset } from "@/lib/assets";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { AboutStoryTrigger } from "@/components/marketing/AboutStoryTrigger";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/25 bg-white/18 shadow-[0_12px_40px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
      <div className="relative mx-auto flex h-[var(--site-header-height)] max-w-[92rem] items-center justify-between px-4 py-0 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring group relative z-10 flex items-center gap-3 rounded-md text-white transition hover:text-champagne" aria-label={`${siteConfig.name} home`}>
          <span className="relative block h-24 w-44 overflow-visible sm:h-32 sm:w-64 xl:h-32 xl:w-80">
            <Image
              src={publicAsset("/img/optimized/logo/sanaa-logo-640.png")}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 320px, (min-width: 640px) 256px, 176px"
              className="translate-y-2 object-contain object-center"
            />
          </span>
          <span className="sr-only">{siteConfig.name}</span>
        </Link>
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
        <div className="relative z-10 hidden items-center gap-2 md:flex">
          <ButtonLink href={phoneLink()} variant="contact" size="sm">Contact us</ButtonLink>
          <ButtonLink href={whatsappLink()} variant="whatsapp" size="sm" target="_blank" rel="noreferrer">WhatsApp</ButtonLink>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
