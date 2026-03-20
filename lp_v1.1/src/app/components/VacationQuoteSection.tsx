import { motion } from 'motion/react';
import vacationImg from '../../assets/b25dd357f77660bdc50b9552fac30c25464da467.png';

export function VacationQuoteSection() {
  return (
    <section className="relative py-20 md:py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* Left Side — Bild */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0 round 1.5rem)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0 0 0% 0 round 1.5rem)', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl overflow-hidden mb-8 lg:mb-0 aspect-square"
          >
            <img
              src={vacationImg}
              alt="Badezimmer Erholungsort"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Side — text content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 flex flex-col justify-center h-full"
            >
              {/* Heading + Body neben dem Balken */}
              <div className="relative pl-8">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ originY: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full"
                />
                <p className="font-outfit text-2xl md:text-3xl lg:text-5xl text-[#2c4a5f] font-bold tracking-tight leading-[1.1] mb-4">
                  Weil du nie genug Urlaubstage haben kannst!
                </p>
                <p className="font-outfit text-base md:text-lg lg:text-xl text-[#6B6B6B] leading-relaxed font-light">
                  Wenn du schon so viel Zeit im Bad verbringst, dann hol dir das Urlaubsgefühl nach Hause und verwandle dein Bad in deinen individuell gestalteten Erholungsort.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
