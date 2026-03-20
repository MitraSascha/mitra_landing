import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontakt" className="relative py-20 px-8 md:px-16 lg:px-24 bg-[#1A1A1A] text-white/70 overflow-hidden rounded-t-[4rem]">
      {/* Gradient Line oben */}
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
          <h3 className="font-outfit text-3xl font-black text-white tracking-tight mb-1">
            MITRA
          </h3>
          <p className="font-outfit text-sm text-white/50 tracking-wide">
            Sanitär & Heizung
          </p>
        </motion.div>

        {/* 3-Spalten-Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12"
        >
          {/* Spalte 1: Über uns */}
          <div>
            <p className="font-outfit text-[#e89a4d] text-base font-bold mb-3">Mitra Sanitär GmbH</p>
            <p className="font-outfit text-sm leading-relaxed text-white/50">
              Ihr Partner für moderne Sanitär- und Heizungstechnik. Tradition trifft Innovation.
            </p>
          </div>

          {/* Spalte 2: Kontakt */}
          <div>
            <p className="font-outfit text-[#e89a4d] text-base font-bold mb-3">Kontakt</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e89a4d] flex-shrink-0 mt-0.5" />
                <span className="font-outfit">Borussiastraße 62a, 12103 Berlin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e89a4d] flex-shrink-0" />
                <a href="tel:03076008921" className="font-outfit hover:text-white transition-colors">030 760 089 21</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e89a4d] flex-shrink-0" />
                <a href="mailto:hey@mitra-sanitaer.de" className="font-outfit hover:text-white transition-colors">hey@mitra-sanitaer.de</a>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Quick Links */}
          <div>
            <p className="font-outfit text-[#e89a4d] text-base font-bold mb-3">Quick Links</p>
            <nav className="flex flex-col gap-3 text-sm">
              {[
                { label: 'Bad-Quiz', href: '#bad-quiz' },
                { label: 'Galerie', href: '#galerie' },
                { label: 'Prozess', href: '#prozess' },
                { label: 'Kontakt', href: '#kontakt' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-outfit text-white/60 hover:text-white transition-all duration-300 relative group w-fit"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e89a4d] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Links (Impressum etc.) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-8 mb-10"
        >
          {['Impressum', 'Datenschutz', 'AGB'].map((item) => (
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

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
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
            © 2026 Mitra Sanitär GmbH. Alle Rechte vorbehalten.
          </p>
        </div>

      </div>
    </footer>
  );
}
