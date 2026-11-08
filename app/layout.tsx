import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./portfolio-art-direction.css";

const displayFont = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-face",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-face",
});

const expressiveFont = Instrument_Serif({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  variable: "--font-accent-face",
});

const monoFont = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
});

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohit Aggarwal — Software Engineer",
  description: "Mohit Aggarwal is a software engineer in Jammu, India. He builds web applications, automation tools and practical AI products.",
  keywords: ["Mohit Aggarwal", "software engineer", "web development", "automation", "AI products", "portfolio"],
  authors: [{ name: "Mohit Aggarwal" }],
  creator: "Mohit Aggarwal",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohit Aggarwal — Software Engineer",
    description: "Web applications, automation tools and practical AI products by Mohit Aggarwal."
    siteName: "Mohit Aggarwal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Aggarwal — AI & Automation Developer",
    description: "AI tools and software that automate repetitive work and make complex information easier to use.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={
        displayFont.variable +
        " " +
        bodyFont.variable +
        " " +
        expressiveFont.variable +
        " " +
        monoFont.variable
      }
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
