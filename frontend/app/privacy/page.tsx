import { SectionHeading } from "@/components/marketing/SectionHeading";
import { CardSurface } from "@/components/ui/CardSurface";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Privacy",
  "Privacy notes for Sanaa Services.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Privacy" title="Your documents and personal information matter." body="We handle personal and family information with care and use it only to respond to your request." />
      <CardSurface glow className="mt-8 space-y-5 p-6 text-sm leading-7 text-slate">
        <p>
          Information submitted through the website is used to understand your request and contact you about next steps.
        </p>
        <p>
          Personal and family documents should only be shared after our team confirms the safest way to send or bring them.
        </p>
        <p>
          We do not share your information without your consent unless required by law.
        </p>
        <p>
          For questions about your information, contact Sanaa Services directly.
        </p>
      </CardSurface>
    </div>
  );
}
