import { useState, useEffect, useRef } from "react";

interface UseImageLoaderOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useImageLoader = (
  src: string,
  options: UseImageLoaderOptions = {}
) => {
  const { threshold = 0.1, rootMargin = "200px" } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isInView || !src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
  }, [isInView, src]);

  return { ref, isLoaded, isInView, hasError };
};