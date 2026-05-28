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

      const hero = document.getElementById('hero');
      const spotlight = document.getElementById('spotlight');
      if (hero && spotlight) {
        const rect = hero.getBoundingClientRect();
        const pct_x = (((x - rect.left) / rect.width) * 100).toFixed(1) + '%';
        const pct_y = (((y - rect.top) / rect.height) * 100).toFixed(1) + '%';
        spotlight.style.setProperty('--mx', pct_x);
        spotlight.style.setProperty('--my', pct_y);
      }

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
      <div
        ref={dotRef}
        id="cursor-dot"
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
      >
       <svg
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="#C2005F"
  xmlns="http://www.w3.org/2000/svg"
  className="fill-[#C2005F] dark:fill-white drop-shadow-[0_0_6px_rgba(194,0,95,0.7)] dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] animate-[pulse-dot_1.8s_ease-in-out_infinite]"
  aria-hidden="true"
>
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
           C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
</svg>
      </div>

     <div
  ref={ringRef}
  id="cursor-ring"
  className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out
    border border-[#C2005F]/30 shadow-[0_0_15px_rgba(194,0,95,0.08)]
    dark:border-white/20 dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
/>
    </>
  );
}