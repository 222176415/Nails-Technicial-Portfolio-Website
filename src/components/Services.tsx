import React from 'react';

export default function Services() {
  const pricingTiers = [
    {
      id: 1,
      name: 'Minimalist Essentials',
      tag: 'Clean & Simple',
      price: 'R200',
      period: 'per session',
      desc: 'Perfect for regular maintenance or a quick elegant touch-up.',
      features: [
        { label: 'Minimal Rubber Base Treatment', bold: true },
        { label: 'Nail shaping, buffing & cuticle cleanup', bold: false },
        { label: 'Long-lasting structural strength enhancement', bold: false },
        { label: 'Mirror-shine protective top coat finish', bold: false }
      ],
      className: '',
      delay: ''
    },
    {
      id: 2,
      name: 'Signature Artistry',
      tag: '★ Most Popular',
      price: 'R250',
      period: 'per set',
      desc: 'Fully customized extensions complete with specialized custom designs.',
      features: [
        { label: 'Acrylic with Custom Design Included', bold: true },
        { label: 'Full set extension styling (any shape/length)', bold: false },
        { label: 'Custom artwork, detailed lines, or accents', bold: false },
        { label: 'Premium bond formula to prevent lifting', bold: false }
      ],
      className: 'border-[hsl(var(--magenta)/0.4)] bg-[hsl(var(--card))] shadow-[0_20px_40px_rgba(194,0,95,0.08)] scale-[1.02] md:scale-105 z-10',
      delay: 'reveal-delay-1'
    },
    {
      id: 3,
      name: 'Complete Reset Care',
      tag: 'Luxury Bundle',
      price: 'R350',
      period: 'full treatment',
      desc: 'Our ultimate luxury dual package for deep relaxation and top-tier grooming.',
      features: [
        { label: 'Combo Package (Manicure & Pedicure)', bold: true },
        { label: 'Standalone Pedicure option available for R150', bold: true },
        { label: 'Soothing foot soak, scrub & hard skin removal', bold: false },
        { label: 'Full cuticle treatment & professional color coating', bold: false }
      ],
      className: '',
      delay: 'reveal-delay-2'
    }
  ];

  return (
    <section id="services" className="bg-[hsl(var(--blush)/0.5)] py-16 px-6 md:px-12 transition-colors duration-300">
      
      {/* Intro Header Section */}
      <div className="max-w-[520px] mb-14 reveal mx-auto text-center">
        <div className="section-eyebrow mb-2 text-[12px] tracking-[3px] uppercase text-text-faint font-semibold">
          Services
        </div>
        <h2 className="section-heading text-3xl font-light text-[hsl(var(--foreground))] mb-4">
          The <em className="font-['Playfair_Display'] italic font-normal text-primary">Menu</em>
        </h2>
        <p className="text-[13px] text-[hsl(var(--muted-foreground))] leading-[1.8] font-light">
          Every treatment is tailored to your style. Select a premium tier designed to fit your aesthetic and self-care goals.
        </p>
      </div>
 
      {/* Premium Three-Card Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch pt-4">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`bento-card group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 cursor-none transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[hsl(var(--magenta)/0.35)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)] flex flex-col justify-between reveal ${tier.delay} ${tier.className}`}
          >
            {/* 21.dev Style Dynamic Radial Glow Layer */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--magenta) / 0.08) 0%, transparent 70%)`
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              
              {/* Card Header and Feature Details */}
              <div>
                {/* Optional Top Tag Status Bar */}
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block text-[8px] tracking-[2px] uppercase text-[hsl(var(--magenta))] bg-[hsl(var(--secondary))] border border-[hsl(var(--magenta)/0.2)] px-2.5 py-1 rounded-full font-bold">
                    {tier.tag}
                  </span>
                </div>

                {/* Card Title Metadata */}
                <h3 className="font-['Playfair_Display'] text-xl font-medium text-[hsl(var(--card-foreground))] mb-1">
                  {tier.name}
                </h3>
                <p className="text-[12px] text-[hsl(var(--muted-foreground))] font-light leading-relaxed mb-6">
                  {tier.desc}
                </p>

                {/* Decorative Separator Line */}
                <div className="border-t border-[hsl(var(--border))] my-4 opacity-50" />

                {/* Feature Checkmarks Stack */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-[hsl(var(--muted-foreground))]">
                      <span className="text-[hsl(var(--magenta))] font-semibold mt-0.5 select-none">✓</span>
                      <span className={feature.bold ? "text-[hsl(var(--card-foreground))] font-medium" : "font-light"}>
                        {tier.label || feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Tier Footer Layer */}
              <div className="mt-auto pt-4 border-t border-[hsl(var(--border))] opacity-90 flex items-baseline justify-between">
                <div>
                  <span className="font-['Playfair_Display'] text-3xl font-semibold text-[hsl(var(--magenta))]">
                    {tier.price}
                  </span>
                  <span className="text-[10px] text-text-faint tracking-wider block mt-0.5 uppercase">
                    {tier.period}
                  </span>
                </div>

                {/* Secondary call to action anchor link shortcut wrapper */}
                <a 
                  href="#booking" 
                  className="text-[11px] tracking-[1.5px] uppercase font-semibold text-[hsl(var(--card-foreground))] border-b border-[hsl(var(--card-foreground))] pb-0.5 hover:text-[hsl(var(--magenta))] hover:border-[hsl(var(--magenta))] transition-colors duration-300"
                >
                  Book Card
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
