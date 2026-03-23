export function MarqueeStrip() {
  const items = [
    'Design',
    'Qualität',
    'Handwerk',
    'Vertrauen',
    'Premium',
    'Erfahrung',
    'Planung',
    'Präzision',
  ];

  // Doubled so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-5 border-y"
      style={{
        backgroundColor: '#2c4a5f',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-outfit text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.45)', marginLeft: '2.5rem', marginRight: '2.5rem' }}
          >
            {item}
            {i < doubled.length - 1 && (
              <span style={{ color: '#e89a4d', marginLeft: '2.5rem' }}>·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
