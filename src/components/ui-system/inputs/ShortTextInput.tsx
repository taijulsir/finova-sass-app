"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
}

export const ShortTextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-foreground/80 ml-1">{label}</label>}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "flex h-11 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm ring-offset-background transition-all",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-medium text-destructive ml-1">{error}</p>}
      </div>
    )
  }
)

ShortTextInput.displayName = "ShortTextInput"
