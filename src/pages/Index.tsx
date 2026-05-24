import { useEffect } from "react";
import { Sparkles, Heart, Star, MapPin, Clock, Instagram, Phone, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/shasha-logo.png";
import hero from "@/assets/hero-nails.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import showcasePink from "@/assets/showcase-pink-glow.jpg";
import showcaseFrench from "@/assets/showcase-french-vibes.jpg";
import showcaseBloom from "@/assets/showcase-bloom-nails.jpg";
import About from "@/components/About";
import Services from "@/components/Services";


const gallery = [
  { src: g1, alt: "French manicure with gold accents" },
  { src: g2, alt: "Chrome rose gold almond nails" },
  { src: g3, alt: "Floral hand-painted nail art" },
  { src: g4, alt: "Glittery pink stiletto nails" },
  { src: g5, alt: "Milky white pearl bridal nails" },
  { src: g6, alt: "Burgundy glossy almond nails" },
];

const testimonials = [
  {
    name: "Amelia R.",
    role: "Returning client",
    quote: "Shasha is a true artist. My nails have never looked this good — every set feels custom-made for me.",
    rating: 5,
  },
  {
    name: "Jasmine K.",
    role: "Bride 2024",
    quote: "She did my bridal nails and I was speechless. So delicate, so elegant. Worth every penny.",
    rating: 5,
  },
  {
    name: "Noor A.",
    role: "Monthly regular",
    quote: "The studio is calm, clean, and Shasha is the warmest. I look forward to every appointment.",
    rating: 5,
  },
];

const Index = () => {
  useEffect(() => {
    // Calendly inline widget script (placeholder — swap URL when ready)
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

      {/* HERO */}
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


      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-script text-3xl text-accent">portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Recent work</h2>
            <p className="text-muted-foreground text-lg">
              A peek inside the studio. Each set is one-of-one.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl shadow-petal hover:shadow-elegant transition-all duration-500 ${
                  i % 5 === 0 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-primary-foreground text-sm font-medium">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 bg-[hsl(var(--blush)/0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-script text-3xl text-accent">love letters</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">What clients say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-8 rounded-3xl border-border bg-card/80 hover:shadow-petal transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-serif text-lg">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="font-script text-3xl text-accent">book a session</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
              Pick a time that <em className="text-gradient-magenta not-italic">works for you</em>
            </h2>
            <p className="text-muted-foreground text-lg">
              Real-time availability via Calendly. You'll receive a confirmation email immediately.
            </p>
          </div>

          <div className="rounded-[2rem] overflow-hidden border-2 border-[hsl(var(--blush-deep))] bg-card shadow-elegant">
            {/* Calendly inline widget — replace data-url with your own link */}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/your-link/nail-session?hide_gdpr_banner=1&primary_color=c2185b"
              style={{ minWidth: "320px", height: "720px" }}
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Calendly link is a placeholder — replace <code className="font-mono">data-url</code> in <code className="font-mono">Index.tsx</code> with your real Calendly URL.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-28 bg-[hsl(var(--blush)/0.5)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tilted overlapping showcase cards */}
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
