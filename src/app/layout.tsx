import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://heiss-lounge.vercel.app"),
  title: "Heiß Lounge - Menu",
  description: "Willkommen bei Heiß Lounge - Shisha & Cocktail Bar in Nürnberg. Entdecken Sie unsere exklusive Auswahl an Getränken, Shisha und Köstlichkeiten.",
  keywords: ["Heiß Lounge", "Shisha Bar", "Cocktail Bar", "Nürnberg", "Menu", "Getränke"],
  authors: [{ name: "Heiß Lounge" }],
  openGraph: {
    title: "Heiß Lounge - Menu",
    description: "Shisha & Cocktail Bar in Nürnberg - Entdecken Sie unsere exklusive Auswahl",
    url: "https://heiss-lounge.vercel.app",
    siteName: "Heiß Lounge",
    images: [
      {
        url: "/splash-logo.png",
        width: 500,
        height: 500,
        alt: "Heiß Lounge Logo",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heiß Lounge - Menu",
    description: "Shisha & Cocktail Bar in Nürnberg",
    images: ["/splash-logo.png"],
  },
  icons: {
    icon: "/splash-logo.png",
    apple: "/splash-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T4WL3EMP7W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T4WL3EMP7W');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AppWrapper>{children}</AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
