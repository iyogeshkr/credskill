/**
 * calculateScore.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * CredSkill MVP Score Engine
 * Calculates a composite CredScore (0–100) from the applicant's profile.
 *
 * Score composition:
 *   Skill score      → 60 pts  (based on skill weights + count)
 *   Education score  → 20 pts  (degree level)
 *   Portfolio score  → 10 pts  (GitHub/portfolio presence)
 *   Diversity score  → 10 pts  (breadth of skill categories)
 *
 * Loan bands:
 *   S (90–100) → ₹5,00,000  @ 8.5%
 *   A (75–89)  → ₹3,00,000  @ 10.0%
 *   B (60–74)  → ₹1,50,000  @ 12.5%
 *   C (45–59)  → ₹75,000    @ 15.0%
 *   D (0–44)   → Not eligible
 */

import type {
  ApplicantProfile,
  CredScoreResult,
  EducationLevel,
  LoanTier,
  ScoreBreakdown,
  ScoreGrade,
  SkillCategory,
  SkillWeight,
} from "@/types";

// ── Skill registry ──────────────────────────────────────────────────────────

const SKILL_WEIGHTS: SkillWeight[] = [
  // AI / ML (premium)
  { skill: "machine learning", points: 20, category: "ai_ml" },
  { skill: "deep learning",    points: 20, category: "ai_ml" },
  { skill: "ai/ml",            points: 20, category: "ai_ml" },
  { skill: "llm",              points: 18, category: "ai_ml" },
  { skill: "nlp",              points: 16, category: "ai_ml" },
  { skill: "computer vision",  points: 16, category: "ai_ml" },
  { skill: "tensorflow",       points: 12, category: "ai_ml" },
  { skill: "pytorch",          points: 12, category: "ai_ml" },
  { skill: "data science",     points: 15, category: "data" },
  { skill: "data analysis",    points: 10, category: "data" },

  // Web development
  { skill: "react",            points: 10, category: "web_dev" },
  { skill: "next.js",          points: 12, category: "web_dev" },
  { skill: "typescript",       points: 10, category: "web_dev" },
  { skill: "node.js",          points: 10, category: "web_dev" },
  { skill: "javascript",       points: 8,  category: "web_dev" },
  { skill: "vue",              points: 8,  category: "web_dev" },
  { skill: "angular",          points: 8,  category: "web_dev" },
  { skill: "graphql",          points: 8,  category: "web_dev" },
  { skill: "html",             points: 3,  category: "web_dev" },
  { skill: "css",              points: 3,  category: "web_dev" },

  // Backend / systems
  { skill: "python",           points: 10, category: "web_dev" },
  { skill: "rust",             points: 14, category: "web_dev" },
  { skill: "go",               points: 12, category: "web_dev" },
  { skill: "java",             points: 8,  category: "web_dev" },
  { skill: "c++",              points: 10, category: "web_dev" },
  { skill: "django",           points: 8,  category: "web_dev" },
  { skill: "fastapi",          points: 8,  category: "web_dev" },

  // Cloud / DevOps
  { skill: "aws",              points: 12, category: "cloud" },
  { skill: "gcp",              points: 12, category: "cloud" },
  { skill: "azure",            points: 12, category: "cloud" },
  { skill: "docker",           points: 8,  category: "cloud" },
  { skill: "kubernetes",       points: 12, category: "cloud" },
  { skill: "devops",           points: 10, category: "cloud" },
  { skill: "terraform",        points: 10, category: "cloud" },

  // Mobile
  { skill: "react native",     points: 10, category: "mobile" },
  { skill: "flutter",          points: 10, category: "mobile" },
  { skill: "swift",            points: 10, category: "mobile" },
  { skill: "kotlin",           points: 10, category: "mobile" },

  // Data / DB
  { skill: "sql",              points: 6,  category: "data" },
  { skill: "postgresql",       points: 6,  category: "data" },
  { skill: "mongodb",          points: 6,  category: "data" },
  { skill: "redis",            points: 6,  category: "data" },
  { skill: "spark",            points: 10, category: "data" },

  // Design
  { skill: "ui/ux",            points: 8,  category: "design" },
  { skill: "figma",            points: 6,  category: "design" },
  { skill: "product design",   points: 8,  category: "design" },

  // Finance / domain
  { skill: "fintech",          points: 10, category: "finance" },
  { skill: "blockchain",       points: 10, category: "finance" },
  { skill: "solidity",         points: 12, category: "finance" },
];

// ── Loan tier definitions ───────────────────────────────────────────────────

export const LOAN_TIERS: LoanTier[] = [
  { grade: "S", minScore: 90, maxAmount: 500000, interestRate: 8.5,  label: "Platinum", color: "#7C3AED" },
  { grade: "A", minScore: 75, maxAmount: 300000, interestRate: 10.0, label: "Gold",     color: "#D97706" },
  { grade: "B", minScore: 60, maxAmount: 150000, interestRate: 12.5, label: "Silver",   color: "#6B7280" },
  { grade: "C", minScore: 45, maxAmount: 75000,  interestRate: 15.0, label: "Bronze",   color: "#92400E" },
  { grade: "D", minScore: 0,  maxAmount: 0,      interestRate: 0,    label: "None",     color: "#EF4444" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Normalise a skill string for matching */
const normalise = (s: string) => s.toLowerCase().trim();

/** Find the weight entry for a given skill string */
const findWeight = (skill: string): SkillWeight | undefined =>
  SKILL_WEIGHTS.find(
    (w) =>
      normalise(w.skill) === normalise(skill) ||
      normalise(skill).includes(normalise(w.skill))
  );

/** Count unique skill categories present */
const countCategories = (skills: string[]): number => {
  const cats = new Set<SkillCategory>();
  skills.forEach((s) => {
    const w = findWeight(s);
    if (w) cats.add(w.category);
  });
  return cats.size;
};

/** Determine grade from composite score */
const gradeFromScore = (score: number): ScoreGrade => {
  if (score >= 90) return "S";
  if (score >= 75) return "A";
  if (score >= 60) return "B";
  if (score >= 45) return "C";
  return "D";
};

// ── Sub-scorers ──────────────────────────────────────────────────────────────

function computeSkillScore(skills: string[]): number {
  if (skills.length === 0) return 0;
  const raw = skills.reduce((acc, s) => {
    const w = findWeight(s);
    return acc + (w ? w.points : 2); // unknown skills get 2 pts baseline
  }, 0);
  // Diminishing returns: cap at 60, with a soft curve
  return Math.min(Math.round(raw * (60 / Math.max(raw, 60))), 60);
}

function computeEducationScore(level: EducationLevel): number {
  const scores: Record<EducationLevel, number> = {
    phd:         20,
    master:      17,
    bachelor:    13,
    diploma:     9,
    self_taught: 8,
    high_school: 5,
  };
  return scores[level] ?? 5;
}

function computePortfolioScore(profile: ApplicantProfile): number {
  let score = 0;
  if (profile.githubUrl)    score += 6;
  if (profile.portfolioUrl) score += 4;
  return score;
}

function computeDiversityScore(skills: string[]): number {
  const cats = countCategories(skills);
  if (cats >= 4) return 10;
  if (cats === 3) return 7;
  if (cats === 2) return 4;
  if (cats === 1) return 2;
  return 0;
}

// ── Recommendations generator ────────────────────────────────────────────────

function generateRecommendations(
  breakdown: ScoreBreakdown,
  profile: ApplicantProfile
): string[] {
  const tips: string[] = [];

  if (breakdown.skillScore < 30) {
    tips.push("Add high-value skills like Python, React, or AWS to boost your score significantly.");
  }
  if (!profile.githubUrl) {
    tips.push("Link your GitHub profile — it adds up to 6 points to your CredScore.");
  }
  if (!profile.portfolioUrl) {
    tips.push("A portfolio link demonstrates real work and adds 4 points.");
  }
  if (countCategories(profile.skills) < 3) {
    tips.push("Diversify across skill categories (e.g. add a cloud skill to complement your dev skills).");
  }
  if (breakdown.educationScore < 13 && profile.skills.length >= 5) {
    tips.push("Consider formal certifications — they can compensate for education score.");
  }
  if (profile.skills.length < 4) {
    tips.push("List at least 4–6 skills. Each verified skill contributes to your score.");
  }

  return tips.slice(0, 3); // return top 3 tips
}

// ── Main export ──────────────────────────────────────────────────────────────

/**
 * Calculate a CredScore from an applicant's profile.
 * Returns the composite score, grade, loan eligibility, and breakdown.
 */
export function calculateScore(profile: ApplicantProfile): CredScoreResult {
  const breakdown: ScoreBreakdown = {
    skillScore:     computeSkillScore(profile.skills),
    educationScore: computeEducationScore(profile.educationLevel),
    portfolioScore: computePortfolioScore(profile),
    diversityScore: computeDiversityScore(profile.skills),
  };

  const raw =
    breakdown.skillScore +
    breakdown.educationScore +
    breakdown.portfolioScore +
    breakdown.diversityScore;

  // Clamp to 0–100
  const score = Math.min(Math.max(Math.round(raw), 0), 100);
  const grade = gradeFromScore(score);
  const tier  = LOAN_TIERS.find((t) => grade === t.grade)!;

  return {
    score,
    grade,
    eligibleAmount: tier.maxAmount,
    interestRate:   tier.interestRate,
    breakdown,
    recommendations: generateRecommendations(breakdown, profile),
  };
}

/** Format INR amount with commas (Indian format) */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** All skill names for autocomplete suggestions */
export const ALL_SKILLS = SKILL_WEIGHTS.map((w) => w.skill);
