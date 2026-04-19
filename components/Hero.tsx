"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Animated floating skill badge
function SkillBadge({
  label,
  points,
  style,
}: {
  label: string;
  points: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-semibold text-surface-800 shadow-lg border border-white/60 animate-pulse-slow"
      style={style}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
      {label}
      <span className="text-brand-600 font-mono">+{points}</span>
    </div>
  );
}

// Animated CredScore visual on the right
function ScoreVisual() {
  const score = 78;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-100/60 to-transparent rounded-full blur-3xl" />

      {/* Main card */}
      <div className="relative z-10 w-72 h-72 sm:w-80 sm:h-80">
        {/* Outer ring SVG */}
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 120 120"
          fill="none"
        >
          {/* Track */}
          <circle
            cx="60" cy="60" r="54"
            stroke="#e2e6f0"
            strokeWidth="8"
            fill="none"
          />
          {/* Score arc */}
          <circle
            cx="60" cy="60" r="54"
            stroke="url(#score-grad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring"
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
          />
          <defs>
            <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#7b96f8" />
              <stop offset="100%" stopColor="#5b6ef2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span className="text-xs font-semibold text-surface-500 tracking-widest uppercase">
            CredScore
          </span>
          <span className="font-display font-bold text-6xl text-surface-900 tabular-nums animate-score-reveal">
            {score}
          </span>
          <span className="text-sm font-medium text-brand-600">Grade A</span>
          <div className="mt-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200">
            <span className="text-xs font-semibold text-brand-700">
              Alternative credit signal
            </span>
          </div>
        </div>
      </div>

      {/* Floating skill badges */}
      <SkillBadge label="IT"      points={10} style={{ top: "10%",  left: "-4%" }} />
      <SkillBadge label="Python"     points={10} style={{ top: "22%",  right: "-8%" }} />
      <SkillBadge label="AI/ML"      points={20} style={{ bottom: "20%", left: "-6%" }} />
      <SkillBadge label="AWS"        points={12} style={{ bottom: "8%",  right: "-4%" }} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-brand" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-brand-100/40 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6 animate-fade-up">
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Credit Evaluation Engine
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-surface-900">
              Skill-Based Credit Score for India&apos;s Next Generation
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-surface-600 leading-relaxed max-w-lg">
              CredSkill evaluates your skills, projects, and potential to generate a{" "}
              <strong className="text-surface-800 font-semibold">CredScore</strong> —
              an alternative to traditional credit scores.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/apply"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5"
              >
                Check My CredScore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#interest"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-surface-200 text-surface-700 font-semibold text-sm hover:bg-surface-50 hover:border-brand-200 transition-all"
              >
                Join Early Access
              </a>
            </div>

            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide">
              <span>🚀</span>
              MVP Preview · Not a lending platform
            </div>
          </div>

          {/* Right: Score visual */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up animate-delay-200 opacity-0-start">
            <ScoreVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
