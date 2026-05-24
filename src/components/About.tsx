import React from 'react';

export default function About() {
  const credentials = [
    { text: 'Professional Training', boldText: 'Certified Nail Technician' },
    { text: 'Since 2022', boldText: '3+ Years Experience' },
    { text: '12+ Techniques', boldText: 'Gel · Acrylic · Nail Art' },
    { text: 'Studio appointments & Special arrangements', boldText: 'Johannesburg Based' },
    { text: 'Available for trusted clients', boldText: 'House Calls' }, // New line added
  ];

  return (
    <section id="about" className="bg-dark-card py-12 px-6 md:px-12">
      
      {/* Section Eyebrow Header */}
      <div className="section-eyebrow reveal mb-2 text-[12px] tracking-[3px] uppercase text-text-faint">
        About
      </div>
      <h2 className="section-heading reveal text-3xl font-light text-text-primary mb-8">
        The <em className="font-['Playfair_Display'] italic font-normal text-blush">Artist</em>
      </h2>
 
      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mt-12">
        
        {/* Visual Frame Block */}
        <div className="about-visual relative reveal w-full">
          <div className="w-full h-[400px] md:h-[500px] rounded-[20px] overflow-hidden border border-dark-border bg-dark relative group">
            
            {/* Main Artist Photo Layer */}
            <img 
              src="https://unsplash.com" 
              alt="Shasha Nails Artist" 
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
            
            {/* Subtle Gradient Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
          
          {/* Glassmorphic Floating Badge */}
          <div className="absolute -bottom-4 right-4 z-10 bg-dark-card/80 border border-dark-border rounded-[14px] p-4 md:p-5 backdrop-blur-[12px] bg-gradient-to-br from-[#1A0510]/90 to-[#0E0608]/90 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="font-['Playfair_Display'] text-[28px] text-white leading-none">
              500+
            </div>
            <div className="text-[9px] tracking-[2px] uppercase text-text-muted mt-0.5 text-white/70">
              Nails Done
            </div>
          </div>
        </div>
 
        {/* Biography & Achievements Content Column */}
        <div className="about-content reveal reveal-delay-2">
          
          {/* Catch Phrase Header */}
          <h3 className="text-xl md:text-2xl font-light text-text-primary leading-snug mb-4">
            Crafting luxury sets, <span className="font-['Playfair_Display'] italic text-blush">one signature</span> stroke at a time.
          </h3>

          <p className="text-[13px] md:text-[15px] text-text-muted leading-[1.9] font-light mb-6 md:mb-8">
            Based in Johannesburg, Shasha has been turning nails into art since 2022. With a deep passion for precision, creativity, and client care, every appointment is a tailored experience — not just a service. From intricate custom art to flawless classic gels, each set is designed to tell your story beautifully.
          </p>
 
          {/* Credentials Stack */}
          <div className="flex flex-col gap-3">
            {credentials.map((cred, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3.5 p-3.5 border border-dark-border bg-[rgba(245,198,216,0.02)] rounded-[10px] transition-all duration-300 hover:border-[rgba(194,0,95,0.4)] hover:bg-[rgba(245,198,216,0.04)]"
              >
                {/* Glowing Indicator Dot */}
                <div className="w-2 h-2 rounded-full bg-magenta flex-shrink-0 shadow-[0_0_8px_#d946ef]" />
                <div className="text-[12px] text-text-muted font-normal">
                  <strong className="text-text-primary font-medium">{cred.boldText}</strong> · {cred.text}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
