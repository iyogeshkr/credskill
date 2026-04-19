"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api";

type InterestedForm = {
  email: string;
};

const INITIAL_FORM: InterestedForm = {
  email: "",
};

export default function InterestedUsersForm() {
  const [form, setForm] = useState<InterestedForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.saveInterestedUser(form.email);
      setMessage("Thanks. Your interest has been saved.");
      setForm(INITIAL_FORM);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="interest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-surface-200 bg-surface-50 p-6 sm:p-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
              Join Early Access
            </p>
            <h2 className="mt-2 font-display font-bold text-3xl text-surface-900 tracking-tight">
              Join Early Access
            </h2>
            <p className="mt-2 text-surface-600 text-sm">
              Share your email and we will contact you with onboarding updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="Email address"
              className="border border-surface-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
            >
              {loading ? "Saving..." : "I am interested"}
            </button>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}
            {message && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
