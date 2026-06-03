import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/shasha-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 pill-nav px-4 sm:px-6">
          <div className="flex items-center min-w-0">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="Shasha Nails" className="h-9 sm:h-11 w-auto dark:rounded-lg" />
              <span className="font-script text-xl sm:text-2xl text-primary truncate">Shasha Nails</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <a href="#about" className="text-sm font-medium hover:bg-muted/60 rounded-full px-4 py-2 transition-all">About</a>
            <a href="#services" className="text-sm font-medium hover:bg-muted/60 rounded-full px-4 py-2 transition-all">Services</a>
            <a href="#gallery" className="text-sm font-medium hover:bg-muted/60 rounded-full px-4 py-2 transition-all">Gallery</a>
            <a href="#testimonials" className="text-sm font-medium hover:bg-muted/60 rounded-full px-4 py-2 transition-all">Reviews</a>
            <a href="#contact" className="text-sm font-medium hover:bg-muted/60 rounded-full px-4 py-2 transition-all">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full hover:bg-muted/60 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
            
            <Button asChild className="hidden md:flex gradient-magenta hover:opacity-90 text-primary-foreground rounded-full px-6 py-2 hover:scale-105 transition-all shadow-petal">
           <a href="/quote">Get a Quote</a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 sm:p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 rounded-md  animate-fade-in bg-accent-foreground">
            <nav className="flex flex-col gap-3">
              <a onClick={() => setIsMenuOpen(false)} href="#about" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-muted/60">About</a>
              <a onClick={() => setIsMenuOpen(false)} href="#services" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-muted/60">Services</a>
              <a onClick={() => setIsMenuOpen(false)} href="#gallery" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-muted/60">Gallery</a>
              <a onClick={() => setIsMenuOpen(false)} href="#testimonials" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-muted/60">Reviews</a>
              <a onClick={() => setIsMenuOpen(false)} href="#contact" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-muted/60">Contact</a>
              <Button asChild className="gradient-magenta text-primary-foreground rounded-sm w-full">
                <a href="/quote" onClick={() => setIsMenuOpen(false)}>Get a Quote</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
