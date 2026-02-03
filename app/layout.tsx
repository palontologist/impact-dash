import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
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
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white rounded-full font-medium text-sm h-10 px-5 hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
