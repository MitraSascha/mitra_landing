import { motion } from 'motion/react';
import { Lightbulb, Wrench } from 'lucide-react';
import bathroom2 from '../../assets/180c6725224b4ff010857f6e57d5a36e02dcd9fb.png';
import bathroom3 from '../../assets/6e5e48b78529ab62fb70c015e8c0b362564e3084.png';
import bathroom4 from '../../assets/9686a8671b3cef3e3d9557dfeba0a75a840f3a11.png';
import { useState, useRef, useEffect, useCallback } from 'react';

interface Bathroom {
  id: number;
  src: string;
  alt: string;
  testimonial: {
    name: string;
    text: string;
  };
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const bathrooms: Bathroom[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1758548157466-7c454382035a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBiYXRocm9vbSUyMHdoaXRlJTIwYmF0aHR1YnxlbnwxfHx8fDE3NzIxODc0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Modernes Badezimmer mit freistehender weißer Badewanne',
      testimonial: {
        name: 'Julia M., 38',
        text: '„Wir hätten nie gedacht, wie persönlich ein Bad werden kann. Bei Mitra konnten wir alles mitgestalten – und genau das sieht man jeden Tag. Es fühlt sich einfach richtig an."',
      },
    },
    {
      id: 2,
      src: bathroom2,
      alt: 'Elegantes dunkles Badezimmer mit Designer-Beleuchtung',
      testimonial: {
        name: 'Thomas K., 45',
        text: '„Von der ersten Idee bis zum fertigen Bad war alles durchdacht. Besonders die gemeinsame Konzeption hat uns überzeugt – unser Bad sieht nicht aus wie von der Stange, sondern wie für uns gemacht."',
      },
    },
    {
      id: 3,
      src: bathroom3,
      alt: 'Minimalistisches Badezimmer mit warmer Beleuchtung',
      testimonial: {
        name: 'Anna & Felix R., 34',
        text: '„Wir hatten viele Ideen, aber keinen klaren Plan. Mitra hat daraus ein Design entwickelt, das perfekt zu uns passt. Dieses Bad ist unser Lieblingsraum geworden."',
      },
    },
    {
      id: 4,
      src: bathroom4,
      alt: 'Luxus-Badezimmer mit freistehender Badewanne',
      testimonial: {
        name: 'Sabine L., 52',
        text: '„Dass wir so viel Einfluss auf Gestaltung und Details nehmen konnten, hat den Unterschied gemacht. Das Ergebnis ist ein Bad, das unsere Persönlichkeit widerspiegelt – und uns jeden Tag begeistert."',
      },
    },
  ];

  // IntersectionObserver for dot indicators on mobile
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: carouselRef.current,
      threshold: 0.6,
    });

    const currentCards = cardRefs.current;
    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [handleIntersection]);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card && carouselRef.current) {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <section id="galerie" className="relative py-16 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-10 px-6 md:px-16 lg:px-24"
        >
          <h2 className="font-outfit italic text-4xl md:text-5xl lg:text-7xl font-bold text-[#2c4a5f] mb-1 tracking-tight leading-tight">
            Die Künstler dieser Bäder?
          </h2>
          <p className="font-cormorant font-bold text-[#e89a4d] mb-8 md:mb-10 text-3xl md:text-[40px]">
            Unsere Kunden.
          </p>
          <div className="max-w-3xl mx-auto p-6 md:p-8 mb-8 md:mb-16 bg-white rounded-2xl shadow-sm">
            <p className="font-outfit text-base md:text-xl text-[#6B6B6B] leading-relaxed font-light">
              Alles was du hier siehst sind echte Mitra-Bäder - von unseren Kunden individuell gestaltet.
            </p>
          </div>
          <p className="font-outfit text-xl md:text-2xl lg:text-3xl text-[#2c4a5f] font-semibold flex items-center justify-center gap-3">
            <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-[#a8d4a8]" />
            Du hast die Vision. Wir das Werkzeug.
            <Wrench className="w-6 h-6 md:w-8 md:h-8 text-[#e89a4d]" />
          </p>
        </motion.div>

        {/* ── MOBILE: Horizontal Scroll Carousel ── */}
        <div className="md:hidden">
          {/* Scrollable track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 px-[7.5vw]"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {bathrooms.map((bathroom, index) => (
              <div
                key={bathroom.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="flex-none"
                style={{
                  width: '85vw',
                  scrollSnapAlign: 'center',
                }}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(0,0,0,0.15)]"
                >
                  <img
                    src={bathroom.src}
                    alt={bathroom.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? undefined : 'lazy'}
                  />
                </motion.div>

                {/* Testimonial Card — always visible on mobile */}
                <div className="mt-4 bg-white rounded-2xl shadow-sm border border-white/60 px-5 py-4">
                  <p className="font-outfit font-bold text-[#2c4a5f] text-sm mb-2">
                    {bathroom.testimonial.name}
                  </p>
                  <p className="font-outfit text-[#6B6B6B] text-sm leading-relaxed italic">
                    {bathroom.testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {bathrooms.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                aria-label={`Gehe zu Bild ${index + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: activeIndex === index ? '24px' : '8px',
                  height: '8px',
                  backgroundColor:
                    activeIndex === index ? '#e89a4d' : '#a8d4a8',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 2×2 Grid with hover overlay ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 px-8 md:px-16 lg:px-24">
          {bathrooms.map((bathroom, index) => (
            <div key={bathroom.id} className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)] transition-shadow duration-150 cursor-pointer group"
              >
                {/* Image with blur on hover */}
                <img
                  src={bathroom.src}
                  alt={bathroom.alt}
                  className="w-full h-full object-cover transition-all duration-150 group-hover:blur-sm group-hover:scale-105"
                  loading={index === 0 ? undefined : 'lazy'}
                />

                {/* Testimonial Overlay — fades in on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-outfit font-bold text-white mb-3 text-lg text-center">
                    {bathroom.testimonial.name}
                  </p>
                  <p className="font-outfit text-white/90 text-sm leading-relaxed italic text-center">
                    {bathroom.testimonial.text}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
