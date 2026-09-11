import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FrontForumFocus | Turn Clean Energy Data Into Audit-Ready Carbon Assets",
  description:
    "Connect solar inverters, microgrids, and field meters to automate digital MRV (dMRV), eliminate 6–18 month audit lag, and capture premium carbon pricing.",
  keywords: [
    "dMRV",
    "carbon credits",
    "clean energy telemetry",
    "solar inverters",
    "microgrids",
    "UN SDG",
    "FrontForumFocus",
    "Greta",
    "verifiable impact",
  ],
  authors: [{ name: "FrontForumFocus", url: "https://frontforumfocus.com" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    title: "FrontForumFocus | The Verifiable Impact & dMRV Engine",
    description:
      "Automate dMRV from solar inverters and mini-grids. Stream cryptographic telemetry directly to registries and blended finance facilities.",
    url: "https://frontforumfocus.com",
    siteName: "FrontForumFocus",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 800,
        alt: "FrontForumFocus FO3 Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  themeColor: "#090D14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#090D14] text-slate-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        {children}
      </body>
    </html>
  );
}
