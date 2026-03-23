import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[202] h-[3px] pointer-events-none">
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: '#e89a4d',
          boxShadow: '0 0 12px rgba(232,154,77,0.9), 0 0 4px rgba(232,154,77,1)',
          transition: 'width 80ms linear',
        }}
      />
    </div>
  );
}
