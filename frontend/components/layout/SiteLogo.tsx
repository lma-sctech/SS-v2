import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { publicAsset } from "@/lib/assets";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  size?: "header" | "footer";
};

const logoSizes = {
  header: "h-24 w-44 sm:h-32 sm:w-64 xl:h-32 xl:w-80",
  footer: "h-28 w-72 sm:h-32 sm:w-[26rem] xl:h-32 xl:w-[30rem]",
};

export function SiteLogo({ className = "", priority = false, size = "header" }: SiteLogoProps) {
  const logoSize = logoSizes[size];
  const logoSrc = size === "footer"
    ? "/img/optimized/logo/sanaa-logo-footer.png"
    : "/img/optimized/logo/sanaa-logo-640.png";
  const imageClass = "translate-y-2 object-contain object-center";

  if (size === "footer") {
    return (
      <Link
        href="/"
        className={`focus-ring group relative inline-flex overflow-visible rounded-md text-white transition hover:text-champagne ${logoSize} ${className}`}
        aria-label={`${siteConfig.name} home`}
      >
        <span className={`relative block overflow-visible ${logoSize}`}>
          <Image
            src={publicAsset(logoSrc)}
            alt=""
            fill
            sizes="(min-width: 1280px) 480px, (min-width: 640px) 416px, 288px"
            className="translate-y-2 object-contain object-center drop-shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
          />
        </span>
        <span className="sr-only">{siteConfig.name}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`focus-ring group relative inline-flex items-center gap-3 overflow-visible rounded-md text-white transition hover:text-champagne ${logoSize} ${className}`}
      aria-label={`${siteConfig.name} home`}
    >
      <span className={`relative block overflow-visible ${logoSize}`}>
        <Image
          src={publicAsset(logoSrc)}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 320px, (min-width: 640px) 256px, 176px"
          className={imageClass}
        />
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
