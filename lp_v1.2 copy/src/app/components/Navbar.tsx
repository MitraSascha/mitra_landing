import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-10 py-5 rounded-full transition-all duration-700 ease-out"
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)',
        border: isScrolled ? '1px solid rgba(44, 74, 95, 0.15)' : '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(44, 74, 95, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)' 
          : '0 4px 16px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="flex items-center gap-10">
        <motion.span
          className="font-outfit font-bold text-xl tracking-tight transition-colors duration-500"
          style={{
            color: isScrolled ? '#2c4a5f' : '#ffffff',
          }}
        >
          MITRA
        </motion.span>
        
        <div className="hidden md:flex gap-8">
          {['Bad-Quiz', 'Galerie', 'Prozess', 'Kontakt'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-outfit text-sm font-medium tracking-tight transition-all duration-500 relative group"
              style={{
                color: isScrolled ? '#2c4a5f' : '#ffffff',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{
                  backgroundColor: isScrolled ? '#e89a4d' : '#ffffff'
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}