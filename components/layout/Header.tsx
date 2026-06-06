import Link from "next/link";
import Image from "next/image";
import { navItems, siteConfig } from "@/data/site";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { publicAsset } from "@/lib/assets";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/30 bg-white/20 shadow-[0_12px_40px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
      <div className="relative mx-auto flex h-[var(--site-header-height)] max-w-7xl items-center justify-between px-4 py-0 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring relative z-10 flex items-center gap-3 rounded-md" aria-label={`${siteConfig.name} home`}>
          <span className="relative block h-24 w-44 overflow-visible sm:h-32 sm:w-64 xl:h-40 xl:w-[28rem]">
            <Image
              src={publicAsset("/img/logo_sanaaservices_hd.png")}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 448px, (min-width: 640px) 256px, 176px"
              className="translate-y-2 object-contain object-center"
            />
          </span>
          <span className="sr-only">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-md text-sm font-semibold text-navy/72 transition hover:text-navy">
              {item.label}
            </Link>
          ))}
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
