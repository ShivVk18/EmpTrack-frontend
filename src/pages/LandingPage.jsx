import CTASection from "@/components/landingPageComponents/CTASection";
import FAQSection from "@/components/landingPageComponents/FAQSection";
import FeaturesSection from "@/components/landingPageComponents/FeatureSection";
import Footer from "@/components/landingPageComponents/Footer";
import Header from "@/components/landingPageComponents/Header";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import React from "react";

export default function LandingPage() {
  return (
     <div className="min-h-screen bg-stone-50 flex flex-col overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}