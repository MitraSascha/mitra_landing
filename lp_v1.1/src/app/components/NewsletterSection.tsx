import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24 bg-[#e89a4d]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-outfit text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Deine Vision noch nicht klar genug?
          </h2>
          <p className="font-outfit text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Dann sorg dafür, dass sie Form annimmt. Wir schicken dir echte Bäder, echte Ideen, echte Möglichkeiten.
          </p>

          {submitted ? (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl px-8 py-6 shadow-sm border border-[#a8d4a8]/40">
                <p className="font-outfit text-lg font-semibold text-[#2c4a5f] flex items-center justify-center gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#a8d4a8] text-white text-sm font-bold flex-shrink-0">
                    ✓
                  </span>
                  Du bist dabei! Wir melden uns bald.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2c4a5f]/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Deine E-Mail-Adresse"
                    required
                    className="w-full pl-16 pr-6 py-5 rounded-full border-2 border-white/20 bg-white text-[#2c4a5f] placeholder:text-[#2c4a5f]/40 focus:outline-none focus:border-white transition-all duration-300 shadow-sm font-outfit"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-12 py-5 bg-[#2c4a5f] text-white rounded-full font-outfit font-semibold hover:bg-[#1e3240] transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Anmelden
                </motion.button>
              </div>
            </form>
          )}

          <p className="font-outfit text-sm text-white/60 mt-6">
            Datenschutzhinweis: Mit der Anmeldung stimmst du unserer{' '}
            <a href="#" className="underline underline-offset-2 hover:text-white/80 transition-colors">
              Datenschutzerklärung
            </a>{' '}
            zu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
