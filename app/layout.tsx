import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohit Aggarwal — AI Developer & Builder",
  description: "Mohit Aggarwal — AI Developer, Full Stack Builder, and Content Creator. Building Innovix, MindCare, and more.",
  keywords: ["Mohit Aggarwal", "AI Developer", "Full Stack Developer", "Content Creator", "Innovix", "MindCare", "Portfolio"],
  authors: [{ name: "Mohit Aggarwal" }],
  creator: "Mohit Aggarwal",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohit Aggarwal — AI Developer & Builder",
    description: "AI Developer, Full Stack Builder, and Content Creator.",
    siteName: "Mohit Aggarwal Portfolio",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inter — primary body font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-outfit: 'Inter', 'Outfit', sans-serif;
            --font-syne: 'Syne', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
