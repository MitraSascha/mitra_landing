import { motion } from 'motion/react';
import { Box, FileCheck, Calendar, Sparkles } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: <Box className="w-10 h-10" />,
      title: '3D-Visualisierung',
      text: 'Durch unsere 3D-Visualisierung siehst du was möglich ist und bekommst einen realistischen Vorgeschmack auf dein neues Mitra-Bad.',
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: 'Verbindliches Angebot',
      text: 'Durch ein verbindliches Angebot stellst Du sicher, dass der Preis von Anfang an klar ist.',
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: 'Klarer Ablaufplan',
      text: 'Durch einen klaren Ablauf- und Terminplan stellen wir gemeinsam sicher, dass du genau weißt wann dein neues Bad fertig ist.',
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: 'Saubere Arbeit',
      text: '... und keine Sorge deine zu Hause bleibt sauber.',
    },
  ];

  return (
    <section id="prozess" className="relative py-16 md:py-24 lg:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#2c4a5f] mb-4 tracking-tight leading-tight">
            Wie entsteht so ein Bad?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [grid-auto-rows:1fr]">
          {steps.map((step, index) => (
            <div className="relative h-full" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-6 md:p-10 h-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-[transform,box-shadow] duration-200 border border-[#2c4a5f]/10 will-change-transform"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#e89a4d] to-[#d68938] text-white rounded-2xl flex items-center justify-center shadow-md"
                  >
                    <span className="absolute top-2 left-2 font-outfit text-xs font-bold text-white/80 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step.icon}
                  </motion.div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-outfit text-2xl font-bold text-[#2c4a5f] mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-outfit text-lg text-[#6B6B6B] leading-relaxed font-light">
                      {step.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
