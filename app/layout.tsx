import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./portfolio-art-direction.css";
import "./hero-composition.css";
import "./hero-editorial.css";

// Fraunces is used as a variable display face: its optical, softness and wonky
// axes give the site a more human, drawn quality without sacrificing legibility.
const displayFont = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body-face",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-mono-face",
  display: "swap",
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
    description: "Web applications, automation tools and practical AI products by Mohit Aggarwal.",
    siteName: "Mohit Aggarwal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Aggarwal — Software Engineer",
    description: "Web applications, automation tools and practical AI products by Mohit Aggarwal.",
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
      className={displayFont.variable + " " + bodyFont.variable + " " + monoFont.variable}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
