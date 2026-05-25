import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { LoadingScreen } from "@/components/luxury/LoadingScreen";
import { CinematicIntro } from "@/components/luxury/CinematicIntro";
import { LuxuryCursor } from "@/components/luxury/LuxuryCursor";
import { LuxuryNav } from "@/components/luxury/LuxuryNav";
import { HeroSection } from "@/components/luxury/HeroSection";
import { ServicesSection } from "@/components/luxury/ServicesSection";
import { PhilosophySection } from "@/components/luxury/PhilosophySection";
import { ImmersiveTextSection } from "@/components/luxury/ImmersiveText";
import { PortfolioSection } from "@/components/luxury/PortfolioSection";
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
  const [showIntro, setShowIntro] = useState(true);
  useLenis();

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowIntro(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && showIntro && <CinematicIntro />}
      {loaded && !showIntro && (
        <>
          <LuxuryCursor />
          <LuxuryNav />
          <HeroSection />
          <ServicesSection />
          <ImmersiveTextSection />
          <PhilosophySection />
          <PortfolioSection />
          <AboutSection />
          <ContactSection />
          <LuxuryFooter />
        </>
      )}
    </>
  );
}
