"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User, Mail, GraduationCap, Briefcase, Code2, Link,
  X, Plus, ChevronRight, ChevronLeft, Loader2
} from "lucide-react";
import type { ApplicantProfile, EducationLevel } from "@/types";
import { ALL_SKILLS } from "@/lib/calculateScore";

// ── Validation schema ────────────────────────────────────────────────────────

const schema = z.object({
  name:           z.string().min(2, "Enter your full name"),
  email:          z.string().email("Enter a valid email"),
  educationLevel: z.enum(["high_school","diploma","bachelor","master","phd","self_taught"] as const),
  profession:     z.string().min(2, "Enter your profession or student status"),
  portfolioUrl:   z.string().url("Enter a valid URL").optional().or(z.literal("")),
  githubUrl:      z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

// ── Sub-components ────────────────────────────────────────────────────────────

// Step progress indicator
function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-brand-600 flex-1"
              : i === current
              ? "bg-brand-400 flex-1"
              : "bg-surface-200 w-4"
          }`}
        />
      ))}
      <span className="text-xs font-medium text-surface-500 ml-1 shrink-0">
        {current + 1} / {total}
      </span>
    </div>
  );
}

// Skill tag input
function SkillInput({
  skills,
  onAdd,
  onRemove,
}: {
  skills: string[];
  onAdd: (s: string) => void;
  onRemove: (s: string) => void;
}) {
  const [input,       setInput]       = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (val: string) => {
    setInput(val);
    if (val.length > 1) {
      const filtered = ALL_SKILLS
        .filter((s) =>
          s.toLowerCase().includes(val.toLowerCase()) &&
          !skills.includes(s)
        )
        .slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 15) {
      onAdd(trimmed);
    }
    setInput("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      addSkill(input);
    }
    if (e.key === "Backspace" && !input && skills.length > 0) {
      onRemove(skills[skills.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Tags + input */}
      <div
        className="min-h-[52px] flex flex-wrap gap-2 p-3 rounded-xl border border-surface-200 bg-surface-50 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {skills.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200"
          >
            {s}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(s); }}
              className="hover:text-brand-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={skills.length === 0 ? "Type a skill (e.g. React, Python, AWS)…" : ""}
          className="flex-1 min-w-[160px] bg-transparent text-sm text-surface-800 placeholder:text-surface-400 outline-none"
        />
      </div>

      {/* Autocomplete dropdown */}
      {suggestions.length > 0 && (
        <div className="relative z-10">
          <div className="absolute top-0 left-0 right-0 bg-white border border-surface-200 rounded-xl shadow-lg shadow-surface-200/60 overflow-hidden">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addSkill(s)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-surface-700 hover:bg-brand-50 hover:text-brand-700 transition-colors text-left"
              >
                <Plus className="w-3.5 h-3.5 text-brand-400" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-surface-400">
          Press Enter or comma to add · Backspace to remove
        </p>
        <span className={`text-xs font-medium ${skills.length >= 15 ? "text-red-500" : "text-surface-400"}`}>
          {skills.length}/15
        </span>
      </div>
    </div>
  );
}

// Reusable field wrapper
function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-surface-700">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-surface-400">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// Shared input styles
const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all";

// ── Main LoanForm ─────────────────────────────────────────────────────────────

interface LoanFormProps {
  onResult: (profile: ApplicantProfile) => void;
}

const EDUCATION_OPTIONS: { value: EducationLevel; label: string }[] = [
  { value: "high_school",  label: "High School" },
  { value: "diploma",      label: "Diploma / Polytechnic" },
  { value: "bachelor",     label: "Bachelor's degree" },
  { value: "master",       label: "Master's degree" },
  { value: "phd",          label: "PhD / Doctorate" },
  { value: "self_taught",  label: "Self-taught / Bootcamp" },
];

export default function LoanForm({ onResult }: LoanFormProps) {
  const [step,      setStep]      = useState(0); // 0: personal, 1: skills, 2: links
  const [skills,    setSkills]    = useState<string[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [skillsErr, setSkillsErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const STEPS = [
    { title: "Personal info",      icon: User },
    { title: "Your skills",        icon: Code2 },
    { title: "Links & submit",     icon: Link },
  ];

  const nextStep = async () => {
    const fields: (keyof FormValues)[][] = [
      ["name", "email", "educationLevel", "profession"],
      [],
      ["portfolioUrl", "githubUrl"],
    ];
    const valid = await trigger(fields[step]);
    if (!valid) return;

    if (step === 1 && skills.length === 0) {
      setSkillsErr("Add at least one skill");
      return;
    }
    setSkillsErr("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: FormValues) => {
    if (skills.length === 0) {
      setSkillsErr("Add at least one skill");
      setStep(1);
      return;
    }
    setLoading(true);

    // Simulate async processing
    await new Promise((r) => setTimeout(r, 1400));

    const profile: ApplicantProfile = {
      name:           data.name,
      email:          data.email,
      educationLevel: data.educationLevel,
      profession:     data.profession,
      skills,
      portfolioUrl:   data.portfolioUrl || undefined,
      githubUrl:      data.githubUrl    || undefined,
    };
    onResult(profile);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Card */}
      <div className="rounded-3xl border border-surface-200 bg-white shadow-xl shadow-surface-200/40 overflow-hidden">
        {/* Card header */}
        <div className="px-6 pt-6 pb-4 border-b border-surface-100">
          <StepIndicator current={step} total={STEPS.length} />
          <div className="mt-4 flex items-center gap-3">
            {(() => {
              const Icon = STEPS[step].icon;
              return (
                <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-brand-600" />
                </div>
              );
            })()}
            <div>
              <p className="font-display font-semibold text-surface-900">
                {STEPS[step].title}
              </p>
              <p className="text-xs text-surface-500">
                {step === 0 && "Tell us a bit about yourself"}
                {step === 1 && "Add skills to maximise your CredScore"}
                {step === 2 && "Optional links give bonus points"}
              </p>
            </div>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {/* Step 0: Personal info */}
            {step === 0 && (
              <>
                <Field label="Full name" error={errors.name?.message}>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      {...register("name")}
                      placeholder="Rahul Sharma"
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </Field>

                <Field label="Email address" error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="rahul@example.com"
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </Field>

                <Field label="Education level" error={errors.educationLevel?.message}>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none z-10" />
                    <select
                      {...register("educationLevel")}
                      className={`${inputCls} pl-10 appearance-none cursor-pointer`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select education level…</option>
                      {EDUCATION_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </Field>

                <Field label="Profession / status" error={errors.profession?.message}>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      {...register("profession")}
                      placeholder="e.g. Full-stack Developer, CS Student"
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </Field>
              </>
            )}

            {/* Step 1: Skills */}
            {step === 1 && (
              <>
                <Field
                  label="Your skills"
                  error={skillsErr}
                  hint="Each skill contributes to your CredScore. Add as many as relevant."
                >
                  <SkillInput
                    skills={skills}
                    onAdd={(s) => { setSkills((prev) => [...prev, s]); setSkillsErr(""); }}
                    onRemove={(s) => setSkills((prev) => prev.filter((x) => x !== s))}
                  />
                </Field>

                {/* Quick-add popular skills */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-surface-500">
                    Quick add popular skills:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Python", "Node.js", "AI/ML", "AWS", "TypeScript", "Docker", "SQL"].map(
                      (s) => {
                        const added = skills.includes(s.toLowerCase()) || skills.map(x=>x.toLowerCase()).includes(s.toLowerCase());
                        return (
                          <button
                            key={s}
                            type="button"
                            disabled={added || skills.length >= 15}
                            onClick={() => {
                              setSkills((prev) => [...prev, s]);
                              setSkillsErr("");
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                              added
                                ? "bg-brand-100 border-brand-200 text-brand-700 cursor-default"
                                : "bg-white border-surface-200 text-surface-600 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50"
                            }`}
                          >
                            {added ? "✓ " : "+ "}{s}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Score preview hint */}
                {skills.length > 0 && (
                  <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 text-xs text-brand-700">
                    <strong>{skills.length} skill{skills.length > 1 ? "s" : ""} added.</strong>{" "}
                    {skills.length < 4
                      ? "Add more to unlock higher loan bands."
                      : "Great mix! Your score is building up."}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Links */}
            {step === 2 && (
              <>
                <Field
                  label="GitHub profile URL"
                  error={errors.githubUrl?.message}
                  hint="+6 points to your CredScore"
                >
                  <div className="relative">
                    <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      {...register("githubUrl")}
                      placeholder="https://github.com/yourhandle"
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </Field>

                <Field
                  label="Portfolio / website URL"
                  error={errors.portfolioUrl?.message}
                  hint="+4 points to your CredScore"
                >
                  <div className="relative">
                    <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      {...register("portfolioUrl")}
                      placeholder="https://yourportfolio.com"
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </Field>

                {/* Summary before submit */}
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-surface-600 uppercase tracking-wide">
                    Application summary
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-surface-600">
                    <span className="text-surface-400">Skills added</span>
                    <span className="font-medium text-surface-800">{skills.length}</span>
                    <span className="text-surface-400">GitHub</span>
                    <span className={`font-medium ${errors.githubUrl ? "text-red-500" : "text-surface-800"}`}>
                      {errors.githubUrl ? "Invalid" : "—"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer buttons */}
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 text-sm font-medium text-surface-600 hover:bg-surface-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div /> // spacer
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/25"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calculating…
                  </>
                ) : (
                  <>Calculate my CredScore</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
