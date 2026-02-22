"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const DangerButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, children, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl h-10 px-4 py-2",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm font-medium transition-all shadow-sm",
          "hover:scale-[1.01] active:scale-[0.99]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="w-4 h-4">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="w-4 h-4">{rightIcon}</span>}
      </button>
    )
  }
)

DangerButton.displayName = "DangerButton"
