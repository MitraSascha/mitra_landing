import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const messages = [
  'Optimierung der Raumplanung...',
  'Analyse der Lichtverhältnisse...',
  'Badezimmer-Konzept wird erstellt...',
  'Premium-Materialien werden ausgewählt...',
];

export function TelemetryTypewriter() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const message = messages[currentMessage];
    
    if (isTyping) {
      if (displayedText.length < message.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(message.slice(0, displayedText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentMessage]);

  return (
    <div className="w-full p-8 bg-[#1A1A1A] rounded-[2rem] shadow-2xl border border-[#2c4a5f]/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#a8d4a8]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-outfit text-xs font-semibold text-[#a8d4a8] tracking-wide uppercase">
            Live Feed
          </span>
        </div>
      </div>
      
      <div className="font-mono text-base md:text-lg text-white/90 min-h-[60px]">
        {displayedText}
        <motion.span
          className="inline-block w-0.5 h-5 bg-[#e89a4d] ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
