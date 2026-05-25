import React from 'react';
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      label: 'Gel Set · Magenta',
      overlayText: 'Classic Gel',
      swatchColor: 'bg-[hsl(var(--magenta))]',
      // Staggered varying heights to achieve the organic Masonry grid effect
      heightClass: 'h-[200px]',
      imgSrc: g1,
    },
    {
      id: 2,
      label: 'Nail Art · Floral',
      overlayText: 'Floral Art',
      swatchColor: 'bg-[hsl(var(--secondary))]',
      heightClass: 'h-[280px]',
      imgSrc: g2,
    },
    {
      id: 3,
      label: 'Extensions · Almond',
      overlayText: 'Extensions',
      swatchColor: 'bg-[#8B0040]',
      heightClass: 'h-[220px]',
      imgSrc: g3,
    },
    {
      id: 4,
      label: 'Ombre · Blush',
      overlayText: 'Ombré Blush',
      swatchColor: 'bg-[#F5C6D8]',
      heightClass: 'h-[320px]',
      imgSrc: g4,
    },
    {
      id: 5,
      label: 'Gems · Coffin',
      overlayText: 'Gem Details',
      swatchColor: 'bg-[#E8336B]',
      heightClass: 'h-[210px]',
      imgSrc: g5,
    },
    {
      id: 6,
      label: 'French · Modern',
      overlayText: 'Modern French',
      swatchColor: 'bg-[#C2005F]/60',
      heightClass: 'h-[260px]',
      imgSrc: g6,
    },
  ];

  return (
    <section id="gallery" className="bg-[hsl(var(--card))] py-16 px-6 md:px-12 transition-colors duration-300 border-y-2 border-[hsl(var(--border))] dark:border-[hsl(var(--border)/0.5)]">
      
      {/* Header Block Section */}
      <div className="reveal mb-10">
        <div className="section-eyebrow mb-2 text-[12px] tracking-[3px] uppercase text-text-faint font-semibold">
          Portfolio
        </div>
        <h2 className="section-heading text-3xl font-light text-[hsl(var(--foreground))]">
          The <em className="font-['Playfair_Display'] italic font-normal text-primary">Work</em>
        </h2>
      </div>
 
      {/* Aceternity & CSS Column Powered Masonry Layout Grid */}
      <div className="reveal columns-2 sm:columns-3 gap-3 [column-fill:_balance] w-full mx-auto space-y-3">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] cursor-none group transition-all duration-300"
          >
            {/* Inner Placeholder Wrapper with explicit heights */}
            <div className={`w-full relative flex items-center justify-center flex-col gap-2 ${item.heightClass}`}>
              
              {/* Actual Image Asset Layer */}
              <img 
                src={item.imgSrc} 
                alt={item.label} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              />

              {/* Minimalist fallback details visible only if image lags on network request fetch loops */}
              <div className="relative z-0 flex flex-col items-center gap-2 pointer-events-none opacity-40 group-hover:opacity-0 transition-opacity duration-300">
                <div className={`w-12 h-12 rounded-full ${item.swatchColor} blur-sm`} />
                <span className="text-[9px] tracking-[2px] uppercase text-text-faint text-center px-4">
                  {item.label}
                </span>
              </div>
            </div>
 
            {/* Aceternity Custom Hover Slide Reveal Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(139,0,64,0.9)] via-[rgba(139,0,64,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-flex-end p-4 pointer-events-none">
              <span className="text-[12px] font-medium tracking-wide text-white drop-shadow-sm self-end">
                {item.overlayText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
