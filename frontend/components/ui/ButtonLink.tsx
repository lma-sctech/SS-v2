import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "whatsapp" | "contact";
  size?: "sm" | "md" | "lg" | "mobileBar";
  width?: "fit" | "full";
  fullMobile?: boolean;
};

const variants = {
  primary: "bg-champagne text-navy hover:bg-[#c9aa67]",
  secondary: "border border-navy/15 bg-white/70 text-navy hover:bg-white",
  dark: "bg-navy text-white hover:bg-ink",
  whatsapp: "bg-whatsapp text-navy hover:bg-[#20be5b]",
  contact: "bg-[#11308C] text-white hover:bg-[#0d2670]",
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-xs",
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-12 px-6 py-3.5 text-sm sm:text-base",
  mobileBar: "min-h-12 min-w-0 px-3 py-2 text-xs",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  width = "fit",
  fullMobile: _fullMobile = false,
  className = "",
  ...props
}: ButtonLinkProps) {
  const widthClass = width === "full" ? "w-full" : "w-fit";
  const classes = `focus-ring inline-flex ${widthClass} max-w-full shrink-0 items-center justify-center gap-2 whitespace-normal rounded-full text-center font-semibold leading-tight shadow-sm transition ${sizes[size]} ${variants[variant]} ${className}`;

  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
