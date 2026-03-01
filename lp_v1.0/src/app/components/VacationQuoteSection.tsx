import { motion } from 'motion/react';
import { Umbrella } from 'lucide-react';

export function VacationQuoteSection() {
  return (
    <section className="relative py-20 md:py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
          {/* Left Side - 1/3 with Corporate Background and Icon */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-12 flex items-center justify-center mb-8 lg:mb-0 overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1653823478413-0c4617d0c406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHNwYSUyMGJhdGhyb29tJTIwcmVzb3J0JTIwdmFjYXRpb258ZW58MXx8fHwxNzcyMTg3NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Transparente blaue Overlay-Schicht */}
            <div className="absolute inset-0 bg-[#2c4a5f]/70"></div>
            
            {/* Icon */}
            <Umbrella className="relative z-10 w-32 h-32 text-[#a8d4a8]" strokeWidth={1.5} />
          </motion.div>

          {/* Right Side - 2/3 with Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 flex flex-col justify-center h-full"
            >
              {/* Main Text */}
              <p className="font-outfit text-lg md:text-xl lg:text-2xl text-[#6B6B6B] leading-relaxed font-light">
                Wenn du schon so viel Zeit im Bad verbringst, dann hol dir das Urlaubsgefühl nach Hause und verwandle dein Bad in deinen individuell gestalteten Erholungsort.
              </p>

              {/* Emphasized Statement */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full" />
                <p className="font-outfit text-3xl md:text-4xl lg:text-5xl text-[#2c4a5f] font-bold tracking-tight leading-[1.1] pl-8">
                  Weil du nie genug Urlaubstage haben kannst!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}