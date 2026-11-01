'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Hook to run GSAP animations safely inside a scoped container
 */
export function useGSAPContext(callback: (context: gsap.Context) => void, deps: any[] = []) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return containerRef;
}

/**
 * Standard GSAP staggered fade-in entrance for elements matching a selector
 */
export function animateFadeInUp(
  target: string | Element | Element[],
  options: { delay?: number; stagger?: number; y?: number; duration?: number } = {}
) {
  const { delay = 0.1, stagger = 0.1, y = 30, duration = 0.85 } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    }
  );
}

/**
 * Standard GSAP count up animation for numbers
 */
export function animateCounter(
  targetElement: HTMLElement,
  endValue: number,
  options: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const { duration = 1.8, suffix = '', prefix = '' } = options;
  const obj = { val: 0 };

  return gsap.to(obj, {
    val: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      if (targetElement) {
        targetElement.innerText = `${prefix}${Math.round(obj.val)}${suffix}`;
      }
    },
  });
}
