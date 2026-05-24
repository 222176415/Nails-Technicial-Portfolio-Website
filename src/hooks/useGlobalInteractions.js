// hooks/useGlobalInteractions.js
import { useEffect } from 'react';

export default function useGlobalInteractions(dependency) {
  useEffect(() => {
    // 1. Nav Scroll Logic
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    };

    // 2. Scroll Reveal Intersection Engine
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', handleScroll);

    // Cleanup when breaking layout blocks
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [dependency]); // <-- Refreshes hooks safely on page changes
}
