import { ButtonLink } from "@/components/ui/ButtonLink";
import { CardSurface } from "@/components/ui/CardSurface";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { ContactStrip } from "@/components/marketing/ContactStrip";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { ReviewCard } from "@/components/marketing/ReviewCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceGrid } from "@/components/marketing/ServiceGrid";
import { generalFaqs } from "@/data/faq";
import { publicAsset } from "@/lib/assets";
import { getDisplayReviews } from "@/lib/google-reviews";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Sanaa Services | Notary, Insurance, Immigration & Travel in the US",
  "Trusted notary, translation, insurance, immigration and travel assistance for clients across the United States.",
);

const audiences = [
  "Families settled across the US",
  "Newcomers and recent arrivals",
  "Students and young professionals",
  "Travelers heading abroad",
  "Workers needing official documents",
  "Anyone facing paperwork they don't want to handle alone",
];
const prepareLinks = [
  { title: "What to bring to your appointment", body: "Each service has a short checklist of documents and IDs to prepare in advance. Bring the right things the first time - or send them to us ahead of your request.", image: "/img/apointment.jpg" },
  { title: "Your documents stay private", body: "We handle personal and family documents with care. Your information is used only for your request and never shared without your consent.", image: "/img/document_private.jpg" },
  { title: "Not sure where to start?", body: "Call us or send a WhatsApp message. We'll listen to your situation and point you toward the right service - no pressure, no commitment.", image: "/img/where_to_start2.jpg" },
];
const heroTitleWords = "Important life matters deserve the right support.".split(" ");

export default async function HomePage() {
  const reviewsResult = await getDisplayReviews(4);

  return (
    <>
      <section className="relative -mt-[var(--site-header-height)] min-h-[86vh] overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={publicAsset("/img/travel_usa03.jpg")}
            aria-hidden="true"
          >
            <source src={publicAsset("/vid/hero-vid1.mp4")} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/72 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(214,184,124,0.34),transparent_34rem)]" />
        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl flex-col items-center justify-end px-4 pb-10 pt-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="mx-auto mt-5 max-w-5xl font-sans text-6xl font-bold leading-none tracking-normal sm:text-7xl lg:text-8xl">
              {heroTitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="hero-word-reveal inline-block opacity-0"
                  style={{ animationDelay: `${index * 220}ms` }}
                >
                  {word}
                  {index < heroTitleWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78">
              We help individuals and families across the United States handle what matters most.
            </p>
          </div>
          <div className="mt-12 grid w-full gap-3 border-t border-white/10 pt-5 text-sm font-semibold text-white/72 sm:grid-cols-3">
            <p>2525 Steinway Street, Astoria, NY</p>
            <p>English · French · Arabic</p>
            <p>Mon-Sat, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="services">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Services" title="One place for the things that matter most." body="From notarizing a document to booking a flight, from insurance to immigration forms — Sanaa Services handles the paperwork so you can focus on what's next, wherever you are in the United States." />
          <ButtonLink href="/services" variant="secondary" fullMobile>View All Services</ButtonLink>
        </div>
        <ServiceGrid featured />
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Before you reach out"
            title="Know what to bring. Know what to expect."
            body="Many of our clients come to us unsure of where to start. These guides help you prepare before your appointment - so the process is clear, fast and stress-free, whether you visit us in person or reach out remotely."
            tone="dark"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {prepareLinks.map((item) => (
              <article
                key={item.title}
                className="group relative flex min-h-96 overflow-hidden rounded-2xl border border-white/45 bg-navy p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.32)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${publicAsset(item.image)})` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/72 to-navy/12" />
                <div className="pointer-events-none absolute -right-16 -top-16 z-10 h-44 w-44 rounded-full bg-champagne/35 blur-3xl transition duration-500 group-hover:bg-champagne/50" />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-28px_70px_rgba(15,23,42,0.42)]" />
                <div className="relative z-20 mt-auto flex min-h-[13.5rem] flex-col justify-start">
                  <p className="font-sans text-3xl font-bold text-white">{item.title}</p>
                  <p className="mt-4 text-sm leading-6 text-white/80">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f5]/70 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <CardSurface glow className="bg-ivory p-6 sm:p-8">
            <SectionHeading eyebrow="How we help" title="Bring your situation. We'll help you find the next step." body="We listen, explain what's needed and walk you through each stage of your request — whether it's a simple document or a complex immigration process. Clear guidance, in your language, from a team with nearly 20 years of experience helping people navigate life in the United States." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Clear document checklists", "WhatsApp-first response", "Multilingual support", "One trusted team for many needs"].map((item) => (
                <CardSurface key={item} interactive className="p-5 font-bold text-navy">{item}</CardSurface>
              ))}
            </div>
          </CardSurface>
          <CardSurface glow className="p-6 sm:p-8">
            <SectionHeading eyebrow="Who we help" title="We understand what it takes to build a life in the United States." />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {audiences.map((audience) => (
                <CardSurface key={audience} variant="dark" interactive className="px-4 py-5 text-sm font-bold text-white">{audience}</CardSurface>
              ))}
            </div>
          </CardSurface>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8" id="quick-request">
        <div>
          <SectionHeading eyebrow="How it works" title="Three steps from request to follow-up." />
          <ol className="mt-8 space-y-4">
            {[
              "Tell us what you need — the service, the document type, or just your situation.",
              "We confirm what to prepare and give you clear next steps.",
              "You hear back by call, WhatsApp or email — usually the same day.",
            ].map((step, index) => (
              <CardSurface as="li" key={step} interactive className="p-5">
                <div className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-champagne font-bold text-navy">{index + 1}</span>
                <span className="text-sm font-semibold leading-6 text-navy">{step}</span>
                </div>
              </CardSurface>
            ))}
          </ol>
        </div>
        <QuickLeadForm />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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
          <ButtonLink href={reviewsResult.sourceUrl} variant="secondary" target="_blank" rel="noreferrer" fullMobile>
            Read more on Google
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviewsResult.reviews.map((review) => <ReviewCard key={`${review.name}-${review.quote}`} {...review} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <SectionHeading eyebrow="Common questions" title="A few answers before you reach out." />
        <FAQAccordion faqs={generalFaqs.slice(0, 3)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ContactStrip />
      </section>
    </>
  );
}
