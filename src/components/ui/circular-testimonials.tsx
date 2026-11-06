"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

export interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

export interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const validTestimonials = useMemo(
    () => (testimonials || []).filter((t): t is Testimonial => Boolean(t && t.src && t.quote)),
    [testimonials]
  );
  const testimonialsLength = validTestimonials.length;
  const activeTestimonial = useMemo(
    () => validTestimonials[activeIndex] || validTestimonials[0],
    [activeIndex, validTestimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  const resetAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (autoplay && testimonialsLength > 0) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 4500);
    }
  }, [autoplay, testimonialsLength]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [resetAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    resetAutoplay();
  }, [testimonialsLength, resetAutoplay]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    resetAutoplay();
  }, [testimonialsLength, resetAutoplay]);

  if (!validTestimonials || validTestimonials.length === 0) return null;

  // Clean full-photo display: Show the active founder photo fully without overlapping heads
  function getImageStyle(index: number): React.CSSProperties {
    const isActive = index === activeIndex;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1)`,
        transition: "all 0.6s cubic-bezier(.16, 1, 0.3, 1)",
      };
    }
    // Fade out and subtly scale other images cleanly
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(12px) scale(0.96)`,
      transition: "all 0.6s cubic-bezier(.16, 1, 0.3, 1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-container w-full max-w-4xl p-4 sm:p-8">
      <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Images */}
        <div
          className="image-container relative w-full h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-[#00FC43]/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          ref={imageContainerRef}
        >
          {validTestimonials.map((testimonial, index) => (
            <img
              key={`${testimonial.src}-${index}`}
              src={testimonial.src}
              alt={testimonial.name}
              className="testimonial-image absolute inset-0 w-full h-full object-cover object-top rounded-3xl"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="testimonial-content flex flex-col justify-between min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="name font-bold mb-1 tracking-tight"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="designation mb-6 font-mono tracking-wide"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="quote leading-relaxed"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.02 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons flex gap-4 pt-8 md:pt-6">
            <button
              type="button"
              className="arrow-button w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10 active:scale-95"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={18} color={colorArrowFg} />
            </button>
            <button
              type="button"
              className="arrow-button w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10 active:scale-95"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              <FaArrowRight size={18} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
