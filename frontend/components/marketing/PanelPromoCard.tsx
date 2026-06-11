import type { ReactNode } from "react";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

export function PanelPromoCard({
  eyebrow,
  title,
  body,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  children: ReactNode;
}) {
  return (
    <section className="relative h-full min-h-[26rem] overflow-hidden rounded-2xl border border-white/45 bg-navy text-center text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)]">
      <ResponsiveImage
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/72 to-navy/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-28px_70px_rgba(15,23,42,0.42)]" />
      <div className="relative z-10 flex min-h-[26rem] items-center justify-center px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex min-h-[19rem] w-full max-w-2xl flex-col justify-between rounded-2xl border border-white/18 bg-navy/42 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">{eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/78">{body}</p>
          </div>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </section>
  );
}
