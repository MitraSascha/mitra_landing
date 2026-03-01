import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    target: 200,
    suffix: '+',
    label: 'Bäder saniert',
    description: 'Individuell gestaltete Traumbäder',
  },
  {
    target: 15,
    suffix: '',
    label: 'Jahre Erfahrung',
    description: 'Handwerk mit Leidenschaft',
  },
  {
    target: 98,
    suffix: '%',
    label: 'Zufriedenheit',
    description: 'Unsere Kunden empfehlen uns weiter',
  },
];

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count}
      {count === target ? suffix : ''}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-[#FAF9F6] py-20 px-8 md:py-28 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`
                flex flex-col items-center text-center px-8 py-6
                ${index < stats.length - 1 ? 'md:border-r md:border-[#2c4a5f]/10' : ''}
              `}
            >
              <div className="text-6xl font-bold font-outfit text-[#e89a4d] mb-3 tabular-nums leading-none">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  isVisible={isInView}
                />
              </div>
              <div className="font-jakarta text-lg font-semibold text-[#2c4a5f] mb-2 tracking-tight">
                {stat.label}
              </div>
              <div className="font-outfit text-sm text-[#6B6B6B] leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
