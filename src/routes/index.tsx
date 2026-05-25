import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { LoadingScreen } from "@/components/luxury/LoadingScreen";
import { LuxuryCursor } from "@/components/luxury/LuxuryCursor";
import { LuxuryNav } from "@/components/luxury/LuxuryNav";
import { HeroSection } from "@/components/luxury/HeroSection";
import { MarqueeStrip } from "@/components/luxury/MarqueeStrip";
import { PortfolioSection } from "@/components/luxury/PortfolioSection";
import { ServicesSection } from "@/components/luxury/ServicesSection";
import { AboutSection } from "@/components/luxury/AboutSection";
import { ContactSection } from "@/components/luxury/ContactSection";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bluski Solutions — Enterprise AI, Software & Data, Engineered in Iowa" },
      {
        name: "description",
        content:
          "Bluski Solutions builds AI, software, and data platforms for ambitious enterprises. Iowa-headquartered, globally engaged.",
      },
      { property: "og:title", content: "Bluski Solutions — Engineered Intelligence" },
      { property: "og:description", content: "AI, software, data, and cloud — built for the enterprise frontier." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <LuxuryCursor />
      <LuxuryNav />
      <HeroSection />
      <MarqueeStrip />
      <PortfolioSection />
      <ServicesSection />
      <AboutSection />
      <MarqueeStrip dark />
      <ContactSection />
      <LuxuryFooter />
    </>
  );
}
