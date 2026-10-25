import type { Metadata, Viewport } from "next";
import { Lora, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: "variable",
  style: "italic",
  display: "swap",
  variable: "--font-lora",
});

const siteTitle = "Dmytro Rudniev — Senior Frontend Engineer";
const siteDescription =
  "Senior Frontend Engineer building scalable, high-performance web products with React, Vue, Next.js, and TypeScript.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  applicationName: "Dmytro Rudniev Portfolio",
  authors: [{ name: "Dmytro Rudniev" }],
  openGraph: {
    title: siteTitle,
    description:
      "Frontend architecture, measurable performance, and systems that help product teams move with confidence.",
    type: "profile",
    firstName: "Dmytro",
    lastName: "Rudniev",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
