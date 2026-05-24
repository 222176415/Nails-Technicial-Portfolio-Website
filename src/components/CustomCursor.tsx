import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const coords = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      coords.current.mx = x;
      coords.current.my = y;

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }

      // Hero Spotlight Logic
      const hero = document.getElementById('hero');
      const spotlight = document.getElementById('spotlight');
      if (hero && spotlight) {
        const rect = hero.getBoundingClientRect();
        const pct_x = (((x - rect.left) / rect.width) * 100).toFixed(1) + '%';
        const pct_y = (((y - rect.top) / rect.height) * 100).toFixed(1) + '%';
        spotlight.style.setProperty('--mx', pct_x);
        spotlight.style.setProperty('--my', pct_y);
      }

      // Bento Card Hover Glow Engine
      document.querySelectorAll('.bento-card').forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((x - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((y - r.top) / r.height) * 100 + '%');
      });
    };

    let animationFrameId;
    const animRing = () => {
      const c = coords.current;
      c.rx += (c.mx - c.rx) * 0.12;
      c.ry += (c.my - c.ry) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${c.rx}px`;
        ringRef.current.style.top = `${c.ry}px`;
      }
      animationFrameId = requestAnimationFrame(animRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Central Solid Dot - Uses global text foreground token to invert across themes automatically */}
      <div 
        ref={dotRef} 
        id="cursor-dot" 
        className="fixed w-2 h-2 bg-[hsl(var(--foreground))] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out shadow-[0_0_10px_rgba(var(--foreground),0.2)]"
      />
      
      {/* Outer Tracking Ring - Tinted boundary ring matching theme variations */}
      <div 
        ref={ringRef} 
        id="cursor-ring" 
        className="fixed w-9 h-9 border border-[hsl(var(--foreground)/0.3)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(var(--foreground),0.05)]"
      />
    </>
  );
}
