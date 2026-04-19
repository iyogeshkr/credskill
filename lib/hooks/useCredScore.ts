"use client";

/**
 * useCredScore — custom hook for managing the score calculation lifecycle.
 *
 * Handles:
 *  - Applicant profile state
 *  - Async score calculation with loading state
 *  - Result + error state
 *  - Reset
 */

import { useState, useCallback } from "react";
import type { ApplicantProfile, CredScoreResult } from "@/types";
import { calculateScore } from "@/lib/calculateScore";
import { sleep } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface UseCredScoreReturn {
  status:         Status;
  result:         CredScoreResult | null;
  profile:        ApplicantProfile | null;
  error:          string | null;
  isLoading:      boolean;
  isSuccess:      boolean;
  calculate:      (profile: ApplicantProfile) => Promise<void>;
  reset:          () => void;
}

export function useCredScore(): UseCredScoreReturn {
  const [status,  setStatus]  = useState<Status>("idle");
  const [result,  setResult]  = useState<CredScoreResult | null>(null);
  const [profile, setProfile] = useState<ApplicantProfile | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  const calculate = useCallback(async (applicantProfile: ApplicantProfile) => {
    setStatus("loading");
    setError(null);
    setProfile(applicantProfile);

    try {
      // Simulate server latency for realistic UX
      await sleep(1400);

      const score = calculateScore(applicantProfile);
      setResult(score);
      setStatus("success");
    } catch (err) {
      setError("Failed to calculate score. Please try again.");
      setStatus("error");
      console.error("Score calculation error:", err);
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setProfile(null);
    setError(null);
  }, []);

  return {
    status,
    result,
    profile,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    calculate,
    reset,
  };
}
