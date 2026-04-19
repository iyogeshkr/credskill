"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features",     href: "/#features" },
  { label: "FAQ",          href: "/#faq" },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-surface-200/60 shadow-sm shadow-brand-100/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display font-800 text-lg tracking-tight text-surface-900">
            Cred<span className="text-brand-600">Skill</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/apply"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/25 hover:shadow-brand-500/40"
          >
            Check eligibility
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2.5 rounded-xl border border-surface-200 text-surface-700 hover:bg-surface-50 transition-colors"
          >
            Login / Signup
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-surface-200/60 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-surface-700 py-2 hover:text-brand-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apply"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center text-sm font-semibold px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          >
            Check eligibility
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="text-center text-sm font-medium text-surface-700 py-2 hover:text-brand-600 transition-colors"
          >
            Login / Signup
          </Link>
        </div>
      )}
    </header>
  );
}
