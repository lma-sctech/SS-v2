import { siteConfig } from "@/data/site";
import { testimonials, type Testimonial } from "@/data/testimonials";

type GoogleReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

type GooglePlacesResponse = {
  places?: GooglePlace[];
};

const DEFAULT_QUERY = "Sanaa Services 2525 Steinway Street Astoria NY";

export type ReviewsResult = {
  reviews: Testimonial[];
  rating?: number;
  reviewCount?: number;
  sourceUrl: string;
  isLive: boolean;
};

export async function getDisplayReviews(limit = 4): Promise<ReviewsResult> {
  const sourceUrl = process.env.GOOGLE_REVIEWS_URL || siteConfig.googleReviewsUrl;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return {
      reviews: testimonials.slice(0, limit),
      sourceUrl,
      isLive: false,
    };
  }

  try {
    const place = await fetchGooglePlace(apiKey);
    const reviews = selectBestReviews(place?.reviews || [], limit, sourceUrl);

    return {
      reviews: reviews.length > 0 ? reviews : testimonials.slice(0, limit),
      rating: place?.rating,
      reviewCount: place?.userRatingCount,
      sourceUrl: place?.googleMapsUri || sourceUrl,
      isLive: reviews.length > 0,
    };
  } catch {
    return {
      reviews: testimonials.slice(0, limit),
      sourceUrl,
      isLive: false,
    };
  }
}

async function fetchGooglePlace(apiKey: string): Promise<GooglePlace | undefined> {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.rating,places.userRatingCount,places.googleMapsUri,places.reviews",
    },
    body: JSON.stringify({
      textQuery: process.env.GOOGLE_PLACES_TEXT_QUERY || DEFAULT_QUERY,
      languageCode: "en",
      regionCode: "US",
      maxResultCount: 1,
    }),
    next: { revalidate: 60 * 60 * 12 },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch Google reviews");
  }

  const data = (await response.json()) as GooglePlacesResponse;
  return data.places?.[0];
}

function selectBestReviews(reviews: GoogleReview[], limit: number, sourceUrl: string): Testimonial[] {
  return reviews
    .map((review) => {
      const quote = review.text?.text || review.originalText?.text || "";
      return { review, quote: quote.trim() };
    })
    .filter(({ review, quote }) => (review.rating || 0) >= 5 && quote.length >= 40)
    .sort((a, b) => b.quote.length - a.quote.length)
    .slice(0, limit)
    .map(({ review, quote }) => ({
      name: review.authorAttribution?.displayName || "Google reviewer",
      location: review.relativePublishTimeDescription || "Google review",
      quote,
      service: "Google Review",
      rating: review.rating,
      sourceLabel: "Google",
      sourceUrl: review.authorAttribution?.uri || sourceUrl,
      date: review.relativePublishTimeDescription,
    }));
}
