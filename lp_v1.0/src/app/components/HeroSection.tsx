import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CheckCircle2 } from 'lucide-react';

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

  return (
    <section className="relative min-h-[140vh] w-full overflow-hidden">
      {/* Background Image with Extended Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1765745518752-68a289300789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGVsZWdhbnQlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzcxOTUzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury bathroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c4a5f]/80 via-[#2c4a5f]/70 to-[#2c4a5f]" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between px-8 md:px-16 lg:px-24 py-24">
        {/* Question - Top Section */}
        <div ref={textRef} className="max-w-4xl pt-12">
          <div className="hero-text-part mb-6">
            <h1 className="font-outfit font-bold text-[#e89a4d] tracking-tight leading-[1.0] text-[100px]">
              Wie viele Tage verbringen wir jedes Jahr im Bad?
            </h1>
          </div>
        </div>

        {/* Quiz Answers - Bottom Section */}
        <div className="max-w-5xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Answers Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              {answers.map((answer, index) => (
                <motion.button
                  key={answer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={showResult}
                  whileHover={{ scale: showResult ? 1 : 1.03 }}
                  whileTap={{ scale: showResult ? 1 : 0.97 }}
                  className={`text-left p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all duration-500 backdrop-blur-md ${
                    selectedAnswer === answer.id
                      ? answer.isCorrect
                        ? 'border-[#a8d4a8] bg-[#a8d4a8] text-white shadow-2xl'
                        : 'border-[#e89a4d] bg-[#e89a4d]/20 text-white backdrop-blur-lg'
                      : showResult && answer.isCorrect
                      ? 'border-[#a8d4a8] bg-[#a8d4a8] text-white shadow-2xl'
                      : 'border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:shadow-2xl'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-outfit text-base md:text-xl lg:text-2xl font-semibold">
                      {answer.text}
                    </span>
                    {showResult && answer.isCorrect && (
                      <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />
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
                className="p-8 rounded-[2rem] bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/30"
              >
                {selectedAnswer === 'd' ? (
                  <p className="text-white text-xl md:text-2xl font-outfit font-semibold leading-relaxed">
                    ✓ Statistik sagt: 33 Tage. Wir sagen: Mach sie zu Urlaubstagen!
                  </p>
                ) : (
                  <p className="text-white text-xl md:text-2xl font-outfit font-semibold leading-relaxed">
                    ✗ Statistik sagt: 33 Tage. Wir sagen: Mach sie zu Urlaubstagen!
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}