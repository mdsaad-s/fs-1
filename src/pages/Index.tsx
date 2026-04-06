import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ModulesSection } from "@/components/ModulesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Dashboard } from "@/components/Dashboard";
import { Benefits } from "@/components/Benefits";

import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
     
      <ModulesSection />
      <HowItWorks />
      <Dashboard />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
