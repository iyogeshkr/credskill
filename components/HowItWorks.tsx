"use client";

import { UserPlus, Cpu, BadgeCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon:   UserPlus,
    title:  "Build your profile",
    description:
      "Enter your skills, education, and profession. Link your GitHub or portfolio for bonus points. Takes under 2 minutes.",
    detail: "No documents or salary slips required",
  },
  {
    number: "02",
    icon:   Cpu,
    title:  "Get your CredScore",
    description:
      "Our engine calculates a 0–100 CredScore in real time, weighted by skill demand, diversity, and career trajectory.",
    detail: "Score breakdown shown transparently",
  },
  {
    number: "03",
    icon:   BadgeCheck,
    title:  "See your loan offer",
    description:
      "Based on your CredScore, we show eligible loan amounts and interest rates — from ₹75,000 up to ₹5,00,000.",
    detail: "Rates from 8.5% for top scores",
  },
];

// Connector line between steps (desktop)
function Connector() {
  return (
    <div className="hidden lg:flex items-center flex-1 px-4">
      <div className="w-full h-px border-t-2 border-dashed border-brand-200" />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-surface-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-600 uppercase mb-4">
            The process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight mb-4">
            From skills to loan in{" "}
            <span className="text-gradient">3 simple steps</span>
          </h2>
          <p className="text-surface-600 leading-relaxed">
            No CIBIL score. No income proof. Just your skills.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start gap-0">
          {STEPS.map(({ number, icon: Icon, title, description, detail }, i) => (
            <div key={title} className="flex flex-col lg:flex-row items-start flex-1">
              <div className="relative flex flex-col items-start gap-5 p-6 sm:p-8 lg:p-0 lg:items-start w-full">
                {/* Step number + icon */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-900 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                      {number.slice(1)}
                    </span>
                  </div>
                  <span className="font-mono text-5xl font-bold text-brand-100 select-none">
                    {number}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 max-w-xs">
                  <h3 className="font-display font-semibold text-lg text-surface-900">
                    {title}
                  </h3>
                  <p className="text-sm text-surface-600 leading-relaxed">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-600 font-medium">
                    <span className="w-1 h-1 rounded-full bg-brand-400" />
                    {detail}
                  </span>
                </div>

                {/* Mobile connector arrow */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center w-14 py-2">
                    <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                      <path d="M7 0v20M1 14l6 6 6-6" stroke="#a4bcfc" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Desktop connector */}
              {i < STEPS.length - 1 && <Connector />}
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-600 to-brand-500 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display font-bold text-xl text-white">
              Ready to see your CredScore?
            </p>
            <p className="text-brand-200 text-sm mt-1">
              Takes 2 minutes. No documents needed.
            </p>
          </div>
          <a
            href="/apply"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors shadow-md"
          >
            Apply now — it&apos;s free
          </a>
        </div>
      </div>
    </section>
  );
}
