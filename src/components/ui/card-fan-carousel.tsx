"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, ArrowLeft } from "lucide-react";

export interface CardItem {
  imgUrl: string;
  cdnUrl?: string;
  title?: string;
  category?: string;
  alt?: string;
  linkUrl?: string;
}

export interface CardFanCarouselProps {
  cards: CardItem[];
  className?: string;
}

const MAX_VISIBLE = 7;
const HALF = 3;

// Fan slot configuration for the 7 visible cards: slots 0 to 6 (with center at slot 3)
const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 10 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 15 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 20 },
  { rot: 0,   scale: 1.0000, x: 0,   y: 0.0, zIndex: 28 }, // Center card
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 20 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 15 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 10 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.52;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  if (width < 480) return 0.72;
  if (width < 640) return 0.82;
  if (width < 768) return 0.90;
  if (width < 1024) return 0.95;
  return 1.0;
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border border-white/15 bg-[#0a140c]/80 backdrop-blur-xl text-neutral-300 hover:text-[#00FC43] hover:border-[#00FC43]/60 hover:bg-[#00FC43]/10 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(0,252,67,0.35)] active:scale-95 transition-all duration-300";

export function CardFanCarousel({ cards, className }: CardFanCarouselProps) {
  const totalCards = cards.length;
  // Center initially on card 3 (or middle)
  const [centerIndex, setCenterIndex] = useState(totalCards > MAX_VISIBLE ? 3 : totalCards >> 1);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  const touchStartX = useRef<number | null>(null);

  // Measure window width on client
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mult = getResponsiveMultiplier(windowWidth);
  const hMult = getHeightMultiplier(windowWidth);

  const cycle = useCallback((direction: "left" | "right") => {
    if (totalCards <= 1) return;
    setCenterIndex((prev) =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedCard) return; // Lightbox handles its own keys
      if (e.key === "ArrowLeft") cycle("left");
      if (e.key === "ArrowRight") cycle("right");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycle, selectedCard]);

  // Lightbox Modal Keyboard & Scroll lock
  const currentCardIndex = selectedCard
    ? cards.findIndex((c) => c.imgUrl === selectedCard.imgUrl)
    : -1;

  const showPrevCard = useCallback(() => {
    if (cards.length === 0) return;
    if (currentCardIndex > 0) {
      setSelectedCard(cards[currentCardIndex - 1]);
    } else {
      setSelectedCard(cards[cards.length - 1]);
    }
  }, [currentCardIndex, cards]);

  const showNextCard = useCallback(() => {
    if (cards.length === 0) return;
    if (currentCardIndex >= 0 && currentCardIndex < cards.length - 1) {
      setSelectedCard(cards[currentCardIndex + 1]);
    } else {
      setSelectedCard(cards[0]);
    }
  }, [currentCardIndex, cards]);

  useEffect(() => {
    if (!selectedCard) return;
    document.body.style.overflow = "hidden";
    const onModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
      if (e.key === "ArrowLeft") showPrevCard();
      if (e.key === "ArrowRight") showNextCard();
    };
    window.addEventListener("keydown", onModalKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onModalKeyDown);
    };
  }, [selectedCard, showPrevCard, showNextCard]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      cycle("left");
    } else if (deltaX < -45) {
      cycle("right");
    }
    touchStartX.current = null;
  };

  if (!totalCards) return null;

  return (
    <section
      className={`flex flex-col items-center w-full py-6 lg:py-10 px-4 md:px-8 relative z-20 select-none ${className || ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div className="fan-layout flex relative justify-center items-center w-full max-w-[80rem]">
          {cards.map((card, index) => {
            // Compute shortest circular offset from centerIndex
            let diff = ((index - centerIndex) % totalCards + totalCards) % totalCards;
            if (diff > totalCards / 2) diff -= totalCards;

            const isVisible = Math.abs(diff) <= HALF;
            const slot = diff + HALF; // 0 to 6
            const isCenter = diff === 0;
            const isHovered = hoveredIndex === index;

            let xRem = 0;
            let yRem = 0;
            let rot = 0;
            let scale = 1.0;
            let zIndex = 0;
            let opacity = 0;
            let pointerEvents: "auto" | "none" = "none";
            let visibility: "visible" | "hidden" = "hidden";

            if (isVisible) {
              const base = FAN_POSITIONS[slot];
              xRem = base.x * mult;
              yRem = base.y * hMult;
              rot = base.rot;
              scale = base.scale;
              zIndex = base.zIndex;
              opacity = 1;
              pointerEvents = "auto";
              visibility = "visible";

              // Hover adjustments
              if (isHovered) {
                yRem -= 2.2 * hMult;
                scale *= isCenter ? 1.06 : 1.08;
                zIndex = 35;
              } else if (hoveredIndex !== null) {
                // If another card is hovered, push side cards gently outward
                let hoveredDiff = ((hoveredIndex - centerIndex) % totalCards + totalCards) % totalCards;
                if (hoveredDiff > totalCards / 2) hoveredDiff -= totalCards;

                if (diff < hoveredDiff) {
                  xRem -= 2.5 * mult;
                  rot -= 2;
                } else if (diff > hoveredDiff) {
                  xRem += 2.5 * mult;
                  rot += 2;
                }
              }
            } else {
              // Offstage hidden cards
              const dir = diff > 0 ? 1 : -1;
              xRem = dir * 38 * mult;
              yRem = 12 * hMult;
              rot = dir * 25;
              scale = 0.4;
              opacity = 0;
              zIndex = 0;
              pointerEvents = "none";
              visibility = "hidden";
            }

            const webpUrl = card.imgUrl.replace(/\.(jpe?g|png)$/i, '.webp');
            const cardInner = (
              <div className="relative w-full h-full overflow-hidden group/card select-none">
                <picture className="absolute inset-0 w-full h-full">
                  <source srcSet={webpUrl} type="image/webp" />
                  <img
                    src={card.imgUrl}
                    loading={isVisible ? "eager" : "lazy"}
                    decoding="async"
                    alt={card.alt || card.title || `Brand Card ${index}`}
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover/card:scale-105"
                    onError={(e) => {
                      if (card.cdnUrl && e.currentTarget.src !== card.cdnUrl) {
                        e.currentTarget.src = card.cdnUrl;
                      }
                    }}
                  />
                </picture>
                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />

                {/* Hover Maximize Icon */}
                <div
                  className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 text-[#00FC43] cursor-pointer hover:bg-[#00FC43] hover:text-[#041608]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard(card);
                  }}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            );

            return (
              <div
                key={index}
                className="fan-card cursor-pointer"
                style={{
                  transform: `translate3d(${xRem.toFixed(2)}rem, ${yRem.toFixed(2)}rem, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                  zIndex,
                  opacity,
                  pointerEvents,
                  visibility,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  if (isCenter) {
                    setSelectedCard(card);
                  } else {
                    setCenterIndex(index);
                  }
                }}
              >
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Arrows and Dots */}
      <div className="flex flex-col items-center justify-center gap-4 mt-8 md:mt-10 z-30">
        <div className="flex items-center justify-center gap-4">
          <button
            className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`}
            onClick={() => cycle("left")}
            aria-label="Previous Brand Card"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-200 group-hover:text-[#00FC43]" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#08120a]/80 border border-white/10 backdrop-blur-md">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCenterIndex(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === centerIndex
                    ? "w-6 h-2 bg-[#00FC43] shadow-[0_0_12px_#00FC43]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to card ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`}
            onClick={() => cycle("right")}
            aria-label="Next Brand Card"
          >
            <ChevronRight className="w-5 h-5 text-neutral-200 group-hover:text-[#00FC43]" />
          </button>
        </div>

        {/* Instruction without numbers */}
        <p className="text-xs font-mono text-neutral-400">
          Click card to center · Click center to inspect
        </p>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setSelectedCard(null)}
        >
          {/* FIXED TOP NAVIGATION BAR - ALWAYS PINNED & VISIBLE */}
          <div
            className="shrink-0 w-full px-4 sm:px-8 py-3.5 bg-[#060c08] border-b border-[#00FC43]/30 flex items-center justify-between z-20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Primary Back Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FC43] text-[#041608] hover:bg-[#00FC43]/90 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(0,252,67,0.4)] active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 font-bold" />
              <span>← Back to Portfolio</span>
            </button>

            {/* Title & Category in Header */}
            <div className="flex flex-col items-center text-center px-2 truncate max-w-[50vw]">
              {selectedCard.category && (
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#00FC43] font-semibold truncate">
                  {selectedCard.category}
                </span>
              )}
              {selectedCard.title && (
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                  {selectedCard.title}
                </h3>
              )}
            </div>

            {/* Close Cross Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MAIN MODAL BODY - IMAGE WITH NEXT/PREV CONTROLS */}
          <div
            className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 relative min-h-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Image Floating Button */}
            <button
              onClick={showPrevCard}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#00FC43] hover:border-[#00FC43] hover:bg-black/90 flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-2xl active:scale-95"
              aria-label="Previous Design"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Image Preview Container */}
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              <img
                src={selectedCard.imgUrl}
                alt={selectedCard.alt || selectedCard.title || "Full Preview"}
                className="max-h-[66vh] max-w-[88vw] object-contain rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] border border-white/15 select-none"
                onError={(e) => {
                  if (selectedCard.cdnUrl && e.currentTarget.src !== selectedCard.cdnUrl) {
                    e.currentTarget.src = selectedCard.cdnUrl;
                  }
                }}
              />
            </div>

            {/* Next Image Floating Button */}
            <button
              onClick={showNextCard}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#00FC43] hover:border-[#00FC43] hover:bg-black/90 flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-2xl active:scale-95"
              aria-label="Next Design"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* FIXED BOTTOM INFO BAR */}
          <div
            className="shrink-0 w-full px-4 sm:px-8 py-3 bg-[#060c08] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00FC43] font-bold">
                Commercial Brand Identity Showcase
              </span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white">→</kbd> to browse, <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white">ESC</kbd> to exit
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-5 py-1.5 rounded-full bg-white/10 hover:bg-[#00FC43] text-white hover:text-[#041608] text-xs font-bold transition-all cursor-pointer"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CardFanCarousel;
