import { siteConfig } from "@/data/site";

export function whatsappLink(service?: string) {
  const message = service
    ? `Hello Sanaa Services, I need help with ${service}. Can you assist me?`
    : "Hello Sanaa Services, I would like help planning a trip. Can you assist me with flights, hotels or travel insurance?";
  return `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function phoneLink() {
  return `tel:${siteConfig.phone}`;
}

export function emailLink() {
  return `mailto:${siteConfig.email}`;
}
