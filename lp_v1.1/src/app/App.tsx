import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VacationQuoteSection } from './components/VacationQuoteSection';
import { SocialMomentSection } from './components/SocialMomentSection';
import { PhilosophySection } from './components/PhilosophySection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { NewsletterSection } from './components/NewsletterSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F6]">
<Navbar />
      <main id="main">
        <HeroSection />
        <VacationQuoteSection />
        <SocialMomentSection />
        <PhilosophySection />
        <GallerySection />
        <NewsletterSection />
        <ProcessSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
