import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import threeDVisualization from '../../assets/4f23b4937dc17f60b7a93503bbedb04b980c6eb8.png';
import realizedBathroom from '../../assets/1062920d9ba072a2349de200e73f4f3e47d422de.png';

export function CTASection() {
  const [showRealized, setShowRealized] = useState(false);

  return (
    <section className="relative py-20 md:py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-br from-[#f5f1e8] via-[#e8dfd0] to-[#d4c9b8] overflow-hidden">
      {/* Subtile Lichtzone */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(168,212,168,0.15) 0%, rgba(232,154,77,0.12) 35%, transparent 65%)',
          filter: 'blur(70px)'
        }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl text-[#2c4a5f] font-bold tracking-tight mb-3">
            Von der Vision zur Realität
          </h2>
          <p className="font-outfit text-lg md:text-xl text-[#6B6B6B] font-light max-w-2xl mx-auto mb-12">
            Erlebe dein neues Bad schon vor dem ersten Spatenstich
          </p>
        </motion.div>

        {/* Interaktives Bild aus lp_v1.1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-10"
        >
          <div
            className="max-w-sm w-full group/image cursor-pointer"
            onClick={() => setShowRealized(!showRealized)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={threeDVisualization}
                alt="3D Visualisierung eines modernen Badezimmers"
                className="w-full h-auto object-cover"
              />
              {!showRealized && (
                <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                  <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                    <span className="font-outfit text-base font-semibold text-[#2c4a5f]">
                      Hier Klicken
                    </span>
                  </div>
                </div>
              )}
              <img
                src={realizedBathroom}
                alt="Realisiertes Badezimmer"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                  showRealized ? 'opacity-100' : 'opacity-0 md:group-hover/image:opacity-100'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary Button - 3D Visualisierung */}
          <a
            href={`${import.meta.env.BASE_URL}terminbuchung/`}
            className="group relative px-10 py-5 rounded-full font-outfit text-base md:text-lg font-semibold text-white bg-gradient-to-r from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] transition-all duration-300 hover:scale-105 w-full sm:w-auto overflow-hidden shadow-[0_0_120px_rgba(232,154,77,0.3),0_0_180px_rgba(168,212,168,0.2),0_0_240px_rgba(44,74,95,0.25),0_0_300px_rgba(232,154,77,0.15)] hover:shadow-[0_0_140px_rgba(232,154,77,0.4),0_0_200px_rgba(168,212,168,0.3),0_0_260px_rgba(44,74,95,0.35),0_0_320px_rgba(232,154,77,0.2)] flex items-center justify-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              3D Visualisierung buchen
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </a>

          {/* Secondary Button - Kontaktformular */}
          <a
            href={`${import.meta.env.BASE_URL}kontaktformular/`}
            className="group relative px-10 py-5 rounded-full font-outfit text-base md:text-lg font-semibold text-white bg-[#2c4a5f] transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto overflow-hidden flex items-center justify-center"
          >
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
