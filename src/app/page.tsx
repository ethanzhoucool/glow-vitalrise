"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const StatementSection = dynamic(() => import("@/components/StatementSection"), { ssr: false });
const BottleNutritionSection = dynamic(() => import("@/components/BottleNutritionSection"), { ssr: false });
const IngredientsSection = dynamic(() => import("@/components/IngredientsSection"), { ssr: false });
const BenefitsSection = dynamic(() => import("@/components/BenefitsSection"), { ssr: false });
const FlavorSection = dynamic(() => import("@/components/FlavorSection"), { ssr: false });
const TextureSection = dynamic(() => import("@/components/TextureSection"), { ssr: false });
const ConvenienceSection = dynamic(() => import("@/components/ConvenienceSection"), { ssr: false });
const SocialProof = dynamic(() => import("@/components/SocialProof"), { ssr: false });
const ComparisonSection = dynamic(() => import("@/components/ComparisonSection"), { ssr: false });
const RoutineSection = dynamic(() => import("@/components/RoutineSection"), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Interstitial = dynamic(() => import("@/components/Interstitial"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden" style={{ background: "#fafaf8" }}>
      <HeroSection />
      <StatementSection />
      <BottleNutritionSection />
      <Interstitial text="What's inside matters." variant="italic" />
      <IngredientsSection />
      <BenefitsSection />
      <Interstitial text="Taste it to believe it." variant="grotesk" />
      <FlavorSection />
      <TextureSection />
      <ConvenienceSection />
      <Interstitial text="Don't just take our word for it." variant="wide" />
      <SocialProof />
      <ComparisonSection />
      <Interstitial text="Make it yours." variant="serif" />
      <RoutineSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}