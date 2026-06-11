import { ResponsiveImage } from "@/components/media/ResponsiveImage";

const airlineLogos = [
  { name: "Emirates", src: "/img/svg-airlines/emirates.svg", featured: true },
  { name: "Qatar Airways", src: "/img/svg-airlines/qatar-airways.svg" },
  { name: "Turkish Airlines", src: "/img/svg-airlines/turkish-airlines.svg" },
  { name: "Royal Air Maroc", src: "/img/svg-airlines/royal-air-maroc.svg", featured: true, oversized: true },
  { name: "Air France", src: "/img/svg-airlines/air-france.svg" },
  { name: "Lufthansa", src: "/img/svg-airlines/lufthansa.svg" },
  { name: "British Airways", src: "/img/svg-airlines/british-airways.svg" },
  { name: "Iberia", src: "/img/svg-airlines/iberia.svg" },
  { name: "Etihad Airways", src: "/img/svg-airlines/etihad-airways.svg" },
  { name: "Singapore Airlines", src: "/img/svg-airlines/singapore-airlines.svg" },
  { name: "Delta Air Lines", src: "/img/svg-airlines/delta.svg" },
  { name: "Air Canada", src: "/img/svg-airlines/air-canada.svg" },
];

const marqueeRows = [airlineLogos, airlineLogos];

export function AirlineLogoCarousel() {
  return (
    <section className="airline-carousel-section py-7" aria-labelledby="airline-carousel-title">
      <h2 id="airline-carousel-title" className="sr-only">
        Airline logos
      </h2>
      <div className="airline-carousel-track" aria-hidden="true">
        {marqueeRows.map((row, rowIndex) => (
          <div className="airline-carousel-row" key={rowIndex}>
            {row.map((logo) => (
              <div className={`airline-logo-item${logo.featured ? " airline-logo-item-featured" : ""}`} key={`${rowIndex}-${logo.name}`}>
                <ResponsiveImage
                  src={logo.src}
                  alt=""
                  className={`airline-logo-image${logo.featured ? " airline-logo-image-featured" : ""}${
                    logo.oversized ? " airline-logo-image-oversized" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
