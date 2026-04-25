import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Geist } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SmoothScrollProvider } from "@/components/smooth-scroll";


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    default: "Gmmx - Gym Management System",
    template: "%s | Gmmx - Gym Management"
  },
  description: "Gym Management System & OS. Advanced attendance, leads, WhatsApp CRM, and white-label tools for modern gyms.",
  keywords: [
    "gym software india",
    "gym management saas",
    "gym CRM",
    "fitness studio software",
    "gym management system"
  ],
  icons: {
    icon: "/logo-gmmx-gemini.png",
    shortcut: "/logo-trans.png",
    apple: "/logo-trans.png"
  },
  openGraph: {
    title: "Gmmx - Modern Gym Management System",
    description: "Advanced attendance, leads, WhatsApp CRM, and white-label tools for modern gyms.",
    url: siteUrl,
    siteName: "Gmmx",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gmmx - Modern Gym Management System",
    description: "Gym Growth Operating System for modern fitness businesses."
  }
};

import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)} suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased bg-[#05050A] text-white selection:bg-rose-500/30 selection:text-white`}>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" expand={true} richColors closeButton theme="dark" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
