import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'Bad-Quiz', href: '#bad-quiz' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Kontakt', href: '#kontakt' },
];

function handleNavClick(href: string, onDone?: () => void) {
  if (onDone) onDone();
  setTimeout(() => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1b24]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 flex-shrink-0"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex flex-col leading-none">
              <span className="font-jakarta font-bold text-white text-base tracking-wide">MITRA</span>
              <span className="font-outfit text-white/50 text-[10px] tracking-wider">Sanitär & Heizung</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-outfit text-sm text-white/70 hover:text-white transition-colors duration-200"
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="/lp_v1.0/terminbuchung/"
              className="hidden md:flex group relative px-5 py-2.5 rounded-full font-outfit text-sm font-semibold text-white bg-gradient-to-r from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] transition-all duration-300 hover:scale-105 overflow-hidden shadow-[0_0_40px_rgba(232,154,77,0.25)] hover:shadow-[0_0_60px_rgba(232,154,77,0.4)] items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                3D-Visualisierung buchen
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-white/80 hover:text-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-16" />

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0d1b24] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col leading-none">
                  <span className="font-jakarta font-bold text-white text-base tracking-wide">MITRA</span>
                  <span className="font-outfit text-white/50 text-[10px] tracking-wider">Sanitär & Heizung</span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Menü schließen"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-start justify-center px-8 gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.07 }}
                  className="font-outfit text-4xl font-bold text-white/70 hover:text-[#e89a4d] transition-colors duration-200 py-3 w-full"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href, () => setMenuOpen(false)); }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-8 pb-10">
              <button
                className="group relative w-full px-6 py-4 rounded-full font-outfit text-base font-semibold text-white bg-gradient-to-r from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] overflow-hidden shadow-[0_0_60px_rgba(232,154,77,0.3)] flex items-center justify-center gap-2"
                onClick={() => handleNavClick('#kontakt', () => setMenuOpen(false))}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  3D-Visualisierung buchen
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
