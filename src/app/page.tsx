import { LandingPage } from "@/components/pages/landing-page";

export const metadata = {
  title: "Find Your Campus Fellowship | UrCampusFellowship",
  description: "Discover and join a welcoming university fellowship on your Ghanaian campus.",
  openGraph: {
    title: "Find Your Campus Fellowship | UrCampusFellowship",
    description: "Discover and join a welcoming university fellowship on your Ghanaian campus.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home() {
  return <LandingPage />;
}
