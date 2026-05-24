import React from 'react';

export default function Services() {
  const servicesList = [
    {
      id: 1,
      name: 'Gel Manicure',
      desc: 'Long-lasting gel formula that stays chip-free for up to 3 weeks. Shape, cuticle care and a mirror-shine finish.',
      price: 'R380',
      icon: '💅',
      tag: '★ Most Popular',
      className: 'md:col-span-2 ',
      delay: ''
    },
    {
      id: 2,
      name: 'Classic Manicure',
      desc: 'Shape, buff, cuticle care & your favourite polish colour.',
      price: 'R250',
      icon: '✨',
      tag: null,
      className: '',
      delay: 'reveal-delay-1'
    },
    {
      id: 3,
      name: 'Nail Extensions',
      desc: 'Acrylic or builder gel. Choose your length, shape, and style. Fully customisable — coffin, almond, stiletto, square.',
      price: 'R550',
      icon: '🌸',
      tag: 'Signature',
      className: 'md:row-span-2 h-full flex flex-col justify-between pb-24 md:pb-28',
      delay: 'reveal-delay-2'
    },
    {
      id: 4,
      name: 'Nail Art',
      desc: 'Custom designs, florals, gems & detailed art. Per nail or full set.',
      price: 'R80+',
      icon: '🎨',
      tag: null,
      className: '',
      delay: 'reveal-delay-1'
    },
    {
      id: 5,
      name: 'Soak-Off Removal',
      desc: 'Safe gel or acrylic removal with nail treatment included.',
      price: 'R150',
      icon: '🌿',
      tag: null,
      className: '',
      delay: 'reveal-delay-2'
    }
  ];

  return (
    <section id="services" className="bg-[hsl(var(--blush)/0.5)] py-8 px-6 md:px-12 transition-colors duration-300">
      
      {/* Intro Header Section */}
      <div className="max-w-[520px] mb-14 reveal">
        <div className="section-eyebrow mb-2 text-[12px] tracking-[3px] uppercase text-text-faint font-semibold">
          Services
        </div>
        <h2 className="section-heading text-3xl font-light text-[hsl(var(--foreground))] mb-4">
          The <em className="font-['Playfair_Display'] italic font-normal text-primary">Menu</em>
        </h2>
        <p className="text-[13px] text-[hsl(var(--muted-foreground))] leading-[1.8] font-light">
          Every treatment is tailored to you. Choose your perfect service — from a classic refresh to a full nail transformation.
        </p>
      </div>
 
      {/* 21.dev Styled Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-auto gap-3">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className={`bento-card group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 cursor-none transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[hsl(var(--magenta)/0.35)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] reveal ${service.delay} ${service.className}`}
          >
            {/* 21.dev Style Dynamic Radial Glow Layer */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--magenta) / 0.08) 0%, transparent 70%)`
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                {/* Optional Top Tag */}
                {service.tag && (
                  <span className="inline-block text-[8px] tracking-[2px] uppercase text-[hsl(var(--magenta))] bg-[hsl(var(--secondary))] border border-[hsl(var(--magenta)/0.2)] px-2.5 py-1 rounded-full font-bold mb-3">
                    {service.tag}
                  </span>
                )}

                {/* Service Icon */}
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--magenta)/0.25)] flex items-center justify-center text-lg mb-4">
                  {service.icon}
                </div>

                {/* Service Metadata */}
                <h3 className="font-['Playfair_Display'] text-xl font-medium text-[hsl(var(--card-foreground))] mb-1.5">
                  {service.name}
                </h3>
                <p className="text-[11.5px] text-[hsl(var(--muted-foreground))] leading-[1.7] font-light max-w-[90%]">
                  {service.desc}
                </p>
              </div>

              {/* Price Tag Overlay */}
              <div className="mt-8 sm:mt-12 md:mt-16 flex justify-end">
                <span className="font-['Playfair_Display'] text-xl text-[hsl(var(--magenta))] bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--magenta)/0.15)] px-3.5 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
