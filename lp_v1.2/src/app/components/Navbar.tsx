import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      // Close mobile menu on scroll
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = ['Bad-Quiz', 'Galerie', 'Prozess', 'Kontakt'];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-full transition-all duration-700 ease-out"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)',
          border: isScrolled ? '1px solid rgba(44, 74, 95, 0.15)' : '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(44, 74, 95, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : '0 4px 16px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex items-center gap-8">
          <motion.span
            className="font-outfit font-bold text-xl tracking-tight transition-colors duration-500"
            style={{ color: isScrolled ? '#2c4a5f' : '#ffffff' }}
          >
            MITRA
          </motion.span>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-outfit text-sm font-medium tracking-tight transition-all duration-500 relative group"
                style={{ color: isScrolled ? '#2c4a5f' : '#ffffff' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: isScrolled ? '#e89a4d' : '#ffffff' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{ color: isScrolled ? '#2c4a5f' : '#ffffff' }}
            aria-label="Menü öffnen"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed top-[5.5rem] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm rounded-3xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(44, 74, 95, 0.12)',
              boxShadow: '0 20px 60px rgba(44, 74, 95, 0.18), 0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-outfit text-base font-semibold py-3 px-5 rounded-2xl transition-colors duration-200 flex items-center justify-between"
                  style={{ color: '#2c4a5f' }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(44, 74, 95, 0.06)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                  <span style={{ color: '#e89a4d', fontSize: '1rem' }}>→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
