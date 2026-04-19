"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  role: "student" | "employer";
};

type ApiErrorData =
  | string
  | Record<string, string[] | string>
  | undefined;

type ApiError = {
  data?: ApiErrorData;
  message?: string;
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(form);
      router.push("/");
    } catch (err: unknown) {
      const maybeError = err as ApiError;
      if (maybeError?.message) {
        setError(maybeError.message);
        return;
      }
      const messages = maybeError?.data;

      if (messages && typeof messages === "object") {
        const messageText = Object.values(messages)
          .flatMap((value) => (Array.isArray(value) ? value : [value]))
          .join(" ");
        setError(messageText || "Registration failed.");
      } else if (typeof messages === "string") {
        setError(messages);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-black text-brand-700 tracking-tight">CredSkill</h1>
          <p className="text-surface-500 mt-1">Start your journey</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-surface-100 p-8 flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-surface-900">Create account</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-700">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="Riya Sharma"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-700">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="Min 8 characters"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-700">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {(["student", "employer"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm({ ...form, role })}
                  className={`py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all ${
                    form.role === role
                      ? "bg-brand-600 text-white border-brand-600"
                      : "border-surface-200 text-surface-600 hover:border-brand-300"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
