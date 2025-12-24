import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingOverlayProvider } from "@/components/ui/loading-overlay";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { createMetadata } from "@/lib/metadata";
import StructuredData from "@/components/seo/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata({});

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
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        <ErrorBoundary>
          <LoadingOverlayProvider>
            {children}
          </LoadingOverlayProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
