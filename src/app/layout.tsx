import type { Metadata } from "next";
import { Nunito_Sans, Lora } from "next/font/google";
import "./globals.css";
import { UrCampusProvider } from "@/providers/urcampus-provider";
import { Toaster } from "@/components/ui/sonner";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UrCampusFellowship",
  description: "Find your campus fellowship and join its community.",
  authors: [{ name: "UrCampusFellowship" }],
  openGraph: {
    title: "UrCampusFellowship",
    description: "Find your campus fellowship and join its community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${nunitoSans.variable} ${lora.variable} font-sans antialiased`}>
        <UrCampusProvider>
          {children}
          <Toaster />
        </UrCampusProvider>
      </body>
    </html>
  );
}
