import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      );
    }
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
        <span key={index} className="word inline-block mr-3"><span className={isHighlighted ? 'text-[#e89a4d]' : ''}>{wordWithoutPunctuation}</span>{punctuation && <span className="text-white">{punctuation}</span>}</span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 px-8 md:px-16 lg:px-24 bg-[#2c4a5f]"
      style={{ position: 'relative' }}
    >
      <div className="max-w-5xl mx-auto">
        <div ref={textRef} className="relative">
          <p className="font-outfit text-3xl md:text-4xl lg:text-5xl text-white leading-[1.3] font-light tracking-tight">
            {splitIntoWords('Dein Bad ist nicht einfach nur funktional – es ist dein täglicher Rückzugsort. Wir optimieren nicht nur Rohre und Fliesen, sondern dein gesamtes Wohlfühl-Erlebnis.')}
          </p>
        </div>
      </div>
    </section>
  );
}