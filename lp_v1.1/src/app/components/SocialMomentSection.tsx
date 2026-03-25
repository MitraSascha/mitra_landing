import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import bathroomImg from '../../assets/Drop farbe.png';

const quoteWords = '"Wow, seit wann habt ihr so ein krasses Bad!"'.split(' ');

export function SocialMomentSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });

  const quoteY = useTransform(scrollYProgress, [0.15, 0.6], [0, -120]);
  const sublineOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const sublineScale = useTransform(scrollYProgress, [0.15, 0.6], [0.3, 1]);
  const sublineY = useTransform(scrollYProgress, [0.15, 0.6], [100, 0]);

  return (
    <>
      {/* Quote Section — pinned scroll */}
      <div ref={pinRef} className="relative h-[280vh] md:h-[300vh]">
        <div className="sticky top-0 h-screen bg-[#a8d4a8] flex items-center justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
          <div className="w-full">

            {/* Crossfade-Container */}
            <div className="relative flex items-center min-h-[220px] sm:min-h-[280px] md:min-h-[360px] text-left">
              {/* Quote */}
              <motion.blockquote
                style={{ y: quoteY }}
                className="font-outfit text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight tracking-tight italic"
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

              {/* Subline */}
              <motion.p
                style={{ opacity: sublineOpacity, scale: sublineScale, y: sublineY }}
                className="absolute inset-0 flex items-center justify-start font-outfit text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#2c4a5f] font-normal leading-tight tracking-tight"
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

            {/* Mobile: Bild unten links */}
            <div className="md:hidden relative min-h-[420px] overflow-hidden">
              <img
                src={bathroomImg}
                alt="Mitra Drop Logo"
                className="absolute bottom-0 left-0 w-[100%] object-contain"
              />
              {/* Text oben rechts */}
              <div className="absolute top-4 right-[67px] w-[52%]">
                <div className="relative pl-4">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ originY: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full"
                  />
                  <p className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight leading-[1.2] text-[#2c4a5f]">
                    Weil Bad-Design<br />nicht nur für Hotels<br />reserviert ist.
                  </p>
                </div>
              </div>
            </div>

            {/* Tablet + Desktop: Text oben rechts */}
            <div className="hidden md:block relative min-h-[520px] lg:min-h-[640px]">
              <div className="absolute top-8 right-[25%] w-[42%] lg:w-[38%]">
                <div className="relative pl-6">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ originY: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full"
                  />
                  <p className="font-outfit text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.2] text-[#2c4a5f]">
                    Weil Bad-Design<br />nicht nur für Hotels<br />reserviert ist.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
