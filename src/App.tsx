import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import useGlobalInteractions from "./hooks/useGlobalInteractions";

import Index from "./pages/Index";
import Article from "./pages/Article";
import Wellness from "./pages/Wellness";
import Travel from "./pages/Travel";
import Creativity from "./pages/Creativity";
import Growth from "./pages/Growth";
import About from "./pages/About";
import Authors from "./pages/Authors";
import Contact from "./pages/Contact";
import StyleGuide from "./pages/StyleGuide";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import BookingQuestionnaire from "./components/BookingQuestionnaire"; 


const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  useGlobalInteractions(location.pathname);

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/"             element={<Index />} />
        <Route path="/article/:id"  element={<Article />} />
        <Route path="/wellness"     element={<Wellness />} />
        <Route path="/travel"       element={<Travel />} />
        <Route path="/creativity"   element={<Creativity />} />
        <Route path="/growth"       element={<Growth />} />
        <Route path="/about"        element={<About />} />
        <Route path="/authors"      element={<Authors />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/style-guide"  element={<StyleGuide />} />
        <Route path="/privacy"      element={<Privacy />} />
        <Route path="/terms"        element={<Terms />} />
        <Route path="/quote"        element={<BookingQuestionnaire />} /> {/* ← add this */}
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;