import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import bathroomImg from '../../assets/Drop farbe.png';
import bgFrame from '../../assets/Frame 7.1.png';
import element9 from '../../assets/Element 9.svg';

const quoteWords = '"Wow, seit wann habt ihr so ein krasses Bad!"'.split(' ');

export function SocialMomentSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });

  const sublineOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const sublineScale = useTransform(scrollYProgress, [0.15, 0.6], [0.3, 1]);
  const sublineY = useTransform(scrollYProgress, [0.15, 0.6], [100, 0]);

  return (
    <>
      {/* Quote Section — pinned scroll */}
      <div ref={pinRef} className="relative h-[280vh] md:h-[300vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden relative"
          style={{ backgroundImage: `url(${bgFrame})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Quote — direkt über der Shape positioniert */}
          <div className="absolute left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24"
               style={{ bottom: 'calc(44vh + 1.5rem)' }}>
            <motion.blockquote
              className="font-outfit text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight tracking-tight italic drop-shadow-lg"
            >
              {quoteWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.blockquote>
          </div>

          {/* Shape + Subline — dauerhaft am unteren Rand */}
          <div className="absolute bottom-0 left-0 right-0 h-[44vh] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Element 9.svg Shape — immer sichtbar */}
              <img
                src={element9}
                alt=""
                className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom"
              />
              {/* Subline — Endposition im grünen Bereich der Shape (untere ~38%) */}
              <motion.p
                style={{ opacity: sublineOpacity, scale: sublineScale, y: sublineY }}
                className="absolute bottom-[12%] left-6 right-6 md:left-16 md:right-16 z-10 font-outfit text-lg sm:text-xl md:text-3xl lg:text-4xl text-[#2c4a5f] font-semibold leading-tight tracking-tight text-center"
              >
                Der einzige Moment, den Du nicht mit uns planst, aber garantiert bekommst!
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Drop Logo Section */}
      <section className="relative pt-10 pb-0 md:pt-4 md:pb-0 lg:pt-4 lg:pb-0 overflow-hidden">

        {/* Tablet + Desktop: Bild direkt an Section (full-width), links = Viewport-Rand */}
        <img
          src={bathroomImg}
          alt="Mitra Drop Logo"
          className="hidden md:block absolute bottom-0 left-0 w-[60%] lg:w-[38vw] object-contain"
        />

        <div className="max-w-7xl md:mx-auto md:pr-16 lg:pr-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            {/* Mobile: Text oben, Bild darunter */}
            <div className="md:hidden flex flex-col items-start">
              <p className="font-outfit text-4xl sm:text-5xl font-bold tracking-tight leading-[1.15] text-[#2c4a5f] text-left px-6 pt-10 pb-8">
                Weil Bad-Design<br />nicht nur für Hotels<br />reserviert ist.
              </p>
              <img
                src={bathroomImg}
                alt="Mitra Drop Logo"
                className="w-full object-contain"
              />
            </div>

            {/* Tablet + Desktop: Bild links, Text rechts zentriert */}
            <div className="hidden md:flex items-center min-h-[520px] lg:min-h-[640px]">
              <div className="ml-auto w-1/2 lg:w-[45%] flex items-center justify-center pr-8 lg:pr-0">
                <p className="font-outfit text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-[#2c4a5f]">
                  Weil Bad-Design<br />nicht nur für Hotels<br />reserviert ist.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
