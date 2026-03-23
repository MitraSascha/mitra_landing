import { motion } from 'motion/react';
import bathroomImage from '../../assets/bf612d230980b013bdedbacb879f662742e9e5d1.png';

export function BathroomImageSection() {
  return (
    <section className="relative min-h-screen bg-[#FAF9F6] flex items-center justify-center py-6 md:py-10">
      {/* Naturstein-Textur für Spa-Feeling */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{ 
          backgroundImage: 'url(#stoneTexture)',
          backgroundSize: '600px 600px'
        }}
      />
      
      {/* Dezente Marmor-Adern */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: 'url(#marbleTexture)',
          backgroundSize: '800px 800px'
        }}
      />

      <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 w-full">
        {/* Bathroom Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[3rem] overflow-hidden shadow-2xl relative w-full aspect-square max-w-4xl mx-auto"
        >
          <img 
            src={bathroomImage} 
            alt="Modernes, edles Luxus-Badezimmer"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center 40%'
            }}
          />
          {/* Subtle overlay for better integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Text Overlay - Integrated in Image */}
          <div className="absolute top-16 md:top-24 lg:top-32 left-8 md:left-12 right-8 md:right-12 lg:right-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f] rounded-full" />
              <p className="font-outfit text-2xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-[1.1] pl-8 drop-shadow-2xl">
                Weil Bad-Design nicht nur für Hotels reserviert ist.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}