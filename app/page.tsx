import { ButtonLink } from "@/components/ui/ButtonLink";
import { CardSurface } from "@/components/ui/CardSurface";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { ContactStrip } from "@/components/marketing/ContactStrip";
import { AnimatedTravelServiceCard } from "@/components/marketing/AnimatedTravelServiceCard";
import { AirlineLogoCarousel } from "@/components/marketing/AirlineLogoCarousel";
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

const worldCupServices = [
  "Flights to New York and other US host cities",
  "Hotel and accommodation guidance",
  "Travel insurance",
  "Family travel planning",
  "Multi-city trip support",
  "Airport transfer guidance",
  "Documents and travel checklist",
  "Support in English, French and Arabic",
];

const communityPoints = [
  "Travel support for fans",
  "Family and group trip guidance",
  "Fan-friendly travel planning",
  "Local agency in a community neighborhood",
  "In-person or remote assistance",
];

const travelServices = [
  {
    title: "Flights & Bookings",
    body: "Book flights to Morocco, New York, across the United States and international destinations with personalized support.",
    image: "/img/Flight.jpg",
  },
  {
    title: "Hotels & Stay Planning",
    body: "Get help finding practical accommodation options for families, fans and travelers.",
    image: "/img/hotel and stay planning.jpg",
  },
  {
    title: "Family Travel",
    body: "Traveling with parents, children or a group? We help you organize the trip clearly and comfortably.",
    image: "/img/optimized/services/travel-1200.jpg",
  },
  {
    title: "Travel Insurance",
    body: "Protect your trip with insurance guidance for families, individuals and international travelers.",
    image: "/img/Travel Insurance.png",
  },
  {
    title: "World Cup 2026 Trips",
    body: "Planning to attend matches or travel during the tournament? We help you prepare flights, stays, routes and documents.",
    image: "/img/worldcup2.jpg",
    images: [
      "/img/worldcup- (1).jpg",
      "/img/worldcup- (2).jpg",
      "/img/worldcup- (3).jpg",
      "/img/worldcup- (4).jpg",
      "/img/worldcup- (5).jpg",
      "/img/worldcup- (6).jpg",
    ],
  },
  {
    title: "Multi-City USA Travel",
    body: "Need to move between New York, Miami, Dallas, Los Angeles, Atlanta or other cities? We help organize the journey.",
    image: "/img/multi-city-travel.gif",
  },
];

const steps = [
  "Tell us your destination, dates and number of travelers.",
  "We review your options for flights, hotels, insurance and travel support.",
  "You confirm the plan and we help you move forward with confidence.",
];

const otherServices = [
  "Notary services for authorizations and family documents",
  "Translation for travel and immigration documents",
  "Visa and immigration document support",
  "Insurance for auto, life, family and travel-related needs",
  "Legal document and administrative guidance",
  "Driving school and DMV guidance for newcomers",
];

const reasons = [
  "Located in Astoria, Queens",
  "Support in English, French and Arabic",
  "Community-first approach",
  "Travel, documents and insurance in one place",
  "In-person and remote assistance",
  "WhatsApp-first communication",
  "Personalized guidance, not automated booking only",
  "Longstanding local service",
];

export default async function HomePage() {
  const reviewsResult = await getDisplayReviews(4);

  return (
    <div className="home-video-page">
      <section className="home-hero-section relative -mt-[var(--site-header-height)] min-h-[92vh] overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/94 via-navy/76 to-navy/24" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/82 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-champagne backdrop-blur">
              Travel agency in New York
            </p>
            <h1 className="mt-6 max-w-4xl font-sans text-5xl font-bold leading-none tracking-normal sm:text-6xl lg:text-7xl">
              Your World Cup 2026 Travel Partner
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              Flights, hotels, travel insurance and personalized travel support for Moroccan, Arab and international fans traveling to New York, across the United States, and beyond.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsappLink("World Cup 2026 travel planning")} variant="whatsapp" size="lg" target="_blank" rel="noreferrer" fullMobile>
                Message us on WhatsApp
              </ButtonLink>
              <ButtonLink href="#travel-services" variant="secondary" size="lg" fullMobile>
                Explore Travel Services
              </ButtonLink>
            </div>
          </div>
          <div className="mt-10 grid gap-3 border-t border-white/15 pt-5 text-sm font-semibold text-white/76 sm:grid-cols-2 lg:grid-cols-4">
            {heroBadges.map((badge) => (
              <p key={badge}>{badge}</p>
            ))}
          </div>
        </div>
      </section>

      <AirlineLogoCarousel />

      <section className="bg-navy py-16 text-white" id="world-cup-2026">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
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
          <div className="grid gap-4 sm:grid-cols-2">
            {worldCupServices.map((item) => (
              <CardSurface key={item} variant="dark" interactive className="p-5 text-sm font-bold leading-6 text-white">
                {item}
              </CardSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/60 shadow-soft">
          {["/img/worldcup1.jpg", "/img/worldcup2.jpg", "/img/worldcup3.jpg", "/img/worldcup4.jpg"].map((image, index) => (
            <ResponsiveImage
              key={image}
              src={image}
              className="worldcup-slide absolute inset-0 h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/86 via-navy/30 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Astoria to the stadium</p>
            <p className="mt-3 max-w-xl text-3xl font-bold">Travel support for fans, families and visitors coming through New York.</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="World Cup fan travel"
            title="World Cup fans in New York, your journey starts here."
            body="From Astoria to the stadium, from flights to family trips, Sanaa Services helps World Cup fans prepare for one of the biggest football moments of 2026."
            tone="dark"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {communityPoints.map((point) => (
              <CardSurface key={point} interactive className="p-4 text-sm font-bold text-navy">
                {point}
              </CardSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f5]/80 py-16" id="travel-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Travel Agency Services"
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

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8" id="quick-request">
        <div>
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

      <section className="bg-navy py-16 text-white" id="other-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Additional services"
            title="More services when you need them."
            body="Beyond travel, Sanaa Services helps individuals and families with important life documents and administrative needs."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <CardSurface key={service} variant="dark" interactive className="p-5 text-sm font-bold leading-6 text-white">
                {service}
              </CardSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <SectionHeading
          eyebrow="Why choose Sanaa Services"
          title="Local, multilingual and trusted by the community."
          body="You can visit us in Astoria or contact us remotely. We bring travel, insurance and document support together so your next step feels clearer."
          tone="dark"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <CardSurface key={reason} interactive className="p-5 text-sm font-bold text-navy">
              {reason}
            </CardSurface>
          ))}
        </div>
      </section>

      <section className="bg-[#eef1f5]/80 py-16" id="reviews">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Google reviews"
              title="Trusted by clients for travel, documents and support."
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
        <CardSurface glow className="creators-partner-card p-6 sm:p-8">
          <SectionHeading
            eyebrow="Creators and partners"
            title="Creators and community partners visiting New York?"
            body="Sanaa Services welcomes creators, community pages and travel partners looking to collaborate around World Cup 2026, Moroccan fans, Arab community travel and New York experiences."
          />
          <ButtonLink href="#quick-request" className="mt-7" variant="dark">
            Contact us for collaboration
          </ButtonLink>
        </CardSurface>
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
