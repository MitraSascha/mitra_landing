import { motion } from 'motion/react';
import { Bath } from 'lucide-react';

const quoteWords = '"Wow, seit wann habt ihr so ein krasses Bad!"'.split(' ');

export function SocialMomentSection() {
  return (
    <>
      {/* Quote Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] px-8 md:px-16 lg:px-24 overflow-hidden bg-[#a8d4a8] flex items-center justify-center">
        <div className="w-full">
          <div className="text-center space-y-10 md:space-y-16 lg:space-y-24">

            {/* Quote + Citation — word-by-word stagger reveal */}
            <div className="space-y-3">
              <blockquote className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight tracking-tight">
                {quoteWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </blockquote>
              <motion.cite
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: quoteWords.length * 0.07 + 0.1, ease: 'easeOut' }}
                className="font-outfit text-lg md:text-xl text-white/90 not-italic font-light block"
              >
                — deine Freunde
              </motion.cite>
            </div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="font-outfit text-lg md:text-xl lg:text-2xl text-[#2c4a5f] italic font-light"
            >
              Der einzige Moment, den Du nicht mit uns planst, aber garantiert bekommst!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="relative py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
            {/* Left Side - 2/3 with Content */}
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8 flex flex-col justify-center h-full"
              >
                <p className="font-outfit text-lg md:text-xl lg:text-2xl text-[#6B6B6B] leading-relaxed font-light">
                  Der einzige Moment, den Du nicht mit uns planst, aber garantiert bekommst!
                </p>

                {/* Statement with animated gradient line */}
                <div className="relative pl-8">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ originY: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full"
                  />
                  <p className="font-outfit text-2xl md:text-3xl lg:text-5xl text-[#2c4a5f] font-bold tracking-tight leading-[1.1]">
                    Weil Bad-Design nicht nur für Hotels reserviert ist.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - 1/3 with image and icon */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl p-8 md:p-12 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1766371900913-1f9fee835af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3RlbCUyMGJhdGhyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MjE4Nzc0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-[#e89a4d]/70"></div>
              <Bath className="relative z-10 w-20 h-20 md:w-32 md:h-32 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
