export const siteConfig = {
  name: "Sanaa Services",
  title: "Sanaa Services | Travel Agency in Astoria for World Cup 2026, Morocco Trips & Family Travel",
  description:
    "Sanaa Services is a multilingual travel agency in Astoria, Queens helping families, Moroccan and Arab communities with flights, hotels, travel insurance, World Cup 2026 travel support, documents and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sanaaservices.com",
  phone: "+17186260236",
  phoneDisplay: "+1 718-626-0236",
  whatsapp: "+212661977164",
  email: "contact@sanaaservices.com",
  address: {
    street: "2525 Steinway Street",
    city: "Astoria",
    region: "NY",
    postalCode: "11103",
    country: "US",
  },
  hours: "Mon-Sat, 9:00 AM - 6:00 PM",
  serviceArea: "Based in Astoria, NY - Serving clients across the United States",
  googleReviewsUrl: "https://www.google.com/search?q=sanaaservices#lrd=0x89c25f402a398c2d:0x20cbdb6005b7476c,1,,,,",
  languages: ["English", "French", "Arabic"],
  socials: {
    instagram: "https://instagram.com/sanaaservices",
    facebook: "https://facebook.com/sanaaservices",
    whatsapp: "https://wa.me/212661977164",
  },
};

export const navItems = [
  { label: "World Cup 2026", href: "/#world-cup-2026" },
  { label: "Services", href: "/#travel-services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#quick-request" },
];
