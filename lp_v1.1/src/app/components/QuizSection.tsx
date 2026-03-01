import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';

export function QuizSection() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Wie viele Tage verbringen wir jedes Jahr im Bad?";
  const answers = [
    { id: 'a', text: '3 Tage', isCorrect: false },
    { id: 'b', text: '7 Tage', isCorrect: false },
    { id: 'c', text: '15 Tage', isCorrect: false },
    { id: 'd', text: '33 Tage', isCorrect: true },
  ];

  const handleAnswerClick = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowResult(true);
    
    // Bei richtiger Antwort zur nächsten Sektion scrollen
    const answer = answers.find(a => a.id === answerId);
    if (answer?.isCorrect) {
      setTimeout(() => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <section id="bad-quiz" className="min-h-screen flex items-center justify-center bg-[#F2F0E9] px-4 py-32">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-[3rem] shadow-[0_30px_80px_rgba(44,74,95,0.15)] p-12 md:p-16 border border-[#2c4a5f]/10"
        >
          <h2 className="font-outfit text-2xl md:text-3xl font-semibold text-[#2c4a5f] mb-12 tracking-tight">
            {question}
          </h2>

          <div className="space-y-5">
            {answers.map((answer, index) => (
              <motion.button
                key={answer.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                onClick={() => handleAnswerClick(answer.id)}
                disabled={showResult}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                className={`w-full text-left p-7 rounded-[2rem] border-2 transition-all duration-500 ${
                  selectedAnswer === answer.id
                    ? answer.isCorrect
                      ? 'border-[#a8d4a8] bg-[#a8d4a8] text-white shadow-lg'
                      : 'border-[#CC5833] bg-[#CC5833]/10 text-[#1A1A1A]'
                    : showResult && answer.isCorrect
                    ? 'border-[#a8d4a8] bg-[#a8d4a8] text-white shadow-lg'
                    : 'border-[#2c4a5f]/20 bg-[#F2F0E9] text-[#2c4a5f] hover:border-[#2c4a5f] hover:bg-white hover:shadow-lg'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-outfit text-xl md:text-2xl font-medium">
                    {answer.text}
                  </span>
                  {showResult && answer.isCorrect && (
                    <CheckCircle2 className="w-8 h-8" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-[#2c4a5f] to-[#1f3646] border border-[#2c4a5f]/20"
            >
              {selectedAnswer === 'd' ? (
                <p className="text-white text-xl font-outfit font-medium leading-relaxed">
                  ✓ Statistik sagt: 33 Tage. Wir sagen: Mach sie zu Urlaubstagen!
                </p>
              ) : (
                <p className="text-white text-xl font-outfit font-medium leading-relaxed">
                  ✗ Nicht ganz. Die richtige Antwort ist: 33 Tage
                </p>
              )}
              <button
                onClick={handleReset}
                className="mt-6 px-10 py-4 bg-[#CC5833] text-white rounded-[1.5rem] hover:bg-[#b54d2a] transition-all duration-300 font-outfit font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                Erneut versuchen
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}