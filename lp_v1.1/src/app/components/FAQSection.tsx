import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Was kostet eine Badsanierung?',
    answer:
      'Jedes Bad ist einzigartig – und damit auch der Preis. Mit unserer kostenlosen 3D-Visualisierung und einem verbindlichen Angebot weißt du von Anfang an, was dein Traumbad kostet. Keine versteckten Kosten, keine bösen Überraschungen.',
  },
  {
    question: 'Wie lange dauert eine Sanierung?',
    answer:
      'Mit unserem klaren Ablaufplan und Terminplan weißt du genau, wann dein neues Bad fertig ist. Der genaue Zeitraum hängt von Umfang und Ausstattung ab – das klären wir gemeinsam in der ersten Beratung.',
  },
  {
    question: 'Kann ich meinen Geschmack wirklich einbringen?',
    answer:
      'Ja – dein Geschmack ist der Ausgangspunkt. Unsere 3D-Visualisierung zeigt dir schon vor dem ersten Handgriff, wie dein Bad aussehen wird. Du entscheidest, wir setzen um.',
  },
  {
    question: 'Bleibt mein Zuhause während der Sanierung sauber?',
    answer:
      'Das ist uns besonders wichtig. Wir arbeiten ordentlich und hinterlassen dein Zuhause so, wie wir es vorgefunden haben – oder besser.',
  },
  {
    question: 'Was ist der erste Schritt?',
    answer:
      'Ein kostenloses, unverbindliches Erstgespräch. Buche einen Termin oder fülle das Kontaktformular aus.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-20 px-6 md:py-32 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-outfit text-4xl md:text-5xl font-bold text-[#2c4a5f] mb-3 tracking-tight leading-tight">
            Häufige Fragen
          </h2>
          <p className="font-outfit text-base text-[#6B6B6B]">
            Alles, was du vor deiner Badsanierung wissen möchtest.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="divide-y divide-[#2c4a5f]/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left min-h-[48px] group"
                >
                  <span className="font-outfit text-base md:text-lg font-semibold text-[#2c4a5f] group-hover:text-[#e89a4d] transition-colors duration-200 leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0 text-[#e89a4d]"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-outfit text-base text-[#6B6B6B] leading-relaxed pb-6 pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
