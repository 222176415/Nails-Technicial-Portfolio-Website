const ImageSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-[#1E0F18] ${className}`}
    aria-hidden="true"
  >
    {/* Shimmer sweep */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-[rgba(194,0,95,0.07)] to-transparent" />
    {/* Floral pulse dot */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 opacity-20">
        <svg
          width="28" height="28" viewBox="0 0 28 28"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          <circle cx="14" cy="14" r="3" fill="#C2005F" />
          {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <ellipse
              key={i}
              cx="14" cy="14" rx="2" ry="5"
              fill="#C2005F" opacity="0.6"
              transform={`rotate(${deg} 14 14) translate(0 -8)`}
            />
          ))}
        </svg>
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#C2005F",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
          }}
        >
          Loading
        </span>
      </div>
    </div>
  </div>
);

export default ImageSkeleton;