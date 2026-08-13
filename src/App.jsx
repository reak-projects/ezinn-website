import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import ScrollExperience from "./components/ScrollExperience";
import HowItWorks from "./sections/HowItWorks";
import Product from "./sections/Product";
import Benefits from "./sections/Benefits";
import GuestExperience from "./sections/GuestExperience";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import SupportWidget from "./components/SupportWidget";
import DemoModal from "./components/DemoModal";

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="app-root">
      <Navbar onDemoClick={() => setIsDemoModalOpen(true)} />
      <main>
        <Hero onDemoClick={() => setIsDemoModalOpen(true)} />
        <ScrollExperience onDemoClick={() => setIsDemoModalOpen(true)} />
        <HowItWorks />
        <Product />
        <Benefits />
        <GuestExperience />
        <FAQ />
        <CTA onDemoClick={() => setIsDemoModalOpen(true)} />
      </main>
      <Footer />
      <SupportWidget />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}