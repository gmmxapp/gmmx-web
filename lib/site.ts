export const siteConfig = {
  name: "GMMX",
  domain: "gmmx.app",
  description:
    "Gym Growth Operating System for Indian gym owners. Run attendance, reminders, CRM, analytics, and white-label microsites from one platform.",
  phone: "9944725360",
  whatsappNumber: "919944725360"
} as const;

export const siteUrl = `https://${siteConfig.domain}`;

export function getWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
