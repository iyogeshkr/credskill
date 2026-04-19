// ─── Core domain types for CredSkill MVP ───────────────────────────────────

export interface ApplicantProfile {
  name: string;
  email: string;
  educationLevel: EducationLevel;
  profession: string;
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
}

export type EducationLevel =
  | "high_school"
  | "diploma"
  | "bachelor"
  | "master"
  | "phd"
  | "self_taught";

export interface CredScoreResult {
  score: number;              // 0–100
  grade: ScoreGrade;          // S / A / B / C / D
  eligibleAmount: number;     // in INR
  interestRate: number;       // annual %
  breakdown: ScoreBreakdown;
  recommendations: string[];
}

export interface ScoreBreakdown {
  skillScore: number;         // 0–60
  educationScore: number;     // 0–20
  portfolioScore: number;     // 0–10
  diversityScore: number;     // 0–10
}

export type ScoreGrade = "S" | "A" | "B" | "C" | "D";

export interface SkillWeight {
  skill: string;
  points: number;
  category: SkillCategory;
}

export type SkillCategory =
  | "ai_ml"
  | "web_dev"
  | "data"
  | "mobile"
  | "cloud"
  | "design"
  | "finance"
  | "other";

export interface LoanTier {
  grade: ScoreGrade;
  minScore: number;
  maxAmount: number;
  interestRate: number;
  label: string;
  color: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}
