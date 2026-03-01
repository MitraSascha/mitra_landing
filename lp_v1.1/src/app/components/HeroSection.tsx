import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const answers = [
    { id: 'a', text: '3 Tage', isCorrect: false },
    { id: 'b', text: '7 Tage', isCorrect: false },
    { id: 'c', text: '15 Tage', isCorrect: false },
    { id: 'd', text: '33 Tage', isCorrect: true },
  ];

  const handleAnswerClick = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    if (textRef.current) {
      const elements = textRef.current.querySelectorAll('.hero-text-part');
      gsap.fromTo(
        elements,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <section id="bad-quiz" className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background Image with Extended Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1765745518752-68a289300789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGVsZWdhbnQlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzcxOTUzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury bathroom"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c4a5f]/80 via-[#2c4a5f]/70 to-[#2c4a5f]" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between px-6 md:px-16 lg:px-24 pt-24 pb-16 min-h-[100dvh]">
        {/* Question - Top Section */}
        <div ref={textRef} className="max-w-4xl pt-8 md:pt-12">
          <div className="hero-text-part mb-6">
            <h1
              className="font-outfit font-bold text-[#e89a4d] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 8vw, 100px)' }}
            >
              Wie viele Tage verbringen wir jedes Jahr im Bad?
            </h1>
          </div>
        </div>

        {/* Quiz Answers - Bottom Section */}
        <div className="w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Answers Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6">
              {answers.map((answer, index) => (
                <motion.button
                  key={answer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={showResult}
                  whileTap={{ scale: showResult ? 1 : 0.97 }}
                  aria-pressed={selectedAnswer === answer.id}
                  className={`text-left p-4 md:p-8 rounded-2xl md:rounded-[2rem] border-2 transition-all duration-500 backdrop-blur-md min-h-[56px] md:min-h-[80px] ${
                    selectedAnswer === answer.id
                      ? answer.isCorrect
                        ? 'border-[#a8d4a8] bg-[#a8d4a8] text-white shadow-2xl'
                        : 'border-[#e89a4d] bg-[#e89a4d]/20 text-white backdrop-blur-lg'
                      : showResult && answer.isCorrect
                      ? 'border-[#a8d4a8] bg-[#a8d4a8] text-white shadow-2xl'
                      : 'border-white/30 bg-white/10 text-white active:border-white active:bg-white/20'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-outfit text-sm md:text-xl lg:text-2xl font-semibold">
                      {answer.text}
                    </span>
                    {showResult && answer.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Result Message */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-5 md:p-8 rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/30"
              >
                <p className="text-white text-base md:text-2xl font-outfit font-semibold leading-relaxed">
                  {selectedAnswer === 'd'
                    ? '✓ Statistik sagt: 33 Tage. Wir sagen: Mach sie zu Urlaubstagen!'
                    : '✗ Statistik sagt: 33 Tage. Wir sagen: Mach sie zu Urlaubstagen!'}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollDown}
                    className="px-6 py-3 bg-[#e89a4d] text-white rounded-full font-outfit font-semibold text-sm"
                  >
                    Mehr erfahren
                  </motion.button>
                  <button
                    onClick={handleReset}
                    className="font-outfit text-sm text-white/60 hover:text-white/90 transition-colors underline underline-offset-2"
                  >
                    Nochmal versuchen
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll Arrow */}
        {!showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={scrollDown}
            aria-label="Nach unten scrollen"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.button>
        )}
      </div>
    </section>
  );
}
