import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohit Aggarwal — AI Engineer & Creative Developer",
  description: "Mohit Aggarwal builds intelligent, interactive digital products. AI Engineer, Full-Stack Developer, and Content Creator based in Jammu.",
  keywords: ["Mohit Aggarwal", "AI Engineer", "Full Stack Developer", "Creative Developer", "Portfolio", "Innovix", "MindCare"],
  authors: [{ name: "Mohit Aggarwal" }],
  creator: "Mohit Aggarwal",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohit Aggarwal — AI Engineer & Creative Developer",
    description: "Building intelligent, interactive digital products.",
    siteName: "Mohit Aggarwal",
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
