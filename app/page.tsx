import { ButtonLink } from "@/components/ui/ButtonLink";
import { CardSurface } from "@/components/ui/CardSurface";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { ContactStrip } from "@/components/marketing/ContactStrip";
import { AnimatedTravelServiceCard } from "@/components/marketing/AnimatedTravelServiceCard";
import { AirlineLogoCarousel } from "@/components/marketing/AirlineLogoCarousel";
import { AboutStoryTrigger } from "@/components/marketing/AboutStoryTrigger";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { ReviewCard } from "@/components/marketing/ReviewCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { getDisplayReviews } from "@/lib/google-reviews";
import { buildMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/contact";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata(
  "Sanaa Services | Travel Agency in Astoria for World Cup 2026, Morocco Trips & Family Travel",
  "Sanaa Services is a multilingual travel agency in Astoria, Queens helping families, Moroccan and Arab communities with flights, hotels, travel insurance, World Cup 2026 travel support, documents and more.",
);

const heroBadges = [
  "Based in Astoria, Queens",
  "English - French - Arabic",
  "Flights - Hotels - Insurance",
  "World Cup 2026 Travel Help",
];

const travelServices = [
  {
    title: "Flights & Bookings",
    body: "Book flights to Morocco, New York, across the United States and international destinations with personalized support.",
    image: "/img/compressed/flight.jpg",
    accentLabel: "Flight planning",
    ctaPrompt: "flights and bookings",
    highlights: ["Flexible routes", "International travel", "Human booking support"],
    bestFor: ["Families visiting Morocco", "Fans flying to US host cities", "Travelers comparing international routes"],
    process: ["Share your destination, dates and travelers.", "Review flight options with our team.", "Confirm the route that fits your plans."],
    included: ["Flight search support", "Route guidance", "Travel date coordination", "Follow-up by phone or WhatsApp"],
  },
  {
    title: "Hotels & Stay Planning",
    body: "Get help finding practical accommodation options for families, fans and travelers.",
    image: "/img/compressed/hotel-and-stay-planning.jpg",
    accentLabel: "Stay planning",
    ctaPrompt: "hotel and stay planning",
    highlights: ["Budget fit", "Location guidance", "Comfort planning"],
    bestFor: ["Families needing practical stays", "World Cup visitors", "Travelers who want local guidance"],
    process: ["Tell us your destination and travel dates.", "We compare stay needs, location and budget.", "You choose the option that feels right."],
    included: ["Hotel guidance", "Area recommendations", "Family stay planning", "Accommodation follow-up"],
  },
  {
    title: "Family Travel",
    body: "Traveling with parents, children or a group? We help you organize the trip clearly and comfortably.",
    image: "/img/optimized/services/travel-1200.jpg",
    accentLabel: "Family support",
    ctaPrompt: "family travel planning",
    highlights: ["Group comfort", "Clear coordination", "Family-first timing"],
    bestFor: ["Parents traveling with children", "Multi-generation trips", "Groups visiting relatives"],
    process: ["Share who is traveling and what matters most.", "We organize routes, timing and stay needs.", "Your family gets a clearer travel plan."],
    included: ["Traveler count planning", "Family schedule guidance", "Document reminders", "Trip coordination support"],
  },
  {
    title: "Travel Insurance",
    body: "Protect your trip with insurance guidance for families, individuals and international travelers.",
    image: "/img/compressed/travel-insurance.jpg",
    accentLabel: "Trip protection",
    ctaPrompt: "travel insurance",
    highlights: ["Trip protection", "Medical coverage guidance", "Peace of mind"],
    bestFor: ["International travelers", "Families protecting a major trip", "Visitors who want coverage clarity"],
    process: ["Tell us where and when you travel.", "We identify the coverage topics to review.", "You receive follow-up for the next step."],
    included: ["Travel insurance guidance", "Coverage topic review", "Family trip protection support", "Clear next-step follow-up"],
  },
  {
    title: "World Cup 2026 Trips",
    body: "Planning to attend matches or travel during the tournament? We help you prepare flights, stays, routes and documents.",
    image: "/img/compressed/worldcup-main-02.jpg",
    accentLabel: "World Cup 2026",
    ctaPrompt: "World Cup 2026 trip planning",
    highlights: ["Host cities", "Fan travel", "Documents checklist"],
    bestFor: ["Moroccan and Atlas Lions supporters", "Fans traveling to New York", "Families planning tournament trips"],
    process: ["Share your match city, dates and group size.", "We map flights, stays, routes and insurance needs.", "You move forward with a fan-ready checklist."],
    included: ["World Cup travel planning", "Multi-city guidance", "Hotel and flight support", "Document and insurance reminders"],
    images: [
      "/img/compressed/worldcup-01.jpg",
      "/img/compressed/worldcup-02.jpg",
      "/img/compressed/worldcup-03.jpg",
      "/img/compressed/worldcup-04.jpg",
      "/img/compressed/worldcup-05.jpg",
      "/img/compressed/worldcup-06.jpg",
    ],
  },
  {
    title: "Multi-City USA Travel",
    body: "Need to move between New York, Miami, Dallas, Los Angeles, Atlanta or other cities? We help organize the journey.",
    image: "/img/compressed/multi-city-travel.jpg",
    images: [
      "/img/compressed/multi-city-travel.jpg",
      "/img/compressed/travel-across-usa.jpg",
      "/img/compressed/travel-across-usa-2.jpg",
      "/img/compressed/travel-1.jpg",
    ],
    accentLabel: "USA routes",
    ctaPrompt: "multi-city USA travel",
    highlights: ["City-to-city routes", "Timing support", "Transfer guidance"],
    bestFor: ["Travelers visiting several US cities", "Fans moving between host cities", "Families with complex itineraries"],
    process: ["List the cities you need to visit.", "We organize timing, travel order and stay needs.", "You receive a clearer multi-city plan."],
    included: ["Route sequencing", "Schedule planning", "Flight and stay coordination", "Airport transfer guidance"],
  },
];

const steps = [
  "Tell us your destination, dates and number of travelers.",
  "We review your options for flights, hotels, insurance and travel support.",
  "You confirm the plan and we help you move forward with confidence.",
];

export default async function HomePage() {
  const reviewsResult = await getDisplayReviews(4);

  return (
    <div className="home-video-page">
      <section className="home-hero-section relative min-h-[calc(100svh-var(--site-header-height))] overflow-hidden text-white sm:min-h-[calc(92vh-var(--site-header-height))]">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/94 via-navy/76 to-navy/24" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/82 to-transparent" />
        <div className="relative z-10 flex min-h-[calc(100svh-var(--site-header-height))] w-full flex-col items-center justify-end px-5 pb-10 pt-12 sm:min-h-[calc(92vh-var(--site-header-height))] sm:px-6 sm:pt-16 lg:px-10">
          <div className="w-full max-w-[92rem] text-center">
            <p className="mx-auto inline-flex max-w-[21rem] justify-center rounded-full border border-white/25 bg-white/12 px-3 py-2 text-center text-[0.68rem] font-bold uppercase leading-5 tracking-[0.12em] text-champagne backdrop-blur sm:max-w-full sm:px-4 sm:text-xs sm:tracking-[0.18em]">
              Sanaa Services, Your Travel Partner to Support the Atlas Lions
            </p>
            <h1 className="hero-title">
              <span className="hero-title-line hero-title-line-primary">World Cup 2026 in the USA</span>
              <span className="hero-title-line hero-title-line-secondary">Travel with Confidence, Support with Pride</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[22rem] text-center text-base leading-7 text-white/82 sm:max-w-4xl sm:text-lg sm:leading-8">
              Flights, hotels, travel insurance and personalized travel support for Moroccan, Arab and international fans traveling to New York, across the United States, and beyond.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={whatsappLink("World Cup 2026 travel planning")} variant="whatsapp" size="lg" target="_blank" rel="noreferrer" fullMobile>
                Message us on WhatsApp
              </ButtonLink>
              <ButtonLink href="#travel-services" variant="secondary" size="lg" fullMobile>
                Explore Travel Services
              </ButtonLink>
            </div>
          </div>
          <div className="mt-10 grid w-full gap-3 border-t border-white/15 pt-5 text-center text-sm font-semibold text-white/76 sm:grid-cols-2 lg:grid-cols-4">
            {heroBadges.map((badge) => (
              <p key={badge}>{badge}</p>
            ))}
          </div>
        </div>
      </section>

      <AirlineLogoCarousel />

      <section className="scroll-mt-28 bg-navy py-16 text-white sm:scroll-mt-24" id="world-cup-2026">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto">
            <SectionHeading
              eyebrow="World Cup 2026 Travel Support"
              title="Traveling for World Cup 2026? We help you plan it right."
              body="Sanaa Services helps fans and families organize their travel around World Cup 2026 with personalized support from Astoria, New York."
              tone="dark"
            />
            <p className="mt-6 rounded-xl border border-white/15 bg-white/8 p-4 text-sm leading-6 text-white/72">
              Sanaa Services provides travel planning and related services. Match tickets must be purchased through official authorized channels.
            </p>
            <ButtonLink href="#quick-request" className="mt-7" size="lg">
              Request World Cup Travel Help
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <AboutStoryTrigger className="focus-ring group relative min-h-[32rem] overflow-hidden rounded-2xl border border-white/60 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
          <ResponsiveImage
            src="/img/sanaa-bergha.png"
            alt="Sanaa Bergha"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/24 via-transparent to-transparent" />
          <div className="absolute inset-4 rounded-2xl border border-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]" />
        </AboutStoryTrigger>
        <div className="lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:self-start">
          <SectionHeading
            eyebrow="Discover our story"
            title="A Story Built on Trust and Community"
            body="For nearly two decades, Sanaa Services has helped families, travelers, and community members move forward with clarity and confidence. Discover the local Astoria agency built around guidance, service, and personal attention."
            tone="dark"
          />
          <div className="mt-7 max-w-xl">
            <AboutStoryTrigger className="focus-ring mt-5 inline-flex rounded-full bg-champagne px-5 py-3 text-sm font-bold text-navy shadow-sm transition hover:bg-white">
              About us
            </AboutStoryTrigger>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 bg-[#eef1f5]/80 py-16 sm:scroll-mt-24" id="travel-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Travel services built around your needs."
              body="Get human help planning flights, hotels, family trips, travel insurance and multi-city routes from a local multilingual agency."
              tone="dark"
            />
            <ButtonLink href="#quick-request" variant="dark" fullMobile>
              Get a Travel Quote
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {travelServices.map((service, index) => (
              <AnimatedTravelServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-4 py-16 sm:scroll-mt-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8" id="quick-request">
        <div className="lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:self-start">
          <SectionHeading eyebrow="How it works" title="Plan your trip in 3 simple steps." tone="dark" />
          <ol className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <CardSurface as="li" key={step} interactive className="p-5">
                <div className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-champagne font-bold text-navy">{index + 1}</span>
                  <span className="text-sm font-semibold leading-6 text-navy">{step}</span>
                </div>
              </CardSurface>
            ))}
          </ol>
          <ButtonLink href={whatsappLink("travel planning")} variant="whatsapp" className="mt-7" target="_blank" rel="noreferrer">
            Start on WhatsApp
          </ButtonLink>
        </div>
        <QuickLeadForm />
      </section>

      <section className="scroll-mt-28 bg-[#eef1f5]/80 py-16 sm:scroll-mt-24" id="reviews">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Google reviews"
              title="Client Trust, Built Over Years"
              body={
                reviewsResult.rating && reviewsResult.reviewCount
                  ? `Rated ${reviewsResult.rating.toFixed(1)}/5 on Google from ${reviewsResult.reviewCount} reviews.`
                  : "A few words from clients who trusted Sanaa Services with travel, translation, notary and immigration document support."
              }
              tone="dark"
            />
            <ButtonLink href={reviewsResult.sourceUrl} variant="secondary" target="_blank" rel="noreferrer" fullMobile>
              Read more on Google
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {reviewsResult.reviews.map((review) => <ReviewCard key={`${review.name}-${review.quote}`} {...review} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="relative min-h-[26rem] overflow-hidden rounded-2xl text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)]">
          <ResponsiveImage
            src="/img/influencers.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/72 to-navy/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/80 to-transparent" />
          <div className="relative z-10 flex min-h-[26rem] items-center px-6 py-10 sm:px-8 lg:px-10">
            <div className="max-w-2xl rounded-2xl border border-white/18 bg-navy/42 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-6">
            <SectionHeading
              eyebrow="Creators and partners"
              title="Creators and community partners visiting New York?"
              body="Sanaa Services welcomes creators, community pages and travel partners looking to collaborate around World Cup 2026, Moroccan fans, Arab community travel and New York experiences."
              tone="dark"
            />
            <ButtonLink href="#quick-request" className="mt-7" variant="primary">
              Contact us for collaboration
            </ButtonLink>
            </div>
          </div>
        </div>
        <CardSurface glow className="bg-ivory p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Visit or message us</p>
          <p className="mt-4 text-2xl font-bold text-navy">{siteConfig.address.street}</p>
          <p className="mt-2 text-sm leading-6 text-slate">
            {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
          </p>
          <p className="mt-4 text-sm font-semibold text-navy">{siteConfig.hours}</p>
          <p className="mt-2 text-sm font-semibold text-navy">English - French - Arabic</p>
        </CardSurface>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ContactStrip
          service="travel planning"
          eyebrow="Final travel call"
          title="Ready to plan your trip?"
          body="Whether you are traveling for World Cup 2026, visiting family, flying to Morocco or organizing a group trip, Sanaa Services is here to help."
          image="/img/optimized/services/travel-1200.jpg"
        />
      </section>
    </div>
  );
}
