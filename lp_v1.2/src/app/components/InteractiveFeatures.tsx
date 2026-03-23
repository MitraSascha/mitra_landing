import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';

export function InteractiveFeatures() {
  // Card 1: Shuffling Cards
  const [cards, setCards] = useState([
    { id: 1, label: 'Wohlfühl-Score', value: '95%' },
    { id: 2, label: 'Design-Optimierung', value: '88%' },
    { id: 3, label: 'Qualitäts-Index', value: '92%' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const last = newCards.pop();
        if (last) newCards.unshift(last);
        return newCards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Card 2: Typewriter Effect
  const messages = [
    'Optimiere dein Badezimmer...',
    'Individuelles Design läuft...',
    'Urlaubsfeeling wird aktiviert...',
    'Premium-Qualität garantiert...',
  ];
  
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    
    if (isTyping) {
      if (displayText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
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
        setDisplayText('');
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, currentMessageIndex]);

  // Card 3: Animated Week Grid
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [showCursor, setShowCursor] = useState(false);
  const days = ['M', 'D', 'M', 'D', 'F', 'S', 'S'];

  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowCursor(true);
      
      // Move cursor to a random day
      const randomDay = Math.floor(Math.random() * 7);
      setCursorPosition({ x: randomDay * 50 + 25, y: 30 });
      
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Click animation
      setActiveDay(randomDay);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Move to save button
      setCursorPosition({ x: 175, y: 90 });
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Fade out
      setShowCursor(false);
      setActiveDay(null);
      
      // Restart
      setTimeout(sequence, 2000);
    };

    sequence();
  }, []);

  return (
    <section className="relative py-32 px-4 bg-[#F2F0E9]">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Removed title and subtitle */}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Shuffling Metrics */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg relative overflow-visible h-80"
            >
              <h3 className="font-jakarta font-semibold text-lg text-[#2c4a5f] mb-6">
                Audit Intelligence
              </h3>
              
              <div className="relative h-52">
                <AnimatePresence mode="popLayout">
                  {cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ y: -100, opacity: 0, scale: 0.8 }}
                      animate={{
                        y: index * 20,
                        opacity: 1 - index * 0.3,
                        scale: 1 - index * 0.05,
                        zIndex: 3 - index,
                      }}
                      exit={{ y: 100, opacity: 0, scale: 0.8 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="absolute left-0 right-0 bg-gradient-to-br from-[#2c4a5f] to-[#1f3646] rounded-2xl p-6 text-white shadow-xl"
                    >
                      <div className="text-sm font-mono-custom opacity-70 mb-2">
                        {card.label}
                      </div>
                      <div className="text-4xl font-bold font-outfit">
                        {card.value}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Card 2: Typewriter Feed */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg h-80"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-jakarta font-semibold text-lg text-[#2c4a5f]">
                  Neural Stream
                </h3>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-[#CC5833] rounded-full"
                  />
                  <span className="text-xs font-mono-custom text-[#CC5833]">
                    Live Feed
                  </span>
                </div>
              </div>

              <div className="bg-[#1A1A1A] rounded-xl p-6 font-mono-custom text-sm min-h-40">
                <div className="text-[#a8d4a8] flex items-start gap-2">
                  <Activity className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-[#CC5833] ml-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 3: Week Grid with Cursor */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg relative h-80"
            >
              <h3 className="font-jakarta font-semibold text-lg text-[#2c4a5f] mb-6">
                Adaptive Regimen
              </h3>

              <div className="relative h-32 mb-8">
                <div className="flex gap-2 justify-center mb-6">
                  {days.map((day, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        backgroundColor:
                          activeDay === index ? '#2c4a5f' : '#F2F0E9',
                        color: activeDay === index ? '#ffffff' : '#2c4a5f',
                        scale: activeDay === index ? 1.1 : 1,
                      }}
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-outfit font-semibold text-sm"
                    >
                      {day}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  animate={{
                    x: cursorPosition.x,
                    y: cursorPosition.y,
                    opacity: showCursor ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute pointer-events-none"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                      d="M0 0 L0 16 L5 11 L8 18 L10 17 L7 10 L13 10 Z"
                      fill="#CC5833"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.button
                animate={{
                  scale: cursorPosition.y > 80 && showCursor ? 0.95 : 1,
                }}
                className="w-full py-3 bg-[#2c4a5f] text-white rounded-xl font-outfit font-semibold"
              >
                Speichern
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}