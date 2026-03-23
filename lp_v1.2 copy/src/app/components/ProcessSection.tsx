import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, FileCheck, Calendar, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: <Box className="w-10 h-10" />,
      title: '3D-Visualisierung',
      text: 'Durch unsere 3D-Visualisierung siehst du was möglich ist und bekommst einen realistischen Vorgeschmack auf dein neues Mitra-Bad.',
      bgColor: '#a8d4a8', // 01 = Grün
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: 'Verbindliches Angebot',
      text: 'Durch ein verbindliches Angebot stellst Du sicher, dass der Preis von Anfang an klar ist.',
      bgColor: '#2c4a5f', // 02 = Blau
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: 'Klarer Ablaufplan',
      text: 'Durch einen klaren Ablauf- und Terminplan stellen wir gemeinsam sicher, dass du genau weißt wann dein neues Bad fertig ist.',
      bgColor: '#e89a4d', // 03 = Orange
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: 'Saubere Arbeit',
      text: '... und keine Sorge deine zu Hause bleibt sauber.',
      bgColor: '#ffffff', // 04 = Weiß
    },
  ];

  useEffect(() => {
    // Sticky stacking effect
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

  return (
    <section id="prozess" ref={sectionRef} className="relative bg-[#FAF9F6]">
      {/* Naturstein-Textur für Handwerkliche Qualität */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
        style={{ 
          backgroundImage: 'url(#stoneTexture)',
          backgroundSize: '600px 600px'
        }}
      />
      
      {/* Dezente Marmor-Adern */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: 'url(#marbleMint)',
          backgroundSize: '800px 800px'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center py-24 px-8 pb-0"
      >
        <h2 className="font-outfit text-5xl md:text-7xl font-black text-[#2c4a5f] mb-4 tracking-tighter">
          Wie entsteht so ein <span className="text-[#e89a4d] italic">Bad?</span>
        </h2>
      </motion.div>

      {steps.map((step, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24"
          style={{ 
            paddingTop: index === 0 ? '0' : '10vh',
            paddingBottom: index === steps.length - 1 ? '20vh' : '0'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-200px' }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-5xl rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden"
            style={{ 
              backgroundColor: step.bgColor,
              border: step.bgColor === '#ffffff' ? '1px solid rgba(44, 74, 95, 0.1)' : 'none'
            }}
          >
            {/* Background Decoration */}
            <div 
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${index % 2 === 0 ? '#e89a4d' : '#a8d4a8'}, transparent)`
              }}
            />

            <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
              {/* Icon */}
              <div 
                className="flex-shrink-0 w-24 h-24 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl"
                style={{
                  background: step.bgColor === '#ffffff' 
                    ? 'linear-gradient(135deg, #e89a4d 0%, #d17a2d 100%)'
                    : 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: step.bgColor !== '#ffffff' ? 'blur(10px)' : 'none'
                }}
              >
                {step.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-6">
                  <span 
                    className="font-outfit text-7xl md:text-8xl font-black"
                    style={{
                      color: step.bgColor === '#ffffff' 
                        ? 'rgba(44, 74, 95, 0.1)' 
                        : 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    0{index + 1}
                  </span>
                  <h3 
                    className="font-outfit text-3xl md:text-4xl font-black tracking-tight"
                    style={{
                      color: step.bgColor === '#ffffff' ? '#2c4a5f' : '#ffffff'
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p 
                  className="font-outfit text-xl md:text-2xl leading-relaxed font-light"
                  style={{
                    color: step.bgColor === '#ffffff' 
                      ? 'rgba(44, 74, 95, 0.7)' 
                      : 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {step.text}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
}