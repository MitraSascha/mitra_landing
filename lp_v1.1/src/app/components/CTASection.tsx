import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import threeDVisualization from '../../assets/4f23b4937dc17f60b7a93503bbedb04b980c6eb8.png';
import realizedBathroom from '../../assets/1062920d9ba072a2349de200e73f4f3e47d422de.png';

export function CTASection() {
  const [showRealized, setShowRealized] = useState(false);

  return (
    <section className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-br from-[#f5f1e8] via-[#e8dfd0] to-[#d4c9b8] overflow-hidden">
      {/* Enhanced Subtle Light Zone */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(168,212,168,0.15) 0%, rgba(232,154,77,0.12) 35%, transparent 70%)',
          filter: 'blur(90px)'
        }}
      ></div>
      
      {/* Marmor-Textur für Luxus-Gefühl */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: 'url(#marbleTexture)',
          backgroundSize: '800px 800px'
        }}
      />
      
      {/* Dezente Kachel-Optik */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: 'url(#tileTexture)',
          backgroundSize: '200px 200px'
        }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* 3D Visualisierung Info */}
          <div className="max-w-4xl mx-auto mb-16">
            {/* Headline in großer, dramatischer Schrift */}
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-outfit text-4xl md:text-5xl lg:text-6xl text-[#2c4a5f] font-black tracking-tight mb-12 text-center leading-tight"
            >
              Von Vision zu Realität.
            </motion.h3>
            
            {/* Card-basiertes Layout für die beiden Textblöcke */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Karte 1: 3D Model Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative p-8 rounded-[2rem] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(232,154,77,0.2)] transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Icon/Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e89a4d]/20 mb-6">
                  <Sparkles className="w-7 h-7 text-[#e89a4d]" />
                </div>
                
                <p className="font-outfit text-lg md:text-xl text-[#2c4a5f] leading-relaxed">
                  Mit dem Mitra 3D Model für{' '}
                  <span className="inline-flex items-center gap-1 bg-[#e89a4d] text-white px-4 py-2 rounded-xl font-bold shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 text-xl md:text-2xl">
                    299€
                  </span>{' '}
                  kannst du detailgetreu und kostengünstig verschiedenste Planungs-und Designmöglichkeiten ausprobieren und erlebe wie aus deiner Vision Realität wird.
                </p>
              </motion.div>

              {/* Karte 2: Lasertechnik Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative p-8 rounded-[2rem] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(168,212,168,0.2)] transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Icon/Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#a8d4a8]/20 mb-6">
                  <svg className="w-7 h-7 text-[#a8d4a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                <p className="font-outfit text-lg md:text-xl text-[#2c4a5f] leading-relaxed">
                  Wir kommen zu Dir nach Hause und gehen mit dir den ersten Schritt in Richtung Traumbad. Mit moderner Lasertechnik vermessen wir jeden Winkel deines Badezimmers und garantieren dir so die qualitativ hochwertigste Planung!
                </p>
              </motion.div>
            </div>
          </div>

          {/* 3D Visualization Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-sm mx-auto mb-12 group/image cursor-pointer"
            onClick={() => setShowRealized(!showRealized)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Base Image - 3D Visualization */}
              <img
                src={threeDVisualization}
                alt="3D Visualisierung eines modernen Badezimmers"
                className="w-full h-auto object-cover"
              />
              
              {/* Mobile Click Indicator - only visible when not showing realized image */}
              {!showRealized && (
                <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                  <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                    <span className="font-outfit text-base font-semibold text-[#2c4a5f]">
                      Hier Klicken
                    </span>
                  </div>
                </div>
              )}
              
              {/* Overlay Image - Real Bathroom - appears on hover (desktop) or tap (mobile) */}
              <img
                src={realizedBathroom}
                alt="Realisiertes Badezimmer"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                  showRealized ? 'opacity-100' : 'opacity-0 md:group-hover/image:opacity-100'
                }`}
              />
            </div>
          </motion.div>

          {/* Call to Action Text */}
          <h3 className="font-outfit text-2xl md:text-3xl text-[#2c4a5f] font-bold tracking-tight mb-8 text-center">
            Ob 3D-Visualisierung oder direkt auf die Baustelle: Sag uns wie wir starten sollen!
          </h3>
        </motion.div>

        {/* CTA Buttons - Three Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mb-16"
        >
          {/* Button 1 - 3D Visualisierung buchen - Nav-Stil */}
          <a href="/lp_v1.0/terminbuchung/" className="group relative px-8 py-4 rounded-full font-outfit text-base md:text-lg font-semibold text-white bg-gradient-to-r from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] transition-all duration-300 hover:scale-105 overflow-hidden shadow-[0_0_40px_rgba(232,154,77,0.25)] hover:shadow-[0_0_60px_rgba(232,154,77,0.4)] w-full sm:w-auto sm:flex-1 sm:max-w-xs flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">3D Visualisierung buchen</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </a>

          {/* Button 2 - Kontaktformular - Blau */}
          <a href="/lp_v1.0/terminbuchung/" className="group relative px-8 py-4 rounded-full font-outfit text-base md:text-lg font-semibold text-white bg-[#2c4a5f] transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto sm:flex-1 sm:max-w-xs overflow-hidden flex items-center justify-center">
            <span className="relative z-10">Kontaktformular</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </a>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="font-outfit text-sm font-light" style={{ color: 'rgba(44, 74, 95, 0.55)' }}>
            ✓ Kostenlose Erstberatung · ✓ Unverbindliches Angebot · ✓ 100% Planungssicherheit
          </p>
        </motion.div>
      </div>
    </section>
  );
}