/**
 * UI Primitives — Badge, Card, Input, Select, ProgressBar, Separator
 * All styled to CredSkill's design system.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Badge ────────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border transition-colors",
  {
    variants: {
      variant: {
        default:  "bg-surface-100 text-surface-700 border-surface-200",
        brand:    "bg-brand-100 text-brand-800 border-brand-200",
        success:  "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning:  "bg-amber-50 text-amber-700 border-amber-200",
        danger:   "bg-red-50 text-red-600 border-red-200",
        violet:   "bg-violet-100 text-violet-800 border-violet-200",
        outline:  "bg-transparent text-surface-600 border-surface-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

export function Card({
  className,
  children,
  hover = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-200 bg-white p-6",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display font-semibold text-surface-900", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-surface-500 leading-relaxed", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 flex items-center gap-3 pt-4 border-t border-surface-100", className)}
      {...props}
    />
  );
}

// ── Input ────────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, ...props }, ref) => (
    <div className="relative">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border bg-surface-50 text-sm text-surface-800",
          "placeholder:text-surface-400",
          "focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400",
          "transition-all",
          icon && "pl-10",
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-surface-200",
          className
        )}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";

// ── Select ───────────────────────────────────────────────────────────────────

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 rounded-xl border bg-surface-50 text-sm text-surface-800",
        "focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400",
        "appearance-none cursor-pointer transition-all",
        error
          ? "border-red-300 focus:border-red-400"
          : "border-surface-200",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

// ── ProgressBar ──────────────────────────────────────────────────────────────

export function ProgressBar({
  value,
  max = 100,
  className,
  colorClass = "bg-brand-500",
  animated = true,
}: {
  value: number;
  max?: number;
  className?: string;
  colorClass?: string;
  animated?: boolean;
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div
      className={cn("h-1.5 w-full rounded-full bg-surface-100 overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={cn("h-full rounded-full", colorClass, animated && "transition-all duration-700")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Separator ────────────────────────────────────────────────────────────────

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "bg-surface-200",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      role="separator"
    />
  );
}

// ── ScoreRing (reusable) ──────────────────────────────────────────────────────

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 10,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const r    = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const cx   = size / 2;
  const offset = circ - (score / 100) * circ;

  const color =
    score >= 75 ? "#5b6ef2"
    : score >= 60 ? "#F59E0B"
    : score >= 45 ? "#f97316"
    : "#EF4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={cx} cy={cx} r={r}
          stroke="#e2e6f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={cx} cy={cx} r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="score-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-bold tabular-nums"
          style={{ fontSize: size * 0.22 }}
        >
          {score}
        </span>
        <span className="text-[10px] text-surface-400 uppercase tracking-widest font-semibold">
          score
        </span>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-surface-100",
        className
      )}
      {...props}
    />
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: string | number;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-2xl border border-surface-200 bg-surface-50 p-5",
        className
      )}
    >
      <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
        {label}
      </span>
      <span className="font-display font-bold text-2xl text-surface-900">{value}</span>
      {sub && <span className="text-xs text-surface-400">{sub}</span>}
    </div>
  );
}
