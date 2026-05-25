import React, { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    // 1. Core Fix: Dynamically load the correct Calendly external library source API
    const script = document.createElement('script');
    script.src = 'https://calendly.com';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 2. Clean up script when unmounting the view to prevent DOM memory leaks
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="booking" className="py-12 md:py-20 bg-[hsl(var(--background))] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 reveal">
          <span className="font-script text-3xl text-[hsl(var(--accent))] block mb-1">
            book a session
          </span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[hsl(var(--foreground))]">
            Pick a time that <em className="text-gradient-magenta not-italic">works for you</em>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
            Real-time availability via Calendly. You'll receive a confirmation email immediately.
          </p>
        </div>

        {/* Embedded Iframe Container Wrapper - Matches your 21.dev styles */}
        <div className="rounded-[2rem] overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-elegant transition-all duration-300 hover:border-[hsl(var(--magenta)/0.25)]">
          <div
            className="calendly-inline-widget w-full"
            // Dynamic branding query configuration overrides inside the data-url
           data-url="https://calendly.com/nsukugold07/30min?background_color=fae1f4&primary_color=f391cb"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

      </div>
    </section>
  );
}
