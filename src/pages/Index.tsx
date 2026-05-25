import { useEffect } from "react";
import { Sparkles,  Instagram, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/shasha-logo.png";
import hero from "@/assets/hero-nails.jpg";
import showcasePink from "@/assets/showcase-pink-glow.jpg";
import showcaseFrench from "@/assets/showcase-french-vibes.jpg";
import showcaseBloom from "@/assets/showcase-bloom-nails.jpg";
import About from "@/components/About";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import  Gallery from "@/components/Gallery"
import  Testimonials from "@/components/Testimonials";

const Index = () => {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" aria-hidden />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[hsl(var(--rose)/0.25)] blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-[hsl(var(--blush-deep)/0.4)] blur-3xl" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--blush))] border border-[hsl(var(--blush-deep))] text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                <span>NOW ACCEPTING BOOKINGS</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                <span className="font-serif">Nails that feel like </span>
                <span className="font-script text-gradient-magenta block mt-2"> a love letter.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Hi, I'm Shasha — a licensed nail technician crafting bespoke gel,
                acrylic, and hand-painted designs. Every set is an intimate
                collaboration between you, me, and a little bit of magic.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gradient-magenta text-primary-foreground rounded-full px-8 py-6 text-base hover:scale-105 transition-all shadow-elegant">
                  <a href="#booking">Book Your Session</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                  <a href="#gallery">View Gallery</a>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div>
                  <div className="text-2xl font-serif font-semibold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Happy clients</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="text-2xl font-serif font-semibold text-primary">4.9★</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg. rating</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="text-2xl font-serif font-semibold text-primary">3yrs</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Of artistry</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-[hsl(var(--rose)/0.3)] blur-2xl" aria-hidden />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-elegant border-4 border-[hsl(var(--blush))]">
                <img
                  src={hero}
                  alt="Shasha Nails — luxury manicure flatlay"
                  width={1536}
                  height={1024}
                  className="w-full h-[420px] sm:h-[520px] object-cover"
                />
              </div>
              <img
                src={logo}
                alt=""
                aria-hidden
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-background/95 backdrop-blur p-3 shadow-petal hidden sm:block"
              />
            </div>
          </div>
        </div>
      </section>
<About/>
<Services/>
<Gallery/>
<Testimonials/>
<Booking/>
      <section id="contact" className="py-20 md:py-28 bg-[hsl(var(--blush)/0.5)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-16 md:mb-24">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
              {[
                { src: showcaseFrench, label: "GEL MANICURE", rotate: "sm:-rotate-6 sm:translate-y-6", z: "z-10" },
                { src: showcasePink, label: "S–XL ACRYLIC NAILS", rotate: "sm:rotate-0 sm:-translate-y-4", z: "z-20" },
                { src: showcaseBloom, label: "ACRYLIC OVERLAYS & MORE", rotate: "sm:rotate-6 sm:translate-y-6", z: "z-10" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative w-64 sm:w-56 md:w-64 lg:w-72 sm:-mx-4 ${item.rotate} ${item.z} transition-transform duration-500 hover:-translate-y-2`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-elegant border-4 border-card aspect-[3/4]">
                    <img
                      src={item.src}
                      alt={item.label}
                      loading="lazy"
                      width={576}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-md shadow-petal whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-bold tracking-wider">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts | Hours / Location */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-0 md:divide-x md:divide-foreground/20">
            {/* Contacts */}
            <div className="md:pr-12 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-8">CONTACTS</h3>
              <ul className="space-y-5 inline-block text-left">
                {[
                  { icon: Phone, value: "(909) 817-8164" },
                  { icon: Instagram, value: "@nailsxbyvanessa" },
                  { icon: Mail, value: "hello@shashanails.com" },
                ].map(({ icon: Icon, value }) => (
                  <li key={value} className="flex items-center gap-4">
                    <span className="h-10 w-10 rounded-full border-2 border-foreground/80 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-foreground" />
                    </span>
                    <span className="text-base md:text-lg font-medium tracking-wide uppercase">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours + Location */}
            <div className="md:pl-12 text-center md:text-left space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-6">HOURS</h3>
                <p className="text-lg md:text-xl font-medium">
                  <span className="tracking-wide">MON – FRI</span>
                  <span className="ml-3">1pm – 8pm</span>
                </p>
                <p className="mt-2 text-sm md:text-base tracking-[0.3em] text-primary/70">
                  SAT · SUN CLOSED
                </p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-4">LOCATION</h3>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  Will be given once<br />appointment is made
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


 <Footer />
    </div>
  );
};

export default Index;
