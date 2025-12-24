import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingOverlayProvider } from "@/components/ui/loading-overlay";
import { ErrorBoundary } from "@/components/error/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farm Fresh - Fresh Fruits Every Day",
  description: "Carefully selected fresh fruits from trusted farms, no preservatives. Fast delivery within 2 hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <LoadingOverlayProvider>
            {children}
          </LoadingOverlayProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
