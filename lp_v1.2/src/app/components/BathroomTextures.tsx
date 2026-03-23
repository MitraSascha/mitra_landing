// Dezente Badezimmer-Texturen für High-End Organic Tech Design
// Marmor, Naturstein und Kachel-Optik als SVG-Patterns

export function BathroomTextures() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Marmor-Textur - Weißer Carrara Marmor */}
        <pattern id="marbleTexture" x="0" y="0" width="800" height="800" patternUnits="userSpaceOnUse">
          <rect width="800" height="800" fill="#fafafa" />
          {/* Marmor-Adern */}
          <path
            d="M0,200 Q200,180 400,200 T800,200 M0,350 Q250,330 500,350 T800,350 M0,600 Q150,580 300,600 T800,600"
            stroke="rgba(200,200,200,0.15)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M100,100 Q300,90 500,100 T800,100 M50,450 Q300,440 550,450 T800,450"
            stroke="rgba(180,180,180,0.1)"
            strokeWidth="1"
            fill="none"
          />
          {/* Feinere Adern */}
          <path
            d="M0,250 Q100,245 200,250 T400,250 M400,150 Q500,145 600,150 T800,150"
            stroke="rgba(190,190,190,0.08)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>

        {/* Naturstein-Textur - Sandstein */}
        <pattern id="stoneTexture" x="0" y="0" width="600" height="600" patternUnits="userSpaceOnUse">
          <rect width="600" height="600" fill="#f5f5f0" />
          {/* Organische Flecken und Strukturen */}
          <circle cx="100" cy="100" r="40" fill="rgba(220,215,200,0.15)" />
          <circle cx="400" cy="200" r="60" fill="rgba(210,205,190,0.12)" />
          <circle cx="200" cy="400" r="50" fill="rgba(225,220,205,0.1)" />
          <circle cx="500" cy="500" r="45" fill="rgba(215,210,195,0.13)" />
          <ellipse cx="300" cy="150" rx="70" ry="40" fill="rgba(205,200,185,0.08)" />
          <ellipse cx="150" cy="300" rx="55" ry="35" fill="rgba(210,205,190,0.09)" />
        </pattern>

        {/* Dezente Kachel-Optik */}
        <pattern id="tileTexture" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="none" />
          {/* Fugen */}
          <line x1="0" y1="0" x2="200" y2="0" stroke="rgba(180,180,180,0.1)" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="200" stroke="rgba(180,180,180,0.1)" strokeWidth="1" />
          {/* Leichter Glanz-Effekt */}
          <rect x="5" y="5" width="190" height="190" fill="url(#tileGloss)" />
        </pattern>

        {/* Glanz-Gradient für Kacheln */}
        <linearGradient id="tileGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>

        {/* Wasser-inspirierte organische Formen */}
        <pattern id="waterFlow" x="0" y="0" width="1000" height="1000" patternUnits="userSpaceOnUse">
          <path
            d="M0,500 Q250,400 500,500 T1000,500"
            stroke="rgba(168,212,168,0.08)"
            strokeWidth="80"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M0,300 Q200,250 400,300 T800,300"
            stroke="rgba(232,154,77,0.06)"
            strokeWidth="60"
            fill="none"
            opacity="0.5"
          />
        </pattern>

        {/* Marmor mit Dunkelblau-Tönung */}
        <pattern id="marbleDarkBlue" x="0" y="0" width="800" height="800" patternUnits="userSpaceOnUse">
          <rect width="800" height="800" fill="rgba(44,74,95,0.02)" />
          <path
            d="M0,200 Q200,180 400,200 T800,200 M0,350 Q250,330 500,350 T800,350"
            stroke="rgba(44,74,95,0.08)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M100,100 Q300,90 500,100 T800,100 M50,450 Q300,440 550,450 T800,450"
            stroke="rgba(44,74,95,0.05)"
            strokeWidth="1"
            fill="none"
          />
        </pattern>

        {/* Marmor mit Mintgrün-Tönung */}
        <pattern id="marbleMint" x="0" y="0" width="800" height="800" patternUnits="userSpaceOnUse">
          <rect width="800" height="800" fill="rgba(168,212,168,0.02)" />
          <path
            d="M0,250 Q200,230 400,250 T800,250 M0,500 Q250,480 500,500 T800,500"
            stroke="rgba(168,212,168,0.1)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M150,150 Q350,140 550,150 T800,150 M0,400 Q200,390 400,400 T800,400"
            stroke="rgba(168,212,168,0.06)"
            strokeWidth="1"
            fill="none"
          />
        </pattern>

        {/* Marmor mit Orange-Tönung (für warme Bereiche) */}
        <pattern id="marbleOrange" x="0" y="0" width="800" height="800" patternUnits="userSpaceOnUse">
          <rect width="800" height="800" fill="rgba(232,154,77,0.02)" />
          <path
            d="M0,300 Q200,280 400,300 T800,300 M0,550 Q250,530 500,550 T800,550"
            stroke="rgba(232,154,77,0.09)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M100,150 Q300,140 500,150 T800,150 M50,480 Q300,470 550,480 T800,480"
            stroke="rgba(232,154,77,0.05)"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>
    </svg>
  );
}
