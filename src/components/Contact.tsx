import React from 'react';
import { Phone, Instagram, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const contactDetails = [
    { icon: Phone, label: "Phone", value: "+27 (0) 69 125 5967", link: "tel:+27691255967" },
    { icon: Instagram, label: "Instagram", value: "@nailsbyshasha2025", link: "https://instagram.com/nailsbyshasha2025?igsh=MWM1aDk5dHhzdHhlYg==" },
    { icon: Mail, label: "Email", value: "nsukugold07@gmail.com", link: "mailto:nsukugold07@gmail.com" },
  ];

  const operatingHours = [
    { days: "Monday – Saturday", time: "09:00 – 17:00" },
    { days: "Public Holidays & Sunday", time: "10:00 – 15:00", },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-[hsl(var(--background))] border-t border-[hsl(var(--border))] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 reveal">
          <span className="font-script text-3xl text-[hsl(var(--accent))] block mb-1">
            get in touch
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-[hsl(var(--foreground))]">
            Connect with the <em className="font-['Playfair_Display'] italic font-normal text-primary">Studio</em>
          </h2>
        </div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 reveal">

  <div className="p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col justify-between">
    <div>
      <h3 className="text-xs tracking-[3px] uppercase font-bold text-[hsl(var(--magenta))] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--magenta))]" /> Communications
      </h3>
      <ul className="space-y-4">
        {contactDetails.map(({ icon: Icon, label, value, link }) => (
          <li key={value} className="group">
            <a 
              href={link} 
              target={label === "Instagram" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 text-sm cursor-none text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-200"
            >
              <span className="h-8 w-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] flex items-center justify-center flex-shrink-0 group-hover:border-[hsl(var(--magenta)/0.4)] transition-colors">
                <Icon className="h-4 w-4 text-[hsl(var(--magenta))]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-text-faint">{label}</span>
                <span className="font-medium tracking-wide">{value}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div className="p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col justify-between">
    <div>
      <h3 className="text-xs tracking-[3px] uppercase font-bold text-[hsl(var(--magenta))] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--magenta))]" /> Studio Hours
      </h3>
      <div className="space-y-3.5">
        {operatingHours.map((item, idx) => (
          <div key={idx} className="flex flex-col pb-2 last:border-0 last:pb-0">
            <span className="text-[10px] uppercase tracking-wider text-text-faint">{item.days}</span>
            <span className={`text-sm font-medium ${item.alert ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--foreground))]'}`}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-4 p-2.5 bg-[hsl(var(--secondary)/0.3)] border border-[hsl(var(--magenta)/0.1)] rounded-xl flex items-center gap-2">
      <Clock className="h-3.5 w-3.5 text-[hsl(var(--magenta))] flex-shrink-0" />
      <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Strictly by appointment</span>
    </div>
  </div>
  <div className="p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col justify-between">
    <div className="space-y-3">
      <h3 className="text-xs tracking-[3px] uppercase font-bold text-[hsl(var(--magenta))] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--magenta))]" /> Studio Location
      </h3>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-text-faint">City Base</span>
        <span className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">Johannesburg (RandBurg), ZA</span>
        <span className="text-xs font-medium text-[hsl(var(--foreground))]">- Shop 37 Khanyela Luxe Studios , Ferndale</span>
      </div>
      <p className="text-[11.5px] leading-relaxed text-[hsl(var(--muted-foreground))] font-light">
        Precise map pins and address layout updates are dispatched automatically via email confirmation once an appointment is finalized.
      </p>
    </div>
  </div>


  <div className="p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col justify-between">
    <div className="space-y-3">
      <h3 className="text-xs tracking-[3px] uppercase font-bold text-[hsl(var(--magenta))] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--magenta))]" /> Shop & Policies
      </h3>
      
      <div className="space-y-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-text-faint">Payment Methods</span>
          <span className="text-xs font-medium text-[hsl(var(--foreground))]">Cash, EFT, or Card payments accepted</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-text-faint">Grace Period</span>
          <span className="text-xs font-medium text-[hsl(var(--foreground))]">Late arrivals exceeding 30 minutes subject to cancellation</span>
        </div>
      </div>
    </div>
  </div>

</div>

      </div>
    </section>
  );
}
