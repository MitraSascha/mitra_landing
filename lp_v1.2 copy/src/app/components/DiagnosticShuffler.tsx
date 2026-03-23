import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const diagnostics = [
  { id: 1, label: 'Fliesenauswahl', subtitle: 'Premium-Materialien', bgColor: '#2c4a5f', isLightConcept: false },
  { id: 2, label: 'Raumoptimierung', subtitle: 'Intelligente Planung', bgColor: '#e89a4d', isLightConcept: false },
  { id: 3, label: 'Lichtkonzept', subtitle: 'Atmosphäre Design', bgColor: '#0d1f2d', isLightConcept: true },
];

export function DiagnosticShuffler() {
  const [cards, setCards] = useState(diagnostics);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const lastCard = newCards.pop();
        if (lastCard) {
          newCards.unshift(lastCard);
        }
        return newCards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: index === 0 ? 1 : 0.7 - index * 0.2,
              y: index * 12,
              scale: 1 - index * 0.05,
              zIndex: 3 - index,
            }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
              layout: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.5 },
              y: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
              scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
            }}
            className="absolute w-full max-w-sm p-8 bg-white rounded-[2rem] shadow-2xl border border-[#2c4a5f]/10"
            style={{
              backgroundColor: card.bgColor || '#ffffff'
            }}
          >
            {/* Warmes Licht-Overlay nur für Lichtkonzept-Karte */}
            {card.isLightConcept && (
              <>
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none rounded-[2rem]"
                  style={{
                    background: 'radial-gradient(ellipse at top left, rgba(255, 216, 155, 0.4) 0%, transparent 60%)'
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none rounded-[2rem]"
                  style={{
                    background: 'radial-gradient(ellipse at bottom right, rgba(232, 154, 77, 0.3) 0%, transparent 60%)'
                  }}
                />
              </>
            )}
            
            <div className="flex flex-col gap-2 relative z-10">
              <h4 
                className="font-outfit text-2xl font-bold tracking-tight"
                style={{
                  color: card.isLightConcept ? '#ffd89b' : (card.bgColor === '#ffffff' ? '#2c4a5f' : '#ffffff'),
                  textShadow: card.isLightConcept ? '0 0 15px rgba(255, 216, 155, 0.6), 0 0 30px rgba(255, 216, 155, 0.4)' : 'none'
                }}
              >
                {card.label}
              </h4>
              <p 
                className="font-outfit text-sm font-medium"
                style={{
                  color: card.isLightConcept ? 'rgba(255, 216, 155, 0.9)' : (card.bgColor === '#ffffff' ? 'rgba(44, 74, 95, 0.6)' : 'rgba(255, 255, 255, 0.8)'),
                  textShadow: card.isLightConcept ? '0 0 8px rgba(255, 216, 155, 0.3)' : 'none'
                }}
              >
                {card.subtitle}
              </p>
            </div>
            <div className="mt-4 flex gap-1 relative z-10">
              <div className="w-2 h-2 rounded-full bg-[#a8d4a8]" />
              <div className="w-2 h-2 rounded-full bg-[#e89a4d]" />
              <div className="w-2 h-2 rounded-full bg-[#2c4a5f]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}