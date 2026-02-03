import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Impact Dashboard - Multi-Profile Analytics Platform",
  description: "Flexible impact measurement dashboard supporting Education, Human Constitution, and Food Security profiles for any industry.",
  keywords: ["impact measurement", "dashboard", "analytics", "ESG", "social impact", "multi-profile"],
  authors: [{ name: "Impact Dashboard Team" }],
  creator: "Impact Dashboard",
  publisher: "Impact Dashboard",
  metadataBase: new URL('https://impact-dash.vercel.app'),
  openGraph: {
    title: "Impact Dashboard - Multi-Profile Analytics Platform",
    description: "Flexible impact measurement dashboard for any industry",
    type: "website",
    locale: "en_US",
    siteName: "Impact Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Dashboard",
    description: "Multi-profile impact measurement platform",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
