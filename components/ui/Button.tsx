import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-semibold text-sm",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-500/25 hover:shadow-brand-500/40",
        secondary:
          "bg-white border border-surface-200 text-surface-700 hover:bg-surface-50 hover:border-brand-200",
        ghost:
          "bg-transparent text-surface-600 hover:bg-surface-100 hover:text-surface-900",
        danger:
          "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-400/25",
        outline:
          "border border-brand-300 text-brand-700 bg-brand-50 hover:bg-brand-100",
      },
      size: {
        sm:   "px-3.5 py-2 text-xs rounded-lg",
        md:   "px-5 py-2.5 text-sm",
        lg:   "px-7 py-3.5 text-base",
        icon: "w-9 h-9 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
