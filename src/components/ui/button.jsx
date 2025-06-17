import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 relative overflow-hidden group active:scale-[0.98] transform-gpu select-none",
  {
    variants: {
      variant: {
        // Primary - Modern blue gradient
        default:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 border-0 rounded-xl",

        // Success - Fresh green
        success:
          "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 border-0 rounded-xl",

        // Danger - Modern red
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 border-0 rounded-xl",

        // Warning - Warm orange
        warning:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 border-0 rounded-xl",

        // Secondary - Elegant gray
        secondary:
          "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5 border border-slate-200/60 rounded-xl dark:from-slate-800 dark:to-slate-700 dark:text-slate-200 dark:border-slate-700",

        // Outline - Clean border style
        outline:
          "bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 shadow-sm hover:shadow-lg hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 rounded-xl dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:border-slate-600",

        // Ghost - Minimal hover
        ghost:
          "text-slate-700 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 rounded-xl dark:text-slate-300 dark:hover:bg-slate-800",

        // Link - Simple text button
        link: "text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline rounded-lg dark:text-blue-400 dark:hover:text-blue-300",

        // Glass - Modern glassmorphism
        glass:
          "bg-white/20 backdrop-blur-xl border border-white/30 text-slate-700 shadow-xl hover:bg-white/30 hover:shadow-2xl hover:-translate-y-0.5 rounded-2xl dark:bg-black/20 dark:border-white/10 dark:text-slate-200 dark:hover:bg-black/30",

        // Gradient - Purple to pink
        gradient:
          "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35 hover:-translate-y-0.5 rounded-xl",

        // Premium - Gold accent
        premium:
          "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-400/25 hover:shadow-xl hover:shadow-yellow-400/35 hover:-translate-y-0.5 font-semibold rounded-xl border border-yellow-300/50",

        // Soft - Pastel colors
        soft: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-sm hover:shadow-lg hover:from-blue-200 hover:to-indigo-200 hover:-translate-y-0.5 border border-blue-200/50 rounded-xl dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 dark:border-blue-800/30",
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-lg gap-1.5",
        sm: "h-8 px-4 text-sm rounded-xl gap-2",
        default: "h-10 px-6 text-sm rounded-xl gap-2.5",
        lg: "h-12 px-8 text-base rounded-xl gap-3 font-semibold",
        xl: "h-14 px-10 text-lg rounded-2xl gap-3 font-semibold",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
)

function Button({ className, variant, size, fullWidth, asChild = false, children, ...props }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, fullWidth, className }))} {...props}>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </Comp>
  )
}

export { Button, buttonVariants }
