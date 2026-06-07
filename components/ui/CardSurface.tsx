import type { ElementType, HTMLAttributes, ReactNode } from "react";

type CardSurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "div" | "article" | "section" | "li" | "form";
  variant?: "light" | "dark" | "media";
  interactive?: boolean;
  glow?: boolean;
};

const variants = {
  light: "border-navy/10 bg-white text-navy shadow-[0_18px_55px_rgba(15,23,42,0.08)]",
  dark: "border-white/10 bg-navy text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)]",
  media: "border-white/45 bg-navy text-white shadow-[0_22px_70px_rgba(15,23,42,0.16)]",
};

export function CardSurface({
  children,
  as: Component = "div",
  variant = "light",
  interactive = false,
  glow = false,
  className = "",
  ...props
}: CardSurfaceProps) {
  const SurfaceTag: ElementType = Component;

  return (
    <SurfaceTag
      className={`relative overflow-hidden rounded-2xl border ${variants[variant]} ${
        interactive ? "transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.18)]" : ""
      } ${className}`}
      {...props}
    >
      {glow ? (
        <>
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-champagne/25 blur-3xl transition duration-500" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-24px_60px_rgba(15,23,42,0.12)]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]" />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </SurfaceTag>
  );
}
