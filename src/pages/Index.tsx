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
import Contact from "@/components/Contact";
import HeroSlideshow from "@/components/HeroSection.tsx";
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
   
      <HeroSlideshow/>
<About/>
<Services/>
<Gallery/>
<Testimonials/>
<Booking/>
<Contact/>    
<Footer />
</div>
  );
};

export default Index;
