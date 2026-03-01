import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontakt" className="py-16 px-8 md:px-16 lg:px-24 bg-[#2c4a5f] text-white/70">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Spalte 1: Logo & Info */}
          <div>
            <p className="font-outfit text-white text-xl font-bold tracking-wide mb-3">
              MITRA
            </p>
            <p className="font-outfit text-sm leading-relaxed mb-4">
              Sanitär & Heizung. Wir verwandeln dein Bad in ein Wohlfühl-Erlebnis — von der Planung bis zur Übergabe.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <ShieldCheck className="w-4 h-4 text-[#a8d4a8] flex-shrink-0" />
              <span className="font-outfit text-xs text-white/80">Zertifizierter Sanitärfachbetrieb</span>
            </div>
          </div>

          {/* Spalte 2: Navigation */}
          <div>
            <p className="font-outfit text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-3 text-sm">
              <a href="#prozess" className="font-outfit hover:text-white transition-colors">Unser Prozess</a>
              <a href="#" className="font-outfit hover:text-white transition-colors">Referenzen</a>
              <a href="#" className="font-outfit hover:text-white transition-colors">Impressum</a>
              <a href="#" className="font-outfit hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="font-outfit hover:text-white transition-colors">AGB</a>
            </nav>
          </div>

          {/* Spalte 3: Kontakt */}
          <div>
            <p className="font-outfit text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Kontakt
            </p>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e89a4d] flex-shrink-0 mt-0.5" />
                <span className="font-outfit leading-relaxed">Musterstraße 12<br />12345 Musterstadt</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e89a4d] flex-shrink-0" />
                <a
                  href="tel:+49123456789"
                  className="font-outfit hover:text-white transition-colors"
                >
                  +49 (0) 123 456789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e89a4d] flex-shrink-0" />
                <a
                  href="mailto:info@mitra-bad.de"
                  className="font-outfit hover:text-white transition-colors"
                >
                  info@mitra-bad.de
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-outfit text-sm tracking-wide">
            © 2026 MITRA Sanitär & Heizung. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
