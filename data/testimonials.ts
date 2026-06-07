export type Testimonial = {
  name: string;
  location?: string;
  quote: string;
  service: string;
  rating?: number;
  sourceLabel?: string;
  sourceUrl?: string;
  date?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Google reviewer",
    quote:
      "The best travel Egency, very honest, trustworthy and professional, I got my first ticket from her Egency in 2005 and after all this years still the best ever, I recommend to everyone ..",
    service: "Travel",
    rating: 5,
  },
  {
    name: "Mariam B.",
    quote:
      "They were patient, explained exactly what I needed to bring, and had my documents translated quickly. I felt supported throughout the whole process.",
    service: "Translation",
    rating: 5,
  },
  {
    name: "Khaled A.",
    quote:
      "I called in the morning and had my appointment confirmed the same day. Fast, professional and easy to reach on WhatsApp.",
    service: "Notary",
    rating: 5,
  },
  {
    name: "Nadia S.",
    quote:
      "I had no idea where to start with my paperwork. They explained every step clearly and made sure my documents were in order before I submitted anything.",
    service: "Visa & Immigration",
    rating: 5,
  },
];
