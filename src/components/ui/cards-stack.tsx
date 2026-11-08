"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number
  incrementY?: number
  incrementZ?: number
  /**
   * Optional custom sticky top offset on desktop.
   */
  topOffset?: number | string
  /**
   * If true, keeps sticky enabled on mobile as well.
   * Default false ensures mobile uses clean, accessible fluid flow without overlapping.
   */
  mobileSticky?: boolean
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 10,
      topOffset,
      mobileSticky = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const y = index * incrementY
    const z = index * incrementZ

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          ["--card-stack-offset" as string]: `${y}px`,
          ["--card-stack-z" as string]: `${z}px`,
          backfaceVisibility: "hidden",
          ...(mobileSticky ? { top: topOffset ?? y, z } : { z }),
          ...style,
        }}
        className={cn(
          "transition-all duration-300",
          mobileSticky ? "sticky" : "relative lg:sticky",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
export default CardSticky
