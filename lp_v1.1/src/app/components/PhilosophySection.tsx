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
      const hasPunctuation = /[.,!?;:]$/.test(word);
      const wordWithoutPunctuation = hasPunctuation ? word.slice(0, -1) : word;
      const punctuation = hasPunctuation ? word.slice(-1) : '';

      const isHighlighted =
        wordWithoutPunctuation === 'täglicher' ||
        wordWithoutPunctuation === 'Rückzugsort' ||
        wordWithoutPunctuation === 'Wohlfühl-Erlebnis';

      return (
        <span key={index} className="word inline-block mr-3">
          <span className={isHighlighted ? 'text-[#e89a4d]' : ''}>{wordWithoutPunctuation}</span>
          {punctuation && <span className="text-white">{punctuation}</span>}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-28 lg:py-40 px-8 md:px-16 lg:px-24 bg-[#2c4a5f] overflow-hidden"
    >
      {/* Floating ambient orbs */}
      <motion.div
        animate={{ y: [0, -28, 0], x: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[15%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,154,77,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute bottom-1/4 left-[20%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,212,168,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-2/3 right-[30%] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(44,74,95,0.4) 0%, transparent 70%)', filter: 'blur(35px)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div ref={textRef} className="relative" style={{ y }}>
          <p className="font-outfit text-3xl md:text-4xl lg:text-5xl text-white leading-[1.3] font-light tracking-tight">
            {splitIntoWords('Dein Bad ist nicht einfach nur funktional – es ist dein täglicher Rückzugsort. Wir optimieren nicht nur Rohre und Fliesen, sondern dein gesamtes Wohlfühl-Erlebnis.')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
