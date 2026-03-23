import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="relative py-20 px-8 md:px-16 lg:px-24 bg-[#1A1A1A] text-white/70 overflow-hidden rounded-t-[4rem]">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2c4a5f] via-[#e89a4d] to-[#a8d4a8]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-outfit text-3xl font-black text-white tracking-tight mb-4">
            MITRA
          </h3>
          <p className="font-outfit text-sm text-white/50 tracking-wide">
            Sanitär & Heizung
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {['Impressum', 'Datenschutz', 'AGB', 'Kontakt'].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              className="font-outfit text-sm text-white/60 hover:text-white transition-all duration-300 relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e89a4d] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#a8d4a8]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-outfit text-xs font-semibold text-[#a8d4a8] tracking-wide uppercase">
            System Operational
          </span>
        </motion.div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-outfit text-xs text-white/40 tracking-wide">
            © 2026 MITRA Sanitär & Heizung. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}