import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name:    "Priya Krishnan",
    role:    "Final-year B.Tech, NIT Trichy",
    score:   72,
    amount:  "₹1,50,000",
    content: "I had no salary or work experience — just my GitHub and a few React projects. CredSkill gave me a Silver-tier score and I qualified for ₹1.5L. Completely changed how I think about fintech.",
    skills:  ["React", "TypeScript", "Node.js"],
    stars:   5,
  },
  {
    name:    "Arjun Mehta",
    role:    "ML Engineer, Bangalore",
    score:   91,
    amount:  "₹5,00,000",
    content: "My CIBIL score was low because I'd never had a credit card. But my ML and cloud skills got me a Platinum rating and the full ₹5L. This is what fair lending looks like.",
    skills:  ["PyTorch", "AWS", "MLOps"],
    stars:   5,
  },
  {
    name:    "Sneha Rautela",
    role:    "Freelance Developer, Pune",
    score:   78,
    amount:  "₹3,00,000",
    content: "The process was literally 2 minutes. No documents, no calls, no waiting. I entered my skills, saw my score breakdown, and knew exactly what to improve. Gold tier on first try.",
    skills:  ["Flutter", "Firebase", "Figma"],
    stars:   5,
  },
  {
    name:    "Rahul Das",
    role:    "Bootcamp Graduate, Delhi",
    score:   61,
    amount:  "₹1,50,000",
    content: "Traditional banks said no because I'm self-taught. CredSkill actually valued my skills. I got Silver tier which is helping me fund an advanced AWS certification.",
    skills:  ["Python", "Django", "PostgreSQL"],
    stars:   4,
  },
  {
    name:    "Kavitha Nair",
    role:    "Data Analyst, Chennai",
    score:   83,
    amount:  "₹3,00,000",
    content: "The score breakdown is so transparent — I could see exactly which skill added what. Added my GitHub and it jumped 6 points. Smart, fair system.",
    skills:  ["Tableau", "SQL", "Python"],
    stars:   5,
  },
  {
    name:    "Dev Sharma",
    role:    "Polytechnic Student, Jaipur",
    score:   48,
    amount:  "₹75,000",
    content: "Even as a diploma student, I qualified for ₹75K. The recommendations told me exactly what skills to learn next to level up to Silver. Clear roadmap to a better loan.",
    skills:  ["HTML", "CSS", "JavaScript"],
    stars:   4,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "text-surface-200"}`}
        />
      ))}
    </div>
  );
}

function GradeDot({ score }: { score: number }) {
  const grade =
    score >= 90 ? { label: "S", color: "bg-violet-500" }
    : score >= 75 ? { label: "A", color: "bg-amber-500" }
    : score >= 60 ? { label: "B", color: "bg-slate-400" }
    : { label: "C", color: "bg-orange-600" };

  return (
    <div className={`w-7 h-7 rounded-full ${grade.color} flex items-center justify-center`}>
      <span className="text-white text-xs font-bold font-display">{grade.label}</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
            Success stories
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-surface-900 tracking-tight">
            Real applicants, real{" "}
            <span className="text-gradient">CredScores</span>
          </h2>
          <p className="mt-3 text-surface-600">
            From students to senior engineers — skills unlock opportunities.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="card-hover flex flex-col gap-4 rounded-2xl border border-surface-200 bg-white p-6"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm text-surface-900">{t.name}</span>
                  <span className="text-xs text-surface-500">{t.role}</span>
                </div>
                <GradeDot score={t.score} />
              </div>

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p className="text-sm text-surface-600 leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Skills used */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-surface-100">
                {t.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Score + amount */}
              <div className="flex items-center justify-between text-xs border-t border-surface-100 pt-3">
                <span className="text-surface-500">
                  CredScore: <strong className="text-surface-800 font-mono">{t.score}</strong>
                </span>
                <span className="font-semibold text-emerald-600">{t.amount} eligible</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-14 rounded-3xl border border-surface-200 bg-white px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-surface-100">
            {[
              { value: "12,400+", label: "applicants", sub: "across India" },
              { value: "₹24 Cr",  label: "in loan potential", sub: "unlocked" },
              { value: "4.9 / 5", label: "average rating", sub: "from users" },
              { value: "< 2 min", label: "to get a score", sub: "no documents" },
            ].map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 gap-0.5">
                <span className="font-display font-bold text-2xl text-surface-900">{value}</span>
                <span className="text-xs font-semibold text-surface-700">{label}</span>
                <span className="text-xs text-surface-400">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
