import React from 'react';
import { Phone, Instagram, Mail } from "lucide-react";

export default function Footer() {
 const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com/nailsbyshasha2025?igsh=MWM1aDk5dHhzdHhlYg==",
    handle: "@nailsbyshasha2025",
    hoverColor: "hover:text-[#E1306C] hover:border-[#E1306C]",
  },
  {
    name: "WhatsApp",
    icon: Phone,
    link: "https://wa.me/27691255967",
    handle: "+27 (0) 69 125 5967",
    hoverColor: "hover:text-[#25D366] hover:border-[#25D366]",
  },
  {
    name: "Email",
    icon: Mail,
    link: "mailto:nsukugold07@gmail.com",
    handle: "nsukugold07@gmail.com",
    hoverColor: "hover:text-[#C2005F] hover:border-[#C2005F]",
  },
];

  return (
    <footer className="relative z-10 bg-dark-card border-t border-dark-border px-6 py-12 md:px-12 md:py-13">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 mb-12">
        
        <div className="flex flex-col">
          <span className="font-script text-[26px] italic text-blush block mb-1">
            Shasha Nails
          </span>
          <div className="text-[9px] tracking-[3px] uppercase text-text-faint mb-4">
            Est. 2022 · Johannesburg, ZA
          </div>
          <p className="text-[12px] text-text-muted leading-[1.8] font-light max-w-[260px]">
            Precision nail artistry for the modern woman. Every set, a signature.
          </p>
          <div className="flex gap-2 mt-5">
            {socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className={`w-9 h-9 rounded-[10px] border border-dark-border bg-transparent flex items-center justify-center text-text-muted transition-all duration-250 cursor-none hover:bg-magenta-glow ${social.hoverColor}`}
                >
                  <IconComponent size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-[9px] tracking-[3px] uppercase text-magenta font-semibold mb-4">
            Navigate
          </h4>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {['Services', 'Gallery', 'About', 'Book Now'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="text-[12px] text-text-muted font-light transition-colors duration-250 cursor-none hover:text-blush"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[9px] tracking-[3px] uppercase text-magenta font-semibold mb-4">
            Services
          </h4>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {['Gel Manicure', 'Nail Extensions', 'Nail Art', 'Soak-Off'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[12px] text-text-muted font-light transition-colors duration-250 cursor-none hover:text-blush"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className="border-t border-dark-border pt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] text-text-faint tracking-[0.5px]">
        <span>
          © 2025 Shasha Nails · All rights reserved
        </span>
      
        <span>
          Built by{' '}
          <a 
            href="https://thembantimanedev.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-blush transition-colors duration-200 underline underline-offset-2 decoration-dark-border hover:decoration-blush cursor-none font-medium"
          >
            Themba Ntimane
          </a>
        </span>

        <span>
          Made with love in Randburg 
        </span>
      </div>
    </footer>
  );
}
