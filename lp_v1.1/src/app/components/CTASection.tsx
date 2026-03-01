import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  const scrollToKontakt = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-br from-[#2c4a5f] to-[#1e3340] overflow-hidden">
      {/* Subtile Lichtzone hinter Headline + Buttons - breiter */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 35%, transparent 65%)',
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
          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight mb-3">
            Von der Vision zur Realität
          </h2>
          <p className="font-outfit text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-12">
            Erlebe dein neues Bad schon vor dem ersten Spatenstich
          </p>
        </motion.div>

        {/* CTA Buttons - Now Primary Focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary Button - 3D-Visualisierung mit Gradient & Glow */}
          <button
            onClick={scrollToKontakt}
            className="group relative px-10 py-5 rounded-full font-outfit text-base md:text-lg font-semibold text-white bg-gradient-to-r from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] transition-all duration-300 hover:scale-105 w-full sm:w-auto overflow-hidden shadow-[0_0_120px_rgba(232,154,77,0.3),0_0_180px_rgba(168,212,168,0.2),0_0_240px_rgba(44,74,95,0.25),0_0_300px_rgba(232,154,77,0.15)] hover:shadow-[0_0_140px_rgba(232,154,77,0.4),0_0_200px_rgba(168,212,168,0.3),0_0_260px_rgba(44,74,95,0.35),0_0_320px_rgba(232,154,77,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              3D-Visualisierung buchen
            </span>
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>

          {/* Secondary Button - Bad Sanierung anfragen - Subtiler */}
          <button
            onClick={scrollToKontakt}
            className="group relative px-10 py-5 rounded-full font-outfit text-base md:text-lg font-light text-white/70 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:text-white/90 hover:border-white/30 transition-all duration-300 w-full sm:w-auto"
          >
            Bad Sanierung anfragen
          </button>
        </motion.div>

        {/* Compact Image Comparison - Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 md:gap-6 mb-10"
        >
          {/* 3D Visualization - Compact */}
          <div className="relative group w-[140px] sm:w-[185px] md:w-[228px]">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1650894622072-1596836c2ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMGJhdGhyb29tJTIwdmlzdWFsaXphdGlvbiUyMHJlbmRlcnxlbnwxfHx8fDE3NzIxOTc4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="3D Visualisierung"
                className="w-full h-[110px] sm:h-[143px] md:h-[166px] object-cover contrast-[1.05]"
              />
              <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2">
                <p className="font-outfit text-xs font-semibold text-[#2c4a5f] text-center">3D-Planung</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-7 h-7 md:w-9 md:h-9 text-[#e89a4d] flex-shrink-0 opacity-90" strokeWidth={2.5} />

          {/* Real Photo - Compact */}
          <div className="relative group w-[135px] sm:w-[180px] md:w-[220px]">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763485956070-431fca7bc030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBiYXRocm9vbSUyMGNvbXBsZXRlZCUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcyMTk3ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Realisiertes Bad"
                className="w-full h-[107px] sm:h-[140px] md:h-[160px] object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2">
                <p className="font-outfit text-xs font-semibold text-[#2c4a5f] text-center">Realisiert</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="font-outfit text-sm text-white/60 font-light">
            ✓ Kostenlose Erstberatung · ✓ Unverbindliches Angebot · ✓ 100% Planungssicherheit
          </p>
        </motion.div>
      </div>
    </section>
  );
}
