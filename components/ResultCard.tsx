"use client";

import { CheckCircle2, XCircle, TrendingUp, Info, RotateCcw } from "lucide-react";
import type { CredScoreResult } from "@/types";
import { LOAN_TIERS } from "@/lib/calculateScore";

interface Props {
  result: CredScoreResult;
  applicantName: string;
  onReset: () => void;
}

// Circular score ring
function ScoreRing({ score }: { score: number }) {
  const r   = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const color =
    score >= 75 ? "#5b6ef2"
    : score >= 60 ? "#F59E0B"
    : score >= 45 ? "#f97316"
    : "#EF4444";

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} stroke="#e2e6f0" strokeWidth="10" fill="none" />
        <circle
          cx="60" cy="60" r={r}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="score-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold text-3xl text-surface-900 tabular-nums">
          {score}
        </span>
        <span className="text-[10px] font-semibold text-surface-500 uppercase tracking-widest">
          CredScore
        </span>
      </div>
    </div>
  );
}

// Score breakdown bar
function BreakdownBar({
  label,
  value,
  max,
  color = "bg-brand-500",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-surface-700">{label}</span>
        <span className="text-xs font-mono text-surface-500">
          {value} / {max}
        </span>
      </div>
      <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// Grade badge
function GradeBadge({ grade }: { grade: string }) {
  const tier = LOAN_TIERS.find((t) => t.grade === grade);
  const colors: Record<string, string> = {
    S: "bg-violet-100 text-violet-800 border-violet-200",
    A: "bg-amber-100 text-amber-800 border-amber-200",
    B: "bg-surface-100 text-surface-700 border-surface-200",
    C: "bg-orange-100 text-orange-800 border-orange-200",
    D: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${colors[grade] ?? colors["D"]}`}>
      {tier?.label ?? "Not eligible"} tier
    </div>
  );
}

export default function ResultCard({ result, applicantName, onReset }: Props) {
  const { score, grade, eligibleAmount, interestRate, breakdown, recommendations } = result;
  const isEligible = eligibleAmount > 0;

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style:                 "currency",
    currency:              "INR",
    maximumFractionDigits: 0,
  }).format(eligibleAmount);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 animate-fade-up">
      {/* ── Main score card ── */}
      <div className="rounded-3xl border border-surface-200 bg-white shadow-xl shadow-surface-200/60 overflow-hidden">
        {/* Header band */}
        <div className={`px-6 py-4 flex items-center justify-between ${
          isEligible
            ? "bg-gradient-to-r from-brand-600 to-brand-500"
            : "bg-gradient-to-r from-red-500 to-red-600"
        }`}>
          <div>
            <p className="text-white/80 text-sm">Hi, {applicantName}</p>
            <p className="text-white font-display font-bold text-lg">
              Your CredScore is ready
            </p>
          </div>
          <GradeBadge grade={grade} />
        </div>

        {/* Score + eligibility */}
        <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-surface-100">
          <ScoreRing score={score} />

          <div className="flex flex-col gap-3 flex-1 text-center sm:text-left">
            {isEligible ? (
              <>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-emerald-700 text-sm">
                      Loan eligible
                    </span>
                  </div>
                  <p className="font-display font-bold text-4xl text-surface-900">
                    {formattedAmount}
                  </p>
                  <p className="text-surface-500 text-sm">
                    Maximum eligible loan amount
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <div className="px-3 py-1.5 rounded-xl bg-surface-50 border border-surface-200 text-xs">
                    <span className="text-surface-500">Interest rate: </span>
                    <span className="font-semibold text-surface-800">
                      {interestRate}% p.a.
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-surface-50 border border-surface-200 text-xs">
                    <span className="text-surface-500">Tenure: </span>
                    <span className="font-semibold text-surface-800">Up to 36 months</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="font-semibold text-red-600 text-sm">
                    Not yet eligible
                  </span>
                </div>
                <p className="text-surface-600 text-sm leading-relaxed">
                  Your current score of <strong>{score}</strong> is below the minimum
                  threshold of 45. Improve your profile and re-apply.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Score breakdown */}
        <div className="p-6 flex flex-col gap-4 border-b border-surface-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-semibold text-surface-800">
              Score breakdown
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <BreakdownBar
              label="Skill score (40% weight)"
              value={breakdown.skillScore}
              max={60}
              color="bg-brand-500"
            />
            <BreakdownBar
              label="Education score"
              value={breakdown.educationScore}
              max={20}
              color="bg-violet-500"
            />
            <BreakdownBar
              label="Portfolio & links"
              value={breakdown.portfolioScore}
              max={10}
              color="bg-teal-500"
            />
            <BreakdownBar
              label="Skill diversity"
              value={breakdown.diversityScore}
              max={10}
              color="bg-amber-500"
            />
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-semibold text-surface-800">
                How to improve your score
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {recommendations.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-surface-600"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-surface-200 bg-white text-surface-700 font-semibold text-sm hover:bg-surface-50 hover:border-brand-200 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Re-calculate
        </button>
        {isEligible && (
          <button className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/25">
            Proceed to apply
          </button>
        )}
      </div>

      <p className="text-center text-xs text-surface-400 px-4">
        This is a preliminary estimate. Final loan approval is subject to verification.
        CredSkill MVP — for investor preview only.
      </p>
    </div>
  );
}
