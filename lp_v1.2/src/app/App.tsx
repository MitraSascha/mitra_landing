import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VacationQuoteSection } from './components/VacationQuoteSection';
import { SocialMomentSection } from './components/SocialMomentSection';
import { TaglineSection } from './components/TaglineSection';
import { BathroomImageSection } from './components/BathroomImageSection';
import { PhilosophySection } from './components/PhilosophySection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { NewsletterSection } from './components/NewsletterSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { BathroomTextures } from './components/BathroomTextures';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MarqueeStrip } from './components/MarqueeStrip';
import { useState, useEffect } from 'react';

export default function App() {
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Lock scroll until quiz is answered
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!quizAnswered) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }

    // Cleanup on unmount
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, [quizAnswered]);

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F6]" style={{ position: 'relative' }}>
      {/* Badezimmer SVG Texturen */}
      <BathroomTextures />
      
      {/* Scroll Progress Bar */}
      {quizAnswered && <ScrollProgressBar />}

      {/* Global Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.05
        }}
      />
      
      <Navbar />
      <HeroSection onQuizAnswered={() => setQuizAnswered(true)} />
      
      {/* Rest of the page - only visible after quiz is answered */}
      {quizAnswered && (
        <>
          <VacationQuoteSection />
          <SocialMomentSection />
          <TaglineSection />
          <BathroomImageSection />
          <PhilosophySection />
          <MarqueeStrip />
          <GallerySection />
          <NewsletterSection />
          <ProcessSection />
          <CTASection />
          <Footer />
        </>
      )}
    </div>
  );
}