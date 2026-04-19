"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ArrowLeft, Star } from "lucide-react";
import LoanForm   from "@/components/LoanForm";
import ResultCard from "@/components/ResultCard";
import { calculateScore } from "@/lib/calculateScore";
import { api } from "@/lib/api";
import type { ApplicantProfile, CredScoreResult } from "@/types";

// Small trust signal sidebar
function TrustSidebar() {
  const points = [
    { emoji: "⚡", text: "Instant result" },
    { emoji: "🔒", text: "Data never shared" },
    { emoji: "📊", text: "Score fully explained" },
    { emoji: "🎯", text: "No CIBIL required" },
  ];
  const reviews = [
    { name: "Priya K.",   text: "Got my score in under 2 minutes. Amazing!",    stars: 5 },
    { name: "Arjun M.",   text: "Transparent scoring — finally fair lending.",   stars: 5 },
    { name: "Sneha R.",   text: "Helped me get ₹1.5L for my cloud certs.",      stars: 5 },
  ];

  return (
    <div className="hidden lg:flex flex-col gap-6 w-72 shrink-0">
      {/* Trust points */}
      <div className="rounded-2xl border border-surface-200 bg-white p-5 flex flex-col gap-3">
        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
          Why CredSkill
        </p>
        {points.map(({ emoji, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-sm text-surface-700">
            <span className="text-base">{emoji}</span>
            {text}
          </div>
        ))}
      </div>

      {/* Mini reviews */}
      <div className="rounded-2xl border border-surface-200 bg-white p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
          What applicants say
        </p>
        {reviews.map(({ name, text, stars }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-surface-600 leading-relaxed">&quot;{text}&quot;</p>
            <p className="text-xs font-semibold text-surface-500">— {name}</p>
          </div>
        ))}
      </div>

      {/* Score bands quick ref */}
      <div className="rounded-2xl border border-surface-200 bg-surface-50 p-5 flex flex-col gap-3">
        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
          Score bands
        </p>
        {[
          { grade: "S", amount: "₹5,00,000", color: "text-violet-600" },
          { grade: "A", amount: "₹3,00,000", color: "text-amber-600" },
          { grade: "B", amount: "₹1,50,000", color: "text-slate-600" },
          { grade: "C", amount: "₹75,000",   color: "text-orange-700" },
        ].map(({ grade, amount, color }) => (
          <div key={grade} className="flex items-center justify-between text-xs">
            <span className={`font-display font-bold text-lg ${color}`}>{grade}</span>
            <span className="font-medium text-surface-700">{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ApplyPage() {
  const [result,        setResult]        = useState<CredScoreResult | null>(null);
  const [applicantName, setApplicantName] = useState("");

  const handleResult = (profile: ApplicantProfile) => {
    setApplicantName(profile.name);
    const score = calculateScore(profile);
    setResult(score);

    const storedUserId = localStorage.getItem("credskill_user_id");
    if (storedUserId) {
      const userId = Number.parseInt(storedUserId, 10);
      if (!Number.isNaN(userId) && userId > 0) {
        void api.saveProfile(userId, profile).catch(() => {
          // Silent fail: score display should never be blocked by background persistence.
        });
      }
    }

    // Smooth scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setResult(null);
    setApplicantName("");
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Top bar */}
      <div className="bg-white border-b border-surface-200 px-4 sm:px-6 h-14 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <Link href="/" className="flex items-center gap-1.5">
          <span className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-base text-surface-900">
            Cred<span className="text-brand-600">Skill</span>
          </span>
        </Link>
        <div className="w-24" /> {/* spacer */}
      </div>

      {/* Page content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-surface-900 tracking-tight mb-3">
            {result ? "Your CredScore is ready" : "Calculate your CredScore"}
          </h1>
          <p className="text-surface-600 max-w-md mx-auto">
            {result
              ? "Here's your personalised loan eligibility based on your skills."
              : "Fill in your profile below to instantly see your skill-based loan eligibility."}
          </p>
        </div>

        {/* Main layout: form/result + sidebar */}
        <div className="flex gap-8 items-start justify-center">
          <div className="flex-1 max-w-xl">
            {result ? (
              <ResultCard
                result={result}
                applicantName={applicantName}
                onReset={handleReset}
              />
            ) : (
              <LoanForm onResult={handleResult} />
            )}
          </div>
          <TrustSidebar />
        </div>
      </div>
    </div>
  );
}
