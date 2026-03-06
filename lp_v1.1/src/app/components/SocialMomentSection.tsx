import { motion } from 'motion/react';
import { Bath } from 'lucide-react';

export function SocialMomentSection() {
  return (
    <>
      {/* Door Animation Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] px-8 md:px-16 lg:px-24 overflow-hidden bg-[#a8d4a8] flex items-center justify-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-24"
          >
            {/* Quote + Citation */}
            <div className="space-y-1">
              <blockquote className="font-outfit text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight tracking-tight whitespace-nowrap">
                "Wow, seit wann habt ihr so ein krasses Bad!"
              </blockquote>
              <cite className="font-outfit text-lg md:text-xl text-white/90 not-italic font-light">
                — deine Freunde
              </cite>
            </div>

            {/* Subline */}
            <p className="font-outfit text-lg md:text-xl lg:text-2xl text-[#2c4a5f] italic font-light">
              Der einzige Moment, den Du nicht mit uns planst, aber garantiert bekommst!
            </p>
          </motion.div>
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
                {/* "Der einzige Moment..." Text */}
                <p className="font-outfit text-lg md:text-xl lg:text-2xl text-[#6B6B6B] leading-relaxed font-light">
                  Der einzige Moment, den Du nicht mit uns planst, aber garantiert bekommst!
                </p>

                {/* "Weil Bad-Design..." Statement */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full" />
                  <p className="font-outfit text-3xl md:text-4xl lg:text-5xl text-[#2c4a5f] font-bold tracking-tight leading-[1.1] pl-8">
                    Weil Bad-Design nicht nur für Hotels reserviert ist.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - 1/3 with Corporate Background and Icon */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl p-12 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1766371900913-1f9fee835af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3RlbCUyMGJhdGhyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MjE4Nzc0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Transparente orange Overlay-Schicht */}
              <div className="absolute inset-0 bg-[#e89a4d]/70"></div>
              
              {/* Icon */}
              <Bath className="relative z-10 w-32 h-32 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}