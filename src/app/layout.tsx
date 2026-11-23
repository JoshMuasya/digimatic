import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ToastProvider";
import { campaign } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: "Digimatic Marketers | Open the Future", template: "%s | Digimatic Marketers" },
  description: "Digimatic Marketers is a forward-thinking tech company specializing in software development, website and mobile app development, digital marketing, graphics design, and cybersecurity. We blend innovation with technology to deliver modern, user-centric solutions that drive business growth.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // Default favicon
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }, // Android/Chrome
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }, // iOS
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">
          Skip to content
        </a>
        <ToastProvider />
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <div className="site-footer">
          <Footer />
          <nav aria-label="Packages and campaigns" className="border-t border-border bg-card">
            <div className="site-container flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm text-secondary">
              <Link href="/pricing" className="rounded-sm hover:underline">Website Pricing</Link>
              <Link href={campaign.href} className="rounded-sm hover:underline">Black November</Link>
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
