import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-full transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        border: isScrolled ? '1px solid rgba(44, 74, 95, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className="flex items-center gap-8">
        <motion.span
          className="font-jakarta font-bold text-xl tracking-tight"
          style={{
            color: isScrolled ? '#2c4a5f' : '#ffffff',
          }}
        >
          MITRA
        </motion.span>
        
        <div className="flex gap-6">
          {['Bad-Quiz', 'Galerie', 'Prozess', 'Kontakt'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-outfit text-sm font-medium tracking-tight transition-colors duration-300"
              style={{
                color: isScrolled ? '#2c4a5f' : '#ffffff',
              }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}