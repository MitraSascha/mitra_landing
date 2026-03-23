import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Lightbulb, Maximize2, Grid3x3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const planningSteps = [
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: 'Lichtkonzept',
      subtitle: 'Atmosphäre Design',
      bgColor: '#0d1f2d', // Sehr dunkles Blau wie Hintergrund-Gradient
      isLightConcept: true,
      isWarmBeige: false,
    },
    {
      icon: <Maximize2 className="w-10 h-10" />,
      title: 'Raumoptimierung',
      subtitle: 'Intelligente Planung',
      bgColor: '#e89a4d',
      isLightConcept: false,
      isWarmBeige: false,
    },
    {
      icon: <Grid3x3 className="w-10 h-10" />,
      title: 'Fliesenauswahl',
      subtitle: 'Premium-Materialien',
      bgColor: '#2c4a5f',
      isLightConcept: false,
      isWarmBeige: true,
    },
  ];

  useEffect(() => {
    // Parallax background effect
    if (backgroundRef.current && sectionRef.current) {
      gsap.to(backgroundRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Text reveal animation
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        }
      );
    }

    // Sticky stacking effect for planning cards
    cardsRef.current.forEach((card, index) => {
      if (card && sectionRef.current) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const nextCard = cardsRef.current[index + 1];
            
            if (nextCard && progress > 0) {
              gsap.to(card, {
                scale: 0.9 - (progress * 0.05),
                filter: `blur(${progress * 20}px)`,
                opacity: 1 - (progress * 0.5),
                duration: 0.3,
              });
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && sectionRef.current && sectionRef.current.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const splitIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => {
      // Check if word ends with punctuation
      const hasPunctuation = /[.,!?;:]$/.test(word);
      const wordWithoutPunctuation = hasPunctuation ? word.slice(0, -1) : word;
      const punctuation = hasPunctuation ? word.slice(-1) : '';
      
      const isHighlighted = 
        wordWithoutPunctuation === 'täglicher' || 
        wordWithoutPunctuation === 'Rückzugsort' || 
        wordWithoutPunctuation === 'Wohlfühl-Erlebnis';
      
      return (
        <span key={index} className="word inline-block mr-3">
          <span 
            className={isHighlighted ? 'text-[#ffd89b] italic' : ''}
            style={isHighlighted ? {
              textShadow: '0 0 20px rgba(255, 216, 155, 0.5), 0 0 40px rgba(255, 216, 155, 0.3)'
            } : {}}
          >
            {wordWithoutPunctuation}
          </span>
          {punctuation && <span className="text-white">{punctuation}</span>}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-[#2c4a5f] via-[#1a3a4a] to-[#0d1f2d] py-32 md:py-40">
      {/* Marmor-Textur Overlay - stärker */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Warmer Licht-Gradient für Spa-Atmosphäre */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffd89b]/10 via-transparent to-[#a8d4a8]/10 pointer-events-none" />
      
      {/* Organische Blur-Circles für Tiefe */}
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-[#a8d4a8]/15 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Parallax Background - Edles Badezimmer */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1758548157466-7c454382035a?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay mit Glassmorphismus */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#2c4a5f]/60 to-[#1A1A1A]/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="max-w-5xl mx-auto relative z-10 px-8">
        {/* Manifesto Title */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-outfit text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
          >
            Immer in der{' '}
            <span 
              className="text-[#ffd89b] italic"
              style={{
                textShadow: '0 0 30px rgba(255, 216, 155, 0.6), 0 0 60px rgba(255, 216, 155, 0.4), 0 0 90px rgba(255, 216, 155, 0.2)'
              }}
            >
              richtigen Stimmung
            </span>
          </motion.h2>
        </div>

        <div ref={textRef} className="relative mb-32">
          <p className="font-outfit text-2xl md:text-3xl lg:text-4xl text-white/90 leading-[1.5] font-light tracking-tight">
            {splitIntoWords('Dein Bad ist nicht einfach nur funktional – es ist dein täglicher Rückzugsort. Wir optimieren nicht nur Rohre und Fliesen, sondern dein gesamtes Wohlfühl-Erlebnis.')}</p>
        </div>
      </div>

      {/* Planung Intelligence Title */}
      <div className="max-w-5xl mx-auto relative z-10 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-4"
        >
          <h3 
            className="font-outfit text-5xl md:text-7xl lg:text-8xl font-black mb-3"
            style={{ 
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))'
            }}
          >
            <span className="text-white">Das </span>
            <span style={{ color: '#e8dcc4' }}>
              MITRA
            </span>
            <span className="text-white"> Konzept:</span>
          </h3>
        </motion.div>
      </div>

      {/* Planning Cards with Sticky Stacking */}
      {planningSteps.map((step, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="min-h-[60vh] md:min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24"
          style={{ 
            paddingTop: index === 0 ? '2rem' : '10vh',
            paddingBottom: index === planningSteps.length - 1 ? '20vh' : '0'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-200px' }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-4xl rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden"
            style={{ 
              backgroundColor: step.bgColor
            }}
          >
            {/* Background Decoration */}
            <div 
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${index % 2 === 0 ? '#e89a4d' : '#ffffff'}, transparent)`
              }}
            />
            
            {/* Warmes Licht-Overlay nur für Lichtkonzept-Karte */}
            {step.isLightConcept && (
              <>
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at top left, rgba(255, 216, 155, 0.4) 0%, transparent 60%)'
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at bottom right, rgba(232, 154, 77, 0.3) 0%, transparent 60%)'
                  }}
                />
              </>
            )}

            <div className="flex flex-col items-center gap-6 relative z-10 text-center">
              {/* Icon */}
              <div 
                className="flex-shrink-0 w-24 h-24 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  color: step.isLightConcept ? '#ffd89b' : (step.isWarmBeige ? '#e8dcc4' : '#ffffff'),
                  filter: step.isLightConcept 
                    ? 'drop-shadow(0 0 15px rgba(255, 216, 155, 0.6)) drop-shadow(0 0 30px rgba(255, 216, 155, 0.4))'
                    : 'none'
                }}
              >
                {step.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h4 
                  className="font-outfit text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
                  style={step.isLightConcept ? {
                    color: '#ffd89b',
                    textShadow: '0 0 20px rgba(255, 216, 155, 0.6), 0 0 40px rgba(255, 216, 155, 0.4), 0 0 60px rgba(255, 216, 155, 0.2)'
                  } : (step.isWarmBeige ? {
                    color: '#e8dcc4'
                  } : {})}
                >
                  {step.title}
                </h4>
                <p 
                  className="font-outfit text-xl md:text-2xl leading-relaxed font-light text-white/90"
                  style={step.isLightConcept ? {
                    color: 'rgba(255, 216, 155, 0.9)',
                    textShadow: '0 0 10px rgba(255, 216, 155, 0.3)'
                  } : (step.isWarmBeige ? {
                    color: 'rgba(232, 220, 196, 0.9)'
                  } : {})}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
}