import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontakt" className="bg-[#0d1b24] text-white/60">
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Spalte 1: Firma & Beschreibung */}
          <div>
            <p className="font-outfit text-[#e89a4d] text-xl font-bold mb-4">
              Mitra Sanitär GmbH
            </p>
            <p className="font-outfit text-sm leading-relaxed">
              Ihr Partner für moderne Sanitär- und Heizungstechnik. Tradition trifft Innovation.
            </p>
          </div>

          {/* Spalte 2: Kontakt */}
          <div>
            <p className="font-outfit text-[#e89a4d] text-xl font-bold mb-4">
              Kontakt
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e89a4d] flex-shrink-0 mt-0.5" />
                <span className="font-outfit">Borussiastraße 62a, 12103 Berlin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e89a4d] flex-shrink-0" />
                <a href="tel:03076008921" className="font-outfit hover:text-white transition-colors">
                  030 760 089 21
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e89a4d] flex-shrink-0" />
                <a href="mailto:hey@mitra-sanitaer.de" className="font-outfit hover:text-white transition-colors">
                  hey@mitra-sanitaer.de
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Quick Links */}
          <div>
            <p className="font-outfit text-[#e89a4d] text-xl font-bold mb-4">
              Quick Links
            </p>
            <nav className="flex flex-col gap-3 text-sm">
              <a href="#bad-quiz" className="font-outfit hover:text-white transition-colors">Bad-Quiz</a>
              <a href="#galerie" className="font-outfit hover:text-white transition-colors">Galerie</a>
              <a href="#prozess" className="font-outfit hover:text-white transition-colors">Prozess</a>
              <a href="#kontakt" className="font-outfit hover:text-white transition-colors">Kontakt</a>
            </nav>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-outfit text-sm">
            © 2026 Mitra Sanitär GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
