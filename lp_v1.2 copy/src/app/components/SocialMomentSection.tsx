import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bathroomImage from 'figma:asset/bf612d230980b013bdedbacb879f662742e9e5d1.png';

gsap.registerPlugin(ScrollTrigger);

export function SocialMomentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sticky pin effect for the "Wow, seit wann" section
    if (contentRef.current && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Scale down and blur the content as the next section approaches
          if (contentRef.current) {
            gsap.to(contentRef.current, {
              scale: 0.9 - (progress * 0.05),
              filter: `blur(${progress * 20}px)`,
              opacity: 1 - (progress * 0.5),
              duration: 0.3,
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && sectionRef.current && sectionRef.current.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#FAF9F6] flex items-center justify-center" style={{ paddingTop: '0vh', paddingBottom: '0vh' }}>
      {/* Naturstein-Textur für Spa-Feeling */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{ 
          backgroundImage: 'url(#stoneTexture)',
          backgroundSize: '600px 600px'
        }}
      />
      
      {/* Dezente Marmor-Adern */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: 'url(#marbleTexture)',
          backgroundSize: '800px 800px'
        }}
      />

      <div ref={contentRef} className="px-4 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-10 w-full">
        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden bg-[#a8d4a8]"
        >
          {/* Edle Fliesen-Optik Hintergrund */}
          <div 
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{ 
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              backgroundPosition: 'center center'
            }}
          />
          
          {/* Fliesen-Fugen Details */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ 
              backgroundImage: `
                linear-gradient(90deg, rgba(44,74,95,0.15) 2px, transparent 2px),
                linear-gradient(0deg, rgba(44,74,95,0.15) 2px, transparent 2px)
              `,
              backgroundSize: '160px 160px',
              backgroundPosition: 'center center'
            }}
          />
          
          {/* Dezentes Overlay für bessere Text-Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#a8d4a8]/30 via-[#a8d4a8]/40 to-[#a8d4a8]/30 pointer-events-none" />
          
          {/* Kachel-Textur für Badezimmer-Feeling */}
          <div 
            className="absolute inset-0 opacity-8 mix-blend-overlay pointer-events-none"
            style={{ 
              backgroundImage: 'url(#tileTexture)',
              backgroundSize: '200px 200px'
            }}
          />
          
          {/* Marmor mit Mintgrün-Tönung */}
          <div 
            className="absolute inset-0 opacity-8 mix-blend-soft-light pointer-events-none"
            style={{ 
              backgroundImage: 'url(#marbleMint)',
              backgroundSize: '800px 800px'
            }}
          />
          
          <div className="relative z-10 text-center space-y-6">
            {/* Quote */}
            <blockquote className="font-outfit text-4xl md:text-6xl lg:text-7xl text-white font-black leading-tight tracking-tight">
              "Wow, seit wann habt ihr so ein krasses Bad!"
            </blockquote>
            
            {/* Citation */}
            <cite className="font-outfit text-lg md:text-xl text-white/90 not-italic font-semibold block -mt-4 md:pt-0">
              — deine Freunde
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}