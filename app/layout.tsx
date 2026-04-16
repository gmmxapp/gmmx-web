import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GMMX | Gym Growth Operating System",
    template: "%s | GMMX"
  },
  description: siteConfig.description,
  keywords: [
    "gym software india",
    "gym management saas",
    "gym CRM",
    "fitness studio software",
    "razorpay gym payments",
    "white label gym website"
  ],
  openGraph: {
    title: "GMMX | Gym Growth Operating System",
    description: siteConfig.description,
    url: siteUrl,
    siteName: "GMMX",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GMMX | Gym Growth Operating System",
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <Navbar />
        {children}
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
