import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/data/services";
import { publicAsset } from "@/lib/assets";

export function ServiceCard({
  service,
  featured = false,
  revealDirection,
  revealIndex = 0,
  revealActive = false,
}: {
  service: Service;
  featured?: boolean;
  revealDirection?: "left" | "right";
  revealIndex?: number;
  revealActive?: boolean;
}) {
  const revealClass = revealDirection
    ? `service-card-reveal service-card-from-${revealDirection} ${revealActive ? "service-card-visible" : ""}`
    : "";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`focus-ring group relative flex h-full min-h-80 overflow-hidden rounded-2xl border border-white/45 p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.26)] ${
        featured
          ? "bg-navy text-white md:col-span-2"
          : "bg-navy text-white"
      } ${revealClass}`}
      style={revealDirection ? { transitionDelay: `${revealIndex * 90}ms` } : undefined}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 z-10 h-44 w-44 rounded-full bg-champagne/35 blur-3xl transition duration-500 group-hover:bg-champagne/50" />
      <div className="pointer-events-none absolute -bottom-20 left-8 z-10 h-40 w-56 rounded-full bg-navy/80 blur-3xl" />
      <Image
        src={publicAsset(service.image)}
        alt=""
        fill
        sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className={`absolute inset-0 ${featured ? "bg-gradient-to-r from-navy via-navy/78 to-navy/35" : "bg-gradient-to-t from-navy/95 via-navy/62 to-navy/20"}`} />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-navy/45 via-champagne/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-28px_70px_rgba(15,23,42,0.42)]" />
      <div className="pointer-events-none absolute inset-px rounded-2xl border border-white/0 transition duration-500 group-hover:border-champagne/45" />
      <div className="relative z-10 flex h-full max-w-md flex-col">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/90">{service.eyebrow}</p>
        <p className="mt-5 font-sans text-4xl font-bold leading-none tracking-normal text-white">{service.title}</p>
        <p className="mt-4 flex-1 text-base leading-7 text-white/90">{service.summary}</p>
        <span className="mt-8 text-sm font-bold text-white">
          Learn more
        </span>
      </div>
    </Link>
  );
}
