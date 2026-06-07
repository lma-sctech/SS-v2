import { CardSurface } from "@/components/ui/CardSurface";
import type { Testimonial } from "@/data/testimonials";

export function ReviewCard({ name, quote, service, rating = 5, sourceLabel, sourceUrl }: Testimonial) {
  return (
    <CardSurface as="article" glow className="h-full p-6">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-champagne">{service}</p>
          <p className="text-sm font-bold text-navy" aria-label={`${rating} out of 5 stars`}>
            {"\u2605".repeat(Math.round(rating))}
          </p>
        </div>
        <blockquote className="mt-4 flex-1 text-base leading-7 text-navy">&ldquo;{quote}&rdquo;</blockquote>
        <div className="mt-5">
          <p className="font-bold text-navy">{name}</p>
          {sourceLabel && sourceUrl ? (
            <a className="focus-ring mt-1 inline-flex rounded-sm text-sm font-semibold text-navy hover:text-champagne" href={sourceUrl} target="_blank" rel="noreferrer">
              {sourceLabel}
            </a>
          ) : null}
        </div>
      </div>
    </CardSurface>
  );
}
