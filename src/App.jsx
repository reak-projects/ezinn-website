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

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <ScrollExperience />
        <HowItWorks />
        <Product />
        <Benefits />
        <GuestExperience />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <SupportWidget />
    </div>
  );
}