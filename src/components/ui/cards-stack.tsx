"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number
  incrementY?: number
  incrementZ?: number
  topOffset?: number | string
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
      incrementY = 8,
      incrementZ = 10,
      topOffset,
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
          top: topOffset !== undefined ? topOffset : undefined,
          ["--card-stack-offset" as string]: `${y}px`,
          ["--card-stack-z" as string]: `${z}px`,
          zIndex: 10 + index,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn("sticky", className)}
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
