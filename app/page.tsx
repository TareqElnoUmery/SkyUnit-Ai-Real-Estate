import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ProjectCatalog from '@/components/sections/ProjectCatalog';
import Pricing from '@/components/sections/Pricing';
import MortgageCalculator from '@/components/sections/MortgageCalculator';
import PaymentMethods from '@/components/sections/PaymentMethods';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-tajawal selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <ProjectCatalog />
        <Pricing />
        <MortgageCalculator />
        <PaymentMethods />
      </main>
      <Footer />
    </div>
  );
}
