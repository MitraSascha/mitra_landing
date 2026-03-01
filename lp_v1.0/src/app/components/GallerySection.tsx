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
        text: '„Wir hätten nie gedacht, wie persönlich ein Bad werden kann. Bei Mitra konnten wir alles mitgestalten – und genau das sieht man jeden Tag. Es fühlt sich einfach richtig an.\"'
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
    <section id="galerie" className="relative py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="font-outfit italic text-5xl md:text-7xl font-bold text-[#2c4a5f] mb-1 tracking-tight leading-tight">
              Die Künstler dieser Bäder?
            </h2>
            <p className="font-cormorant font-bold text-[#e89a4d] mb-10 text-[40px]">
              Unsere Kunden.
            </p>
            <div className="max-w-3xl mx-auto p-8 mb-16 bg-white rounded-2xl shadow-sm">
              <p className="font-outfit text-xl text-[#6B6B6B] leading-relaxed font-light">
                Alles was du hier siehst sind echte Mitra-Bäder - von unseren Kunden individuell gestaltet.
              </p>
            </div>
            <p className="font-outfit text-2xl md:text-3xl text-[#2c4a5f] font-semibold flex items-center justify-center gap-3">
              <Lightbulb className="w-8 h-8 text-[#a8d4a8]" />
              Du hast die Vision. Wir das Werkzeug.
              <Wrench className="w-8 h-8 text-[#e89a4d]" />
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            {bathrooms.map((bathroom, index) => (
              <div key={bathroom.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[3/4] rounded-[3rem] overflow-visible shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)] transition-all duration-500 cursor-pointer group"
                  onMouseEnter={() => setHoveredId(bathroom.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-white">
                    <img
                      src={bathroom.src}
                      alt={bathroom.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Testimonial Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                      opacity: hoveredId === bathroom.id ? 1 : 0,
                      scale: hoveredId === bathroom.id ? 1 : 0.8,
                      y: hoveredId === bathroom.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.4)] p-8 max-w-[90%] pointer-events-none z-10 border-2 border-[#2c4a5f]"
                  >
                    {/* Tail */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 border-r-2 border-b-2 border-[#2c4a5f]"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <p className="font-outfit font-bold text-[#2c4a5f] mb-3 text-lg">{bathroom.testimonial.name}</p>
                      <p className="font-outfit text-[#2c4a5f] text-sm md:text-base leading-relaxed italic">{bathroom.testimonial.text}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}