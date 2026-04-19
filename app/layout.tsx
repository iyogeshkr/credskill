import type { Metadata } from "next";
import { Manrope, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CredSkill — Get Loans Based on Your Skills",
  description:
    "CredSkill evaluates your career potential and skills to determine loan eligibility — not your credit history. Apply in minutes.",
  keywords: ["skill loan", "credskill", "credscore", "fintech", "skill-based lending"],
  openGraph: {
    title: "CredSkill — Skill-Based Loan Eligibility",
    description: "Your skills are your credit score.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${sora.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-surface-900`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
