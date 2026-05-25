import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Naledi M.',
      service: 'Gel Manicure',
      text: '"Shasha is absolutely incredible. My nails have never looked this good — the attention to detail is unmatched."',
    },
    {
      name: 'Thandi K.',
      service: 'Nail Art Design',
      text: '"The floral nail art she did for my wedding was breathtaking. Everyone complimented my nails the entire day."',
    },
    {
      name: 'Ayanda R.',
      service: 'Nail Extensions',
      text: '"Professional, punctual, and incredibly talented. My extensions lasted 5 weeks with zero lifting. Booked for life!"',
    },
    {
      name: 'Zanele P.',
      service: 'Classic Manicure',
      text: '"I\'ve tried so many nail techs in Joburg and Shasha is by far the best. The vibe, the quality, everything is perfect."',
    },
    {
      name: 'Lerato D.',
      service: 'Ombré Extensions',
      text: '"Clean, hygienic studio and the most gorgeous ombré set I\'ve ever had. 100% recommend to everyone."',
    },
  ];


  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="bg-[hsl(var(--blush-deep)/0.4)] py-8 md:py-10 overflow-hidden transition-colors duration-300">    
      <div className="reveal px-6 md:px-12 mb-6">
        <div className="section-eyebrow mb-1 text-[11px] tracking-[3px] uppercase text-text-faint font-semibold">
          Testimonials
        </div>
        <h2 className="section-heading text-2xl font-light text-[hsl(var(--foreground))]">
          What Clients <em className="font-['Playfair_Display'] italic font-normal text-primary">Say</em>
        </h2>
      </div>
      <div className="relative overflow-hidden w-full mt-4 group">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {duplicatedReviews.map((item, index) => (
            <div
              key={index}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-5 w-[280px] md:w-[300px] flex-shrink-0 transition-colors duration-300 hover:border-[hsl(var(--magenta)/0.3)]"
            >
              <div className="text-[hsl(var(--magenta))] text-[11px] tracking-[2px] mb-2.5">
                ★★★★★
              </div>
              <p className="text-[12px] text-[hsl(var(--muted-foreground))] leading-[1.7] font-light font-sans italic mb-4">
                {item.text}
              </p>
              <div>
                <div className="text-[11px] text-[hsl(var(--foreground))] font-semibold tracking-wide">
                  {item.name}
                </div>
                <div className="text-[9px] text-text-faint tracking-[2px] uppercase mt-0.5 font-medium">
                  {item.service}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
