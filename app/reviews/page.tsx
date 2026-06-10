import { ContactStrip } from "@/components/marketing/ContactStrip";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ReviewCard } from "@/components/marketing/ReviewCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { getDisplayReviews } from "@/lib/google-reviews";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Reviews",
  "Client reviews and trust signals for Sanaa Services across the United States.",
  "/reviews",
);

export default async function ReviewsPage() {
  const reviewsResult = await getDisplayReviews(4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Google reviews"
          title="Trusted by clients across the United States."
          body={
            reviewsResult.rating && reviewsResult.reviewCount
              ? `Rated ${reviewsResult.rating.toFixed(1)}/5 on Google from ${reviewsResult.reviewCount} reviews.`
              : "A few words from clients who trusted Sanaa Services with important documents, travel and everyday admin."
          }
        />
        <ButtonLink href={reviewsResult.sourceUrl} variant="secondary" target="_blank" rel="noreferrer">
          Read more on Google
        </ButtonLink>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reviewsResult.reviews.map((review) => <ReviewCard key={`${review.name}-${review.quote}`} {...review} />)}
      </div>
      <div className="mt-12">
        <ContactStrip />
      </div>
    </div>
  );
}
