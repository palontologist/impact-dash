import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FrontForumFocus Impact Dashboard",
  description: "Interactive dashboard for tracking AI education campaign impact for marginalized youth in Kenya. Monitor enrollment, outcomes, and SDG alignment.",
  keywords: ["AI education", "Kenya", "youth empowerment", "SDG", "impact measurement", "dashboard"],
  authors: [{ name: "FrontForumFocus Team" }],
  creator: "FrontForumFocus",
  publisher: "FrontForumFocus",
  metadataBase: new URL('https://impact-dash.vercel.app'),
  openGraph: {
    title: "FrontForumFocus Impact Dashboard",
    description: "Track and visualize the impact of AI education programs for marginalized youth in Kenya",
    type: "website",
    locale: "en_US",
    siteName: "FrontForumFocus Impact Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "FrontForumFocus Impact Dashboard",
    description: "AI education impact tracking for youth in Kenya",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
