import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://onlinelearningclass.com"),
  title: { default: "Online Learning Class — Find your next education path", template: "%s | Online Learning Class" },
  description: "Discover programs, understand published requirements, compare costs, and build a source-backed plan for what comes next.",
  applicationName: "Online Learning Class",
  keywords: ["education pathways", "study abroad", "university programs", "school search", "scholarships"],
  openGraph: { type: "website", siteName: "Online Learning Class", title: "Find your next education path", description: "Source-backed education discovery and pathway planning." },
  twitter: { card: "summary_large_image", title: "Online Learning Class", description: "Source-backed education pathways from first school to future career." },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Online Learning Class",
  url: "https://onlinelearningclass.com",
  description: "A global education discovery and pathway planning platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${newsreader.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />{children}</body></html>;
}
