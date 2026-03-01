import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Bad-Quiz', href: '#bad-quiz' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Desktop / Pill Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          border: isScrolled ? '1px solid rgba(44, 74, 95, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="flex items-center gap-6">
          <span
            className="font-jakarta font-bold text-lg tracking-tight"
            style={{ color: isScrolled ? '#2c4a5f' : '#ffffff' }}
          >
            MITRA
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex gap-5">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="font-outfit text-sm font-medium tracking-tight transition-colors duration-300"
                style={{ color: isScrolled ? '#2c4a5f' : '#ffffff' }}
                whileHover={{ scale: 1.05 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-8 h-8"
            style={{ color: isScrolled ? '#2c4a5f' : '#ffffff' }}
            onClick={() => setMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
            aria-label="Menü öffnen"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#2c4a5f] flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <span className="font-jakarta font-bold text-xl text-white tracking-tight">
                MITRA
              </span>
              <motion.button
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
                aria-label="Menü schließen"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-start justify-center px-8 gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + index * 0.07 }}
                  className="font-outfit text-4xl font-bold text-white/80 hover:text-white hover:text-[#e89a4d] transition-colors duration-200 py-3 w-full"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-8 pb-10 font-outfit text-sm text-white/40"
            >
              ✓ Kostenlose Erstberatung
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
