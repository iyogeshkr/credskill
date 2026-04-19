"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What is a CredScore?",
    a: "CredScore is CredSkill's 0-100 skill-based credit evaluation signal, built from your skills, projects, education, and profile strength.",
  },
  {
    q: "Is CredSkill a licensed lender?",
    a: "Currently an MVP and not a licensed NBFC.",
  },
  {
    q: "How long does the demo score take?",
    a: "Most users can complete the profile and get a score preview in around 2 minutes.",
  },
  {
    q: "How is my data used?",
    a: "Your input is used to generate the score preview and improve the product. We avoid unnecessary sensitive financial data in MVP mode.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      "border-b border-surface-100 last:border-0",
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "font-semibold text-sm sm:text-base transition-colors",
          isOpen ? "text-brand-700" : "text-surface-800 group-hover:text-brand-600"
        )}>
          {q}
        </span>
        <span className={cn(
          "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all",
          isOpen
            ? "bg-brand-600 border-brand-600 text-white"
            : "bg-white border-surface-200 text-surface-500 group-hover:border-brand-300"
        )}>
          {isOpen
            ? <Minus className="w-3 h-3" />
            : <Plus  className="w-3 h-3" />
          }
        </span>
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 pb-5" : "max-h-0"
      )}>
        <p className="text-sm text-surface-600 leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* Left: header */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
              FAQ
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight leading-tight">
              Questions we{" "}
              <span className="text-gradient">always get</span>
            </h2>
            <p className="text-surface-600 text-sm leading-relaxed">
              Everything you need to know about how CredSkill works in MVP mode.
            </p>
            <a
              href="mailto:hello@credskill.in"
              className="self-start text-sm font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4 transition-colors"
            >
              Still have questions? Email us →
            </a>
          </div>

          {/* Right: accordion */}
          <div className="divide-y divide-surface-100 rounded-2xl border border-surface-200 bg-white px-6">
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
