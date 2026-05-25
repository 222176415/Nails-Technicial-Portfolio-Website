import React, { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    // 1. Dynamically append the Calendly widget script to the document body
    const script = document.createElement('script');
    script.src = 'https://calendly.com/nsukugold07/30min?background_color=fae1f4&primary_color=f391cb';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 2. Clean up script when unmounting the view to prevent memory leaks
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="booking" className="py-10 md:py-18 bg-[hsl(var(--background))] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4 reveal">
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


        <div className="rounded-[2rem] overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-elegant transition-all duration-300 hover:border-[hsl(var(--magenta)/0.2)]">
          <div
            className="calendly-inline-widget w-full"
             data-url="https://calendly.com/nsukugold07/30min?background_color=fae1f4&primary_color=f391cb"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

      </div>
    </section>
  );
}
