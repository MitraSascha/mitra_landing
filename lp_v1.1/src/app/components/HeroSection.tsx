import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CheckCircle2, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onQuizAnswered?: () => void;
}

export function HeroSection({ onQuizAnswered }: HeroSectionProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const answers = [
    { id: 'a', text: '22 Tage', isCorrect: false },
    { id: 'b', text: '15 Tage', isCorrect: false },
    { id: 'c', text: '33 Tage', isCorrect: true },
    { id: 'd', text: '9 Tage', isCorrect: false },
  ];

  const handleAnswerClick = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowResult(true);
    // Notify parent that quiz has been answered
    if (onQuizAnswered) {
      onQuizAnswered();
    }
  };

  useEffect(() => {
    if (textRef.current) {
      const elements = textRef.current.querySelectorAll('.hero-text-part');
      
      gsap.fromTo(
        elements,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-end">
      {/* Background Image with Elegant Beige/White Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRodHViJTIwdmlldyUyMG5hdHVyYWwlMjBzdG9uZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzczNjU2Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury bathroom view from bathtub with natural stone"
          className="w-full h-full object-cover"
        />
        {/* Edles Weiß/Beige Gradient statt Blau */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1e8]/90 via-[#e8dfd0]/85 to-[#d4c9b8]/95" />
        
        {/* Marmor-Overlay für dezente Badezimmer-Optik */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-soft-light"
          style={{ 
            backgroundImage: 'url(#marbleTexture)',
            filter: 'contrast(1.1)'
          }}
        />
      </div>

      {/* Content Container - Bottom-left third */}
      <div className="relative w-full px-8 md:px-16 lg:px-24 pb-20 md:pb-32">
        {/* Dramatic Question - Bottom-left Positioning */}
        <div ref={textRef} className="max-w-4xl mb-16 md:mb-24">
          <div className="hero-text-part mb-2">
            <h1 className="font-outfit font-black text-[#e89a4d] tracking-tighter leading-[0.9] text-6xl md:text-8xl lg:text-9xl">
              Wie viele Tage
            </h1>
          </div>
          <div className="hero-text-part mb-6">
            <h1 className="font-outfit font-black text-[#e89a4d] tracking-tighter leading-[0.9] text-6xl md:text-8xl lg:text-9xl">
              verbringen wir
            </h1>
          </div>
          <div className="hero-text-part mb-6">
            <h1 className="font-outfit font-black text-[#e89a4d] tracking-tighter leading-[0.9] text-6xl md:text-8xl lg:text-9xl">
              jedes Jahr
            </h1>
          </div>
          <div className="hero-text-part">
            <h1 className="font-outfit font-black text-[#e89a4d] tracking-tighter leading-[0.9] text-6xl md:text-8xl lg:text-9xl">
              im Bad?
            </h1>
          </div>
        </div>

        {/* Quiz Answers - Enhanced Glassmorphism */}
        <div id="bad-quiz" className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Answers Grid - 2x2 with rounded-[2rem] */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              {answers.map((answer, index) => (
                <motion.button
                  key={answer.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2 + index * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={showResult}
                  whileHover={{ scale: showResult ? 1 : 1.05, y: showResult ? 0 : -4 }}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  className={`text-left p-6 md:p-8 rounded-[2rem] border-2 transition-all duration-700 backdrop-blur-2xl ${
                    selectedAnswer === answer.id
                      ? answer.isCorrect
                        ? 'border-[#a8d4a8] bg-[#a8d4a8]/90 text-white shadow-2xl shadow-[#a8d4a8]/30'
                        : 'border-[#e89a4d] bg-[#e89a4d]/40 text-white backdrop-blur-2xl shadow-xl'
                      : showResult && answer.isCorrect
                      ? 'border-[#a8d4a8] bg-[#a8d4a8]/90 text-white shadow-2xl shadow-[#a8d4a8]/30'
                      : 'border-white/90 bg-white/30 text-white shadow-lg shadow-black/20 ring-1 ring-white/30 hover:bg-white/45 hover:shadow-xl hover:shadow-black/30'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-outfit text-lg md:text-2xl lg:text-3xl font-bold tracking-tight">
                      {answer.text}
                    </span>
                    {showResult && answer.isCorrect && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                        <CheckCircle2 className="w-7 h-7 md:w-9 md:h-9" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Result Message - Ein Kästchen */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-[#2c4a5f]/90 to-[#2c4a5f]/70 backdrop-blur-2xl border-2 border-white/30 shadow-2xl"
              >
                {selectedAnswer === 'c' ? (
                  <p className="text-white text-xl md:text-2xl lg:text-3xl font-outfit font-black leading-tight mb-4">
                    Richtig! Statistik sagt: <span className="text-[#a8d4a8] italic">33 Tage</span>
                  </p>
                ) : (
                  <p className="text-white text-xl md:text-2xl lg:text-3xl font-outfit font-black leading-tight mb-4">
                    Sogar noch mehr! Statistik sagt: <span className="text-[#e89a4d] italic">33 Tage</span>
                  </p>
                )}
                <p className="text-white text-2xl md:text-3xl lg:text-4xl font-outfit font-black leading-tight">
                  Wir sagen: Mach sie zu <span className="italic">Urlaubstagen!</span>
                </p>
              </motion.div>
            )}

            {/* Scroll Hint - appears after answering */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="flex flex-col items-center gap-2 mt-8"
              >
                <span className="font-outfit text-xs tracking-[0.25em] uppercase text-white/50">
                  Weiterlesen
                </span>
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-5 h-5 text-white/50" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}