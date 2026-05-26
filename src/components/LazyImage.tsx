import { useImageLoader } from "@/hooks/useImageLoader";
import ImageSkeleton from "./ImageSkeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;         // skip lazy — for hero/above-fold images
  objectFit?: "cover" | "contain" | "fill" | "none";
  onLoad?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  width,
  height,
  priority = false,
  objectFit = "cover",
  onLoad,
}: LazyImageProps) => {
  const { ref, isLoaded, isInView, hasError } = useImageLoader(src, {
    rootMargin: priority ? "0px" : "300px",
    threshold: 0,
  });

  const shouldLoad = priority || isInView;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton — visible until image loads */}
      {!isLoaded && !hasError && (
        <ImageSkeleton
          className={`absolute inset-0 ${skeletonClassName}`}
        />
      )}

      {/* Actual image — only injected into DOM when in viewport */}
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          onLoad={onLoad}
          className={`
            w-full h-full transition-opacity duration-500 ease-out
            ${objectFit === "cover"   ? "object-cover"   : ""}
            ${objectFit === "contain" ? "object-contain" : ""}
            ${isLoaded
              ? "opacity-100 animate-fade-in"
              : "opacity-0"
            }
          `}
          style={{ objectFit }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1E0F18] gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(194,0,95,0.4)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 16l5-5 4 4 3-3 6 6"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
          </svg>
          <span
            style={{
              fontSize: "9px", letterSpacing: "2px",
              textTransform: "uppercase", color: "rgba(194,0,95,0.4)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Image unavailable
          </span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;