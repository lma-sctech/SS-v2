import { CardSurface } from "@/components/ui/CardSurface";

const badges = [
  "Established since 2006",
  "English, French & Arabic",
  "Fast WhatsApp response",
  "Confidential document handling",
];

export function TrustBadgeRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge) => (
        <CardSurface key={badge} interactive className="px-4 py-3 text-sm font-semibold text-navy">
          {badge}
        </CardSurface>
      ))}
    </div>
  );
}
