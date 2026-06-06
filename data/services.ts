export type ServiceSlug =
  | "notary"
  | "legal-consultancy"
  | "insurance"
  | "translation"
  | "driving-school"
  | "visa-immigration"
  | "travel";

export type Service = {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  primaryCta: string;
  problems: string[];
  documents: string[];
  process: string[];
  formFields: string[];
  upload?: boolean;
  disclaimer?: string;
  seo: {
    title: string;
    description: string;
  };
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "notary",
    title: "Notary",
    eyebrow: "Official document notarization",
    summary: "Certify affidavits, authorization letters, power of attorney and everyday documents quickly and professionally.",
    description:
      "Get reliable notary support for personal, family and business paperwork from our Astoria office.",
    image: "/img/optimized/services/notary-1200.jpg",
    primaryCta: "Book Notary Help",
    problems: ["Affidavits and sworn statements", "Power of attorney forms", "Travel consent letters", "Business and personal forms"],
    documents: ["Government-issued ID", "Unsigned document", "Any witness information", "Appointment preference"],
    process: ["Tell us what needs notarizing", "Bring or upload document details", "Confirm your appointment window"],
    formFields: ["Document type", "Number of documents", "Preferred date", "Preferred time"],
    seo: {
      title: "Notary Services | Sanaa Services",
      description: "Book notary support for affidavits, forms and personal documents.",
    },
    faqs: [
      { question: "Should I sign before the appointment?", answer: "No. Most documents should be signed in front of the notary." },
      { question: "Do I need ID?", answer: "Yes. Bring a valid government-issued photo ID." },
    ],
  },
  {
    slug: "legal-consultancy",
    title: "Legal Consultancy",
    eyebrow: "Administrative guidance",
    summary: "Get clear guidance on what documents to prepare, what steps to take and who to contact for your legal or administrative matter.",
    description:
      "We help you understand paperwork, organize supporting documents and prepare for professional legal conversations.",
    image: "/img/optimized/services/legal-consultancy-1200.jpg",
    primaryCta: "Request Consultation",
    problems: ["Document organization", "Appointment preparation", "Form review support", "Referral readiness"],
    documents: ["Relevant forms", "Letters or notices", "Timeline of events", "Questions you want answered"],
    process: ["Share the topic", "Prepare your documents", "Receive structured next-step guidance"],
    formFields: ["Topic", "Urgency", "Preferred date", "Preferred time"],
    disclaimer:
      "Sanaa Services provides administrative guidance and document support. This service does not replace advice from a licensed attorney.",
    seo: {
      title: "Legal Document Support | Sanaa Services",
      description: "Administrative legal document support and consultation preparation for clients across the United States.",
    },
    faqs: [
      { question: "Is this legal advice?", answer: "No. We provide administrative support and preparation, not legal advice." },
      { question: "Can you help me prepare documents?", answer: "Yes. We can help organize forms and supporting information." },
    ],
  },
  {
    slug: "insurance",
    title: "Insurance",
    eyebrow: "Protect what matters",
    summary: "Explore auto, life and family insurance options with personalized support from a team that speaks your language.",
    description:
      "We help you prepare information and request coverage options that fit your household or business needs.",
    image: "/img/optimized/services/insurance-1200.jpg",
    primaryCta: "Get a Quote",
    problems: ["Auto insurance", "Home and renters insurance", "Travel insurance", "Small business coverage"],
    documents: ["Current policy if available", "Driver or property details", "Desired start date", "Contact preference"],
    process: ["Choose coverage type", "Share basic details", "Receive follow-up for quote options"],
    formFields: ["Insurance type", "Current coverage", "Desired start date", "Preferred contact method"],
    seo: {
      title: "Insurance Assistance | Sanaa Services",
      description: "Request insurance assistance for auto, life, family, travel and small business needs.",
    },
    faqs: [
      { question: "Can I request more than one quote type?", answer: "Yes. Select the main type and add details in your message." },
      { question: "Do I need an existing policy?", answer: "No. It helps if you have one, but it is not required." },
    ],
  },
  {
    slug: "translation",
    title: "Translation",
    eyebrow: "Certified document translation",
    summary: "Official translation of birth certificates, diplomas, immigration documents, passports and more — accurate and ready for submission anywhere in the US.",
    description:
      "Upload document details and request translation support with clear timelines and careful handling.",
    image: "/img/optimized/services/translation-1000.jpg",
    primaryCta: "Translate a Document",
    problems: ["Birth certificates", "School records", "Administrative letters", "Travel and family documents"],
    documents: ["Readable document scan", "Source language", "Target language", "Deadline"],
    process: ["Upload or describe the document", "Confirm languages and deadline", "Receive follow-up with next steps"],
    formFields: ["Document type", "Source language", "Target language", "Deadline"],
    upload: true,
    seo: {
      title: "Document Translation in the US | Sanaa Services",
      description: "Request document translation support for US submissions with careful handling and fast follow-up.",
    },
    faqs: [
      { question: "Can I send a document photo first?", answer: "Yes. Contact us first and we will confirm whether a photo, scan or original document is needed for your request." },
      { question: "Which languages are supported?", answer: "We support English, French and Arabic, with additional language support available depending on the document." },
    ],
  },
  {
    slug: "driving-school",
    title: "Driving School",
    eyebrow: "From learner to licensed",
    summary: "Driving lessons, road test preparation and DMV guidance for new drivers and recent arrivals to the United States.",
    description:
      "Tell us your level and availability so we can guide you toward driving support that fits your schedule.",
    image: "/img/optimized/services/driving-school-1200.jpg",
    primaryCta: "Start Driving Lessons",
    problems: ["Beginner lessons", "Road test preparation", "Schedule planning", "Practice refreshers"],
    documents: ["Learner permit status", "Experience level", "Preferred schedule", "Pickup area"],
    process: ["Share your level", "Choose preferred times", "Receive scheduling follow-up"],
    formFields: ["Experience level", "Preferred schedule", "Pickup area", "Goal"],
    seo: {
      title: "Driving School Help | Sanaa Services",
      description: "Request driving lesson, DMV guidance and road test preparation support.",
    },
    faqs: [
      { question: "Can beginners request help?", answer: "Yes. The form includes beginner, intermediate and road-test prep options." },
      { question: "Do you help with scheduling?", answer: "Yes. Share your preferred days and times, and we will follow up with available options." },
    ],
  },
  {
    slug: "visa-immigration",
    title: "Visa & Immigration",
    eyebrow: "Immigration document support",
    summary: "Prepare the right forms, organize your documents and get step-by-step guidance through the US immigration process.",
    description:
      "We help families and individuals organize immigration-related paperwork and prepare next steps with care.",
    image: "/img/optimized/services/visa-immigration-1200.jpg",
    primaryCta: "Get Immigration Help",
    problems: ["Document checklists", "Form preparation support", "Appointment readiness", "Case organization"],
    documents: ["Immigration notices", "ID or passport details", "Supporting documents", "Questions and deadlines"],
    process: ["Tell us your case type", "Upload or list documents", "Receive organized follow-up"],
    formFields: ["Case type", "Current status", "Urgency", "Preferred date"],
    upload: true,
    disclaimer:
      "Sanaa Services provides administrative guidance and document support. This service does not replace advice from a licensed attorney.",
    seo: {
      title: "Immigration Document Support in the US | Sanaa Services",
      description: "Administrative visa and immigration document support for clients across the United States.",
    },
    faqs: [
      { question: "Do you provide legal advice?", answer: "No. We provide administrative document support and preparation." },
      { question: "Can I send documents before coming in?", answer: "Contact us first and we will confirm what can be reviewed in advance and what must be brought in person." },
    ],
  },
  {
    slug: "travel",
    title: "Travel",
    eyebrow: "Flights, bookings & travel help",
    summary: "Plan your trip with confidence — flights to Morocco and beyond, family travel, and all the documents you need before you go.",
    description:
      "Share destination, dates and budget so we can help organize your travel request.",
    image: "/img/optimized/services/travel-1200.jpg",
    primaryCta: "Plan My Trip",
    problems: ["Flight planning", "Travel documents", "Family trips", "Travel insurance coordination"],
    documents: ["Destination", "Travel dates", "Traveler count", "Budget range"],
    process: ["Share trip details", "Confirm document needs", "Receive planning follow-up"],
    formFields: ["Destination", "Travel dates", "Travelers", "Budget"],
    seo: {
      title: "Travel Planning Help | Sanaa Services",
      description: "Request travel planning support for flights, documents and family trips.",
    },
    faqs: [
      { question: "Can you help with family trips?", answer: "Yes. Include the number of travelers and any document needs." },
      { question: "Can I request insurance too?", answer: "Yes. Travel insurance can be included in your request." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
