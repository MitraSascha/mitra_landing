# Analyse & Änderungsvorschläge — lp_v1.1

> Basis: `lp_v1.1` (Stand: März 2026)
> Referenz (nur lesen): `lp_v1.0`
> Constraint: Keine Font-, Text- oder Farbänderungen. Nur Farb-Kombinationen variieren.

---

## 1. SEO — Kritisch

| # | Problem | Datei | Empfehlung |
|---|---------|-------|------------|
| 1.1 | `<title>` ist Platzhalter: *„Landingpage mit Quizsektion (Kopie)"* | `index.html:7` | Aussagekräftiger Titel, z. B. `MITRA – Dein Traumbad. Individuell geplant.` |
| 1.2 | Kein `<meta name="description">` | `index.html` | Kurze Beschreibung (ca. 155 Zeichen) mit Keywords (Badezimmer, Sanierung, 3D-Planung) |
| 1.3 | `lang="en"`, Inhalt ist Deutsch | `index.html:3` | `lang="de"` setzen |
| 1.4 | Keine Open-Graph-Tags (`og:title`, `og:image`, etc.) | `index.html` | Mindestens `og:title`, `og:description`, `og:image` hinzufügen — entscheidend für Social Sharing |
| 1.5 | Kein Favicon | `index.html` | `<link rel="icon">` ergänzen |
| 1.6 | Kein `LocalBusiness`-Schema (JSON-LD) | `index.html` | Structured Data für Google (Name, Adresse, Telefon, Öffnungszeiten) |
| 1.7 | Keine `canonical`-URL | `index.html` | `<link rel="canonical" href="https://...">` |

---

## 2. Accessibility (a11y)

| # | Problem | Datei | Empfehlung |
|---|---------|-------|------------|
| 2.1 | Navbar-Links (`#bad-quiz`, `#galerie`, etc.) — `HeroSection` hat kein `id="bad-quiz"`, `VacationQuoteSection` gar kein `id` | `Navbar.tsx:43`, `HeroSection.tsx` | Passende `id`-Attribute an jede Ziel-Section setzen |
| 2.2 | Quiz-Buttons: kein `aria-pressed` oder `aria-label` für den gewählten Zustand | `HeroSection.tsx:79` | `aria-pressed={selectedAnswer === answer.id}` ergänzen |
| 2.3 | Galerie-Testimonials nur per Hover sichtbar — auf Touch-Geräten nie erreichbar | `GallerySection.tsx:100` | Alternativen: Tap-Toggle oder feste Testimonial-Zeile unter dem Bild |
| 2.4 | Kein „Skip to main content"-Link | `index.html` / `App.tsx` | `<a href="#main" class="sr-only focus:not-sr-only">Zum Inhalt springen</a>` |
| 2.5 | Keiner der Buttons im CTASection hat einen echten Fokus-Ring | `CTASection.tsx:43,53` | `focus-visible:ring-2` via Tailwind sicherstellen |
| 2.6 | Farbkontrast: weißer Text auf `#a8d4a8` (helles Grün) in `SocialMomentSection` | `SocialMomentSection.tsx:18` | Kontrast prüfen (WCAG AA: min. 4.5:1) — ggf. `font-bold` oder Textschatten |

---

## 3. Performance

| # | Problem | Datei | Empfehlung |
|---|---------|-------|------------|
| 3.1 | Kein `loading="lazy"` auf Bildern unterhalb des Folds | `GallerySection.tsx`, `VacationQuoteSection.tsx`, `SocialMomentSection.tsx` | Alle Bilder außer dem Hero-Bild mit `loading="lazy"` versehen |
| 3.2 | Keine `width`/`height`-Attribute auf `<img>`-Tags → Layout Shift (CLS) | diverse | Explizite Dimensionen oder `aspect-ratio`-Wrapper setzen |
| 3.3 | Zwei Animations-Bibliotheken gleichzeitig (GSAP + Framer Motion) | `HeroSection.tsx`, `PhilosophySection.tsx` | Animationen konsolidieren: entweder GSAP oder Framer Motion — aktuell werden beide geladen, ohne echten Mehrwert |
| 3.4 | Keine Font-Preconnect-Hints | `index.html` | `<link rel="preconnect" href="https://fonts.googleapis.com">` etc. für schnelleres Laden |
| 3.5 | Unsplash-URLs ohne WebP oder `srcset` | diverse | `&fm=webp` zu Unsplash-URLs hinzufügen, `srcset` für verschiedene Viewport-Größen |

---

## 4. Code-Qualität / Bugs

| # | Problem | Datei | Empfehlung |
|---|---------|-------|------------|
| 4.1 | `handleReset` definiert, aber nirgends im JSX gerendert — toter Code | `HeroSection.tsx:23` | Entweder Reset-Button einbauen oder Funktion entfernen |
| 4.2 | `useScroll` + `useTransform` importiert, `y`-Wert berechnet, aber auf **kein** Element angewendet | `PhilosophySection.tsx:12-17` | `y` auf das Parallax-Element anwenden (`style={{ y }}`) oder den ungenutzten Import/Code entfernen |
| 4.3 | `console.log` im Produktions-Code | `NewsletterSection.tsx:11` | Entfernen; stattdessen echte Logik oder zumindest `toast`-Feedback |
| 4.4 | Redundantes `style={{ position: 'relative' }}` bei bereits bestehendem `className="relative"` | `App.tsx:14`, `PhilosophySection.tsx:59` | Inline-Style entfernen |
| 4.5 | CTA-Buttons ohne `onClick`-Handler oder `href` — vollständig nicht-funktional | `CTASection.tsx:43,53` | Ziel-URL oder Modal-Öffner ergänzen |
| 4.6 | Newsletter-Formular: kein visuelles Feedback nach Absenden (nur `console.log`) | `NewsletterSection.tsx` | Erfolgs-/Fehlermeldung anzeigen (z. B. `toast` via `sonner`, das bereits im Projekt liegt) |
| 4.7 | Ungenutzte Komponenten im Projekt: `CalendarSection`, `InteractiveFeatures` | gleichnamige `.tsx`-Dateien | Entweder integrieren (empfohlen, siehe §7) oder löschen |
| 4.8 | `QuizSection.tsx` existiert separat, Quiz-Logik aber direkt in `HeroSection` eingebettet — Doppelung | `QuizSection.tsx`, `HeroSection.tsx` | Klären, welche Version aktiv sein soll; tote Datei entfernen |

---

## 5. UX & Conversion

| # | Problem | Empfehlung |
|---|---------|-----------|
| 5.1 | **Kein mobiles Hamburger-Menü** — Navbar zeigt auf kleinen Screens 4 Links nebeneinander, die brechen | Hamburger-Icon + Slide-in-Menü für `< md`-Breakpoint |
| 5.2 | **Hero-Quiz: kein Follow-up** — nach Beantworten der Frage gibt es keinen klaren nächsten Schritt | Nach `showResult === true` einen animierten „Mehr erfahren"-Button oder Scroll-Pfeil einblenden |
| 5.3 | **Keine Scroll-Indikatoren im Hero** — Nutzer sehen nicht, dass es nach unten weitergeht | Animierter Chevron/Pfeil unten in der Hero-Section |
| 5.4 | **Process-Steps ohne Nummerierung** — die 4 Schritte sind eine Sequenz, aber optisch gleichwertig | Schritt-Nummern (1–4) prominent in der Icon-Box anzeigen |
| 5.5 | **Kein Kontakt-Formular / Kontaktinfos** — einziger Kontaktweg sind zwei nicht-funktionierende Buttons | Echte Kontaktmöglichkeit: Formular, Telefonnummer oder E-Mail-Adresse |
| 5.6 | **Galerie-Testimonials nicht touch-tauglich** | Tap-to-toggle oder Testimonials dauerhaft als Caption sichtbar machen |
| 5.7 | **Newsletter-Section ohne Datenschutzhinweis** — bei E-Mail-Erfassung gesetzlich problematisch (DSGVO) | Kurzen Hinweis + Link zur Datenschutzerklärung unter dem Formular |
| 5.8 | **Footer fehlt echte Geschäftsdaten** — für ein lokales Handwerksunternehmen ungewöhnlich | Adresse, Telefon, E-Mail ergänzen |
| 5.9 | **Keine Trust-Signale / Zahlen** | „200+ Bäder saniert", „15 Jahre Erfahrung" o. Ä. als Zähler-Sektion |

---

## 6. Design / Visuelle Konsistenz

| # | Problem | Empfehlung |
|---|---------|-----------|
| 6.1 | `VacationQuoteSection` und `SocialMomentSection` haben **identische Layout-Pattern** (Icon-Card 1/3 + Text 2/3, gespiegelt) — visuell monoton | Eines der beiden Layouts variieren: z. B. Vollbild-Bild mit Text-Overlay statt Karten-Grid |
| 6.2 | **Vertikaler Gradient-Balken** `from-[#e89a4d] via-[#a8d4a8] to-[#2c4a5f]` zweimal identisch | Zweites Vorkommen leicht variieren oder mit anderem Akzent ersetzen |
| 6.3 | **Section-Abstände inkonsistent**: `py-20`, `py-28`, `py-32`, `py-40` ohne klares Rhythmus-System | Abstände auf ein 3-stufiges System normieren: klein `py-20`, mittel `py-28`, groß `py-40` |
| 6.4 | **Galerie: `overflow-visible` auf dem Wrapper** + explizit `rounded-[3rem]` führt zu visuellen Clipping-Inkonsistenzen je Browser | `overflow-visible` nur für Testimonial-Overlay beibehalten, restliche Box `overflow-hidden` |
| 6.5 | **Galerie-Images haben keinen einheitlichen Aspect-Ratio** — 3 lokale PNGs vs. 1 Unsplash-Bild | Alle Bilder auf gleiches `aspect-[3/4]`-Verhältnis croppen oder einheitliche Bildquelle |

---

## 7. Fehlende Sektionen (Empfehlungen)

| # | Sektion | Begründung | Ressource |
|---|---------|-----------|-----------|
| 7.1 | **CalendarSection einbinden** | Bereits fertig entwickelt — animierter Abriss-Kalender passend zum „33 Urlaubstage"-Thema. Platzierung: nach `VacationQuoteSection` | `CalendarSection.tsx` |
| 7.2 | **Trust-Zahlen-Sektion** (Counter-Animationen) | Social Proof durch konkrete Zahlen: Projekte, Jahre, Zufriedenheit | Neue Komponente `StatsSection.tsx` |
| 7.3 | **FAQ-Sektion** | Best Practice für Service-LPs — reduziert Einwände vor Kontaktaufnahme. Accordion-Komponente bereits im UI-Verzeichnis (`accordion.tsx`) vorhanden | `ui/accordion.tsx` nutzen |
| 7.4 | **Kontakt-Sektion** | Ohne echte Kontaktmöglichkeit ist die LP für Conversions nahezu wertlos | Formular mit Name, Telefon, Nachricht + Datenschutz-Checkbox |
| 7.5 | **InteractiveFeatures einbinden oder bereinigen** | Interessante Animations-Karten, passen stilistisch aber kaum zur LP — entweder thematisch anpassen und integrieren oder entfernen | `InteractiveFeatures.tsx` |

---

## 8. Animationen & Effekte — Vorschläge

| # | Effekt | Beschreibung | Aufwand |
|---|--------|-------------|---------|
| 8.1 | **Scroll-Progress-Bar** | Dünner Balken oben (`#e89a4d`) zeigt Scroll-Fortschritt — gängig bei Premium-LPs | Gering |
| 8.2 | **Smooth Scroll** | `scroll-behavior: smooth` global in `index.css` — für Navbar-Anker-Links | Minimal |
| 8.3 | **Hero-Scroll-Pfeil** | Animierter, bouncender Chevron-Pfeil am unteren Hero-Rand — signalisiert Scroll | Gering |
| 8.4 | **Counter-Animationen** in Stats-Sektion | Zahlen zählen von 0 auf den Zielwert wenn in Viewport — GSAP oder Framer Motion | Mittel |
| 8.5 | **Parallax auf Hero-Hintergrundbild** | `y`-Transform auf das `<img>` statt auf den Wrapper — echter Tiefeneffekt | Gering (GSAP `ScrollTrigger` bereits eingebunden) |
| 8.6 | **Galerie-Lightbox** | Klick auf Galerie-Bild öffnet Fullscreen-Modal mit Bild + Testimonial | Mittel |
| 8.7 | **Magnetic-Button-Effekt** auf primärem CTA | Cursor zieht Button leicht an — hohe visuelle Wirkung bei geringem Code-Aufwand | Gering–Mittel |
| 8.8 | **Word-Highlight-Scroll-Animation** (PhilosophySection verbessern) | Wörter färben sich beim Scrollen sequentiell orange statt alle auf einmal — ähnlich wie bei apple.com-Storytelling-Seiten | Mittel |
| 8.9 | **Page-Load-Animation** | Kurzes Fade-in / Slide-up der gesamten Seite beim ersten Laden | Gering |
| 8.10 | **Hover-Glow auf Navbar-Links** | Subtiler `#e89a4d`-Glow-Underline bei Hover — passt zum Luxus-Feel | Minimal |
| 8.11 | **Image Reveal on Scroll** in Galerie | Bilder fahren beim Scrollen mit einem `clip-path`-Wipe herein (von unten nach oben) statt einfachem Fade | Mittel |
| 8.12 | **Section-Transition: Wellen-Divider** | SVG-Wellenform als Trennlinie zwischen bestimmten Sektionen statt hartem Farbwechsel | Gering |

---

## 9. Prioritäten-Matrix

| Priorität | Maßnahmen |
|-----------|-----------|
| **Hoch (sofort)** | 1.1–1.4, 2.1, 4.5, 4.6, 5.1, 5.5, 5.7 |
| **Mittel (nächste Iteration)** | 2.2–2.6, 3.1–3.2, 4.1–4.4, 5.2–5.4, 6.1–6.2, 7.1–7.4 |
| **Nice-to-have** | 3.3, 6.3–6.5, 7.5, 8.1–8.12 |

---

*Erstellt auf Basis vollständiger Code-Analyse aller Komponenten in `lp_v1.1/src/app/components/`*
