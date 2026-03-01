export function Footer() {
  return (
    <footer className="py-16 px-8 md:px-16 lg:px-24 bg-[#2c4a5f] text-white/70">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-outfit text-sm tracking-wide mb-2">
            © 2026 MITRA Sanitär & Heizung. Alle Rechte vorbehalten.
          </p>
        </div>
        
        <div className="flex justify-center gap-8 text-sm">
          <a href="#" className="font-outfit hover:text-white transition-colors">Impressum</a>
          <a href="#" className="font-outfit hover:text-white transition-colors">Datenschutz</a>
          <a href="#" className="font-outfit hover:text-white transition-colors">AGB</a>
          <a href="#" className="font-outfit hover:text-white transition-colors">Kontakt</a>
        </div>
      </div>
    </footer>
  );
}