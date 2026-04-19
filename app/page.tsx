import Navbar        from "@/components/Navbar";
import Hero           from "@/components/Hero";
import Features       from "@/components/Features";
import HowItWorks     from "@/components/HowItWorks";
import FAQ            from "@/components/FAQ";
import Footer         from "@/components/Footer";
import InterestedUsersForm from "@/components/InterestedUsersForm";
import Link           from "next/link";
import { ArrowRight } from "lucide-react";

function LoanBands() {
  const bands = [
    { label: "High eligibility", range: "80+", hint: "Strong profile signal", bar: "from-emerald-500 to-emerald-700" },
    { label: "Moderate eligibility", range: "60-79", hint: "Good baseline signal", bar: "from-amber-400 to-amber-600" },
    { label: "Needs improvement", range: "Below 60", hint: "Improve skills and projects", bar: "from-slate-400 to-slate-600" },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Eligibility guidance</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight">Based on your CredScore, you can unlock potential loan ranges</h2>
          <p className="mt-3 text-surface-600 max-w-md mx-auto text-sm">Conceptual guidance only, not a lending commitment.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bands.map((b) => (
            <div key={b.label} className="card-hover rounded-2xl border border-surface-200 bg-white overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${b.bar}`} />
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <p className="font-display font-bold text-2xl text-surface-900">{b.label}</p>
                  <p className="text-xs text-surface-400">{b.hint}</p>
                </div>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-surface-100 text-xs">
                  <div className="flex justify-between"><span className="text-surface-400">CredScore range</span><span className="font-mono font-semibold text-surface-700">{b.range}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoPreview() {
  return (
    <section id="demo-preview" className="py-20 bg-surface-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Demo preview</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight">How a sample profile becomes a CredScore</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-surface-200 bg-white p-6">
            <h3 className="font-display font-semibold text-xl text-surface-900">Sample input</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-xl border border-surface-100 bg-surface-50 px-4 py-3"><strong>Name:</strong> Aditi Sharma</div>
              <div className="rounded-xl border border-surface-100 bg-surface-50 px-4 py-3"><strong>Education:</strong> Bachelor&apos;s</div>
              <div className="rounded-xl border border-surface-100 bg-surface-50 px-4 py-3"><strong>Skills:</strong> React, TypeScript, Python, SQL</div>
              <div className="rounded-xl border border-surface-100 bg-surface-50 px-4 py-3"><strong>Portfolio:</strong> GitHub + personal project links</div>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h3 className="font-display font-semibold text-xl text-surface-900">Generated output</h3>
            <div className="mt-4 flex flex-col gap-3">
              <div className="rounded-xl border border-brand-200 bg-white px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-surface-600">CredScore</span>
                <span className="font-display font-bold text-2xl text-brand-700">76</span>
              </div>
              <div className="rounded-xl border border-brand-200 bg-white px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-surface-600">Eligibility signal</span>
                <span className="font-semibold text-surface-800">Moderate</span>
              </div>
              <div className="rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-surface-700">
                Transparent breakdown highlights strengths and next improvement areas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SegmentSection() {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight mb-3">Built for every stage</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8 flex flex-col gap-5">
            <div className="text-4xl">🎓</div>
            <div><h3 className="font-display font-bold text-xl text-surface-900 mb-2">For students</h3><p className="text-surface-600 text-sm leading-relaxed">No prior credit history required for demo scoring. Coursework and projects can strengthen your profile.</p></div>
            <ul className="flex flex-col gap-2">{["Skill certifications accepted","GitHub portfolio recognised","Transparent score breakdown"].map(p=><li key={p} className="flex items-center gap-2 text-sm text-surface-700"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"/>{p}</li>)}</ul>
            <Link href="/apply" className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-colors">Apply as student <ArrowRight className="w-4 h-4"/></Link>
          </div>
          <div className="rounded-3xl border border-surface-200 bg-white p-8 flex flex-col gap-5">
            <div className="text-4xl">💼</div>
            <div><h3 className="font-display font-bold text-xl text-surface-900 mb-2">For professionals</h3><p className="text-surface-600 text-sm leading-relaxed">Advanced skills and project depth improve your score signal and profile quality.</p></div>
            <ul className="flex flex-col gap-2">{["Portfolio and GitHub bonus signals","Designed for skill-heavy profiles","Clear improvement roadmap"].map(p=><li key={p} className="flex items-center gap-2 text-sm text-surface-700"><span className="w-1.5 h-1.5 rounded-full bg-surface-400 shrink-0"/>{p}</li>)}</ul>
            <Link href="/apply" className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-surface-900 text-white hover:bg-surface-800 transition-colors">Apply as professional <ArrowRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20 bg-surface-900">
      <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-6">
        <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase">Get started in 2 minutes</span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">Your skills are worth <span className="text-gradient-warm">more than you think</span></h2>
        <p className="text-white/60 text-lg max-w-lg leading-relaxed">Stop letting a three-digit number define your financial future. Let your expertise speak for itself.</p>
        <Link href="/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 text-white font-bold text-base hover:bg-brand-400 transition-colors shadow-2xl shadow-brand-500/30">
          Calculate my CredScore — it&apos;s free <ArrowRight className="w-5 h-5"/>
        </Link>
        <p className="text-white/30 text-xs">No registration. No documents. Instant result.</p>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <LoanBands />
      <HowItWorks />
      <SegmentSection />
      <DemoPreview />
      <FAQ />
      <InterestedUsersForm />
      <CTABanner />
      <Footer />
    </main>
  );
}
