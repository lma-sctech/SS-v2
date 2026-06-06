export const siteConfig = {
  name: "Sanaa Services",
  title: "Sanaa Services | Notary, Insurance, Immigration & Travel in the US",
  description:
    "Trusted notary, translation, insurance, immigration and travel assistance for clients across the United States.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanaaservices.com",
  phone: "+17186260236",
  phoneDisplay: "+1 718-626-0236",
  whatsapp: "+17186260236",
  email: "hello@sanaaservices.com",
  address: {
    street: "2525 Steinway Street",
    city: "Astoria",
    region: "NY",
    postalCode: "11103",
    country: "US",
  },
  hours: "Mon-Sat, 9:00 AM - 6:00 PM",
  serviceArea: "Based in Astoria, NY · Serving clients across the United States",
  googleReviewsUrl: "https://www.google.com/search?q=sanaaservices#lrd=0x89c25f402a398c2d:0x20cbdb6005b7476c,1,,,,",
  languages: ["English", "French", "Arabic"],
  socials: {
    instagram: "https://instagram.com/sanaaservices",
    facebook: "https://facebook.com/sanaaservices",
    whatsapp: "https://wa.me/17186260236",
  },
};

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
