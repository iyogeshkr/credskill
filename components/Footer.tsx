import Link from "next/link";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const LINKS = {
  Product: ["How it works", "Features", "Check CredScore"],
  Company: ["About", "Contact"],
  Legal:   ["Privacy Policy", "Terms of Service", "Disclaimer"],
};

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-lg">
                Cred<span className="text-brand-400">Skill</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
              Skill-based credit evaluation for India&apos;s next generation of professionals.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                {section}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© 2026 CredSkill. Designed & Developed by <a href="https://startcorn.com" className="text-white/60 hover:text-white transition-colors">Startcorn</a></p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MVP Preview — not a licensed NBFC
          </p>
        </div>
      </div>
    </footer>
  );
}
