import { motion } from 'motion/react';
import { Lightbulb, Wrench } from 'lucide-react';
import bathroom2 from '../../assets/180c6725224b4ff010857f6e57d5a36e02dcd9fb.png';
import bathroom3 from '../../assets/6e5e48b78529ab62fb70c015e8c0b362564e3084.png';
import bathroom4 from '../../assets/9686a8671b3cef3e3d9557dfeba0a75a840f3a11.png';
import { useState } from 'react';

export function GallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const bathrooms = [
    { 
      id: 1, 
      src: 'https://images.unsplash.com/photo-1758548157466-7c454382035a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBiYXRocm9vbSUyMHdoaXRlJTIwYmF0aHR1YnxlbnwxfHx8fDE3NzIxODc0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      alt: 'Modernes Badezimmer mit freistehender weißer Badewanne',
      testimonial: {
        name: 'Julia M., 38',
        text: '„Wir hätten nie gedacht, wie persönlich ein Bad werden kann. Bei Mitra konnten wir alles mitgestalten – und genau das sieht man jeden Tag. Es fühlt sich einfach richtig an.\\"'
      }
    },
    { 
      id: 2, 
      src: bathroom2, 
      alt: 'Elegantes dunkles Badezimmer mit Designer-Beleuchtung',
      testimonial: {
        name: 'Thomas K., 45',
        text: '„Von der ersten Idee bis zum fertigen Bad war alles durchdacht. Besonders die gemeinsame Konzeption hat uns überzeugt – unser Bad sieht nicht aus wie von der Stange, sondern wie für uns gemacht."'
      }
    },
    { 
      id: 3, 
      src: bathroom3, 
      alt: 'Minimalistisches Badezimmer mit warmer Beleuchtung',
      testimonial: {
        name: 'Anna & Felix R., 34',
        text: '„Wir hatten viele Ideen, aber keinen klaren Plan. Mitra hat daraus ein Design entwickelt, das perfekt zu uns passt. Dieses Bad ist unser Lieblingsraum geworden."'
      }
    },
    { 
      id: 4, 
      src: bathroom4, 
      alt: 'Luxus-Badezimmer mit freistehender Badewanne',
      testimonial: {
        name: 'Sabine L., 52',
        text: '„Dass wir so viel Einfluss auf Gestaltung und Details nehmen konnten, hat den Unterschied gemacht. Das Ergebnis ist ein Bad, das unsere Persönlichkeit widerspiegelt – und uns jeden Tag begeistert."'
      }
    },
  ];

  return (
    <section id="galerie" className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#FAF9F6] overflow-hidden">
      {/* Naturstein-Textur Overlay */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
        style={{ 
          backgroundImage: 'url(#stoneTexture)',
          backgroundSize: '600px 600px'
        }}
      />
      
      {/* Organische Wasser-Flows */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: 'url(#waterFlow)',
          backgroundSize: '1000px 1000px'
        }}
      />
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h2 className="font-outfit text-4xl md:text-5xl lg:text-7xl font-black text-[#2c4a5f] tracking-tighter mb-6">
          Inspiration für dein
          <span className="block text-[#e89a4d] italic">Traumbad</span>
        </h2>
        <p className="font-outfit text-lg md:text-xl text-[#2c4a5f]/70 font-medium leading-relaxed">
          Echte Projekte. Echte Menschen. Echte Begeisterung.
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {bathrooms.map((bathroom, index) => (
          <motion.div
            key={bathroom.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            onMouseEnter={() => setHoveredId(bathroom.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#2c4a5f]/10 bg-white">
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={bathroom.src}
                  alt={bathroom.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Testimonial Overlay - Enhanced Glassmorphism */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredId === bathroom.id ? 1 : 0,
                  y: hoveredId === bathroom.id ? 0 : 20,
                }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 bg-gradient-to-t from-[#2c4a5f]/95 via-[#2c4a5f]/80 to-transparent backdrop-blur-md flex items-end p-8"
                style={{ pointerEvents: hoveredId === bathroom.id ? 'auto' : 'none' }}
              >
                <div>
                  <p className="font-outfit text-base md:text-lg text-white/90 leading-relaxed mb-4 italic">
                    {bathroom.testimonial.text}
                  </p>
                  <p className="font-outfit text-sm font-semibold text-[#e89a4d] tracking-wide">
                    — {bathroom.testimonial.name}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vision & Werkzeug Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto text-center mt-24"
      >
        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center justify-center gap-3">
            <Lightbulb className="w-8 h-8 text-[#e89a4d]" strokeWidth={2} />
            <span className="font-outfit text-2xl font-bold text-[#2c4a5f] tracking-tight">
              Du hast die Vision.
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-outfit text-2xl font-bold text-[#2c4a5f] tracking-tight">
              Wir das Werkzeug.
            </span>
            <Wrench className="w-8 h-8 text-[#e89a4d]" strokeWidth={2} />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-[#e89a4d]" strokeWidth={2} />
            <span className="font-outfit text-3xl lg:text-4xl font-bold text-[#2c4a5f] tracking-tight">
              Du hast die Vision.
            </span>
          </div>
          <span className="font-outfit text-3xl lg:text-4xl font-bold text-[#2c4a5f] tracking-tight">
            Wir das Werkzeug.
          </span>
          <Wrench className="w-8 h-8 text-[#e89a4d]" strokeWidth={2} />
        </div>
      </motion.div>
    </section>
  );
}