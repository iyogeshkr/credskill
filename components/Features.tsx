"use client";

import { Brain, Zap, ShieldCheck, Code2 } from "lucide-react";

const FEATURES = [
  {
    icon:        Brain,
    title:       "AI-Based CredScore",
    description:
      "Our model evaluates skills, projects, and profile depth to generate a CredScore signal.",
    color:       "text-violet-600",
    bg:          "bg-violet-50",
    border:      "border-violet-100",
  },
  {
    icon:        Code2,
    title:       "Skill-First Evaluation",
    description:
      "Skills are the primary input, so learners and builders can be assessed beyond legacy credit history.",
    color:       "text-brand-600",
    bg:          "bg-brand-50",
    border:      "border-brand-100",
  },
  {
    icon:        Zap,
    title:       "Instant Score (2 mins)",
    description:
      "Complete a short profile flow and get an immediate score preview in minutes.",
    color:       "text-amber-600",
    bg:          "bg-amber-50",
    border:      "border-amber-100",
  },
  // {
  //   icon:        ShieldCheck,
  //   title:       "Transparent Breakdown",
  //   description:
  //     "See how each section contributes to your CredScore with a clear explanation of the result.",
  //   color:       "text-emerald-600",
  //   bg:          "bg-emerald-50",
  //   border:      "border-emerald-100",
  // },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-600 uppercase mb-4">
            Why CredSkill
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight mb-4">
            Built for modern
            <span className="text-gradient"> credit evaluation</span>
          </h2>
          <p className="text-surface-600 text-lg leading-relaxed">
            A simple scoring layer designed for skills-first profiles.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description, color, bg, border }, i) => (
            <div
              key={title}
              className={`card-hover group relative rounded-2xl border ${border} ${bg} p-6 flex flex-col gap-4`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display font-semibold text-surface-900">
                  {title}
                </h3>
                <p className="text-sm text-surface-600 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Subtle corner accent */}
              <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${color} opacity-40`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
