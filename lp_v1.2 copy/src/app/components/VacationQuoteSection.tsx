import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import flipFlopsImage from '../../assets/b25dd357f77660bdc50b9552fac30c25464da467.png';

gsap.registerPlugin(ScrollTrigger);

export function VacationQuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sticky pin effect for the vacation section
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 bg-[#FAF9F6] pt-8 pb-32">
      {/* Dezente Marmor-Adern */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: 'url(#marbleTexture)',
          backgroundSize: '800px 800px'
        }}
      />
      
      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
          {/* Left Side - 1/3 with Flip Flops Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden mb-8 lg:mb-0"
            style={{
              backgroundImage: `url(${flipFlopsImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px'
            }}
          >
            {/* Dezente Overlay-Schicht für bessere Text-Lesbarkeit */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2c4a5f]/20"></div>
          </motion.div>

          {/* Right Side - 2/3 with Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 flex flex-col justify-center h-full"
            >
              {/* Emphasized Statement */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full" />
                <div className="pl-8">
                  <p className="font-outfit text-3xl md:text-4xl lg:text-5xl text-[#2c4a5f] font-bold tracking-tight leading-[1.1] mb-6">
                    Weil du nie genug Urlaubstage haben kannst!
                  </p>
                  <p className="font-outfit text-lg md:text-xl lg:text-2xl text-[#6B6B6B] leading-relaxed font-light">
                    Wenn du schon so viel Zeit im Bad verbringst, dann hol dir das Urlaubsgefühl nach Hause und verwandle dein Bad in deinen individuell gestalteten Erholungsort.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}