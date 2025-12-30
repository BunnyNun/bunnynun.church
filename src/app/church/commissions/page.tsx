'use client';

import { useLanguage } from "@/context/language-context";

const Commissions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center pt-20 font-[family-name:var(--font-geist-sans)]">
      
      <main className="max-w-3xl w-full border border-[var(--border-color)] bg-[var(--bg-secondary)] p-12 rounded-xl shadow-[0_0_40px_var(--vignette-color)] relative overflow-hidden">
        
        {/* Background decorative strip */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--accent-gold)] opacity-50" />

        <div className="flex flex-col gap-8 items-center relative z-10">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)] drop-shadow-md">
              {t.commissions.title}
            </h1>
            <p className="text-[var(--text-primary)] text-lg font-mono tracking-wider uppercase">
              {t.commissions.status_closed}
            </p>
          </header>

          <div className="h-px w-32 bg-[var(--border-color)]" />

          <p className="text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {t.commissions.description}
          </p>

          <div className="p-4 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] w-full max-w-md">
            <p className="text-xs text-[var(--accent-gold)] uppercase font-bold tracking-widest mb-1">
              {t.commissions.update_label}
            </p>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              {t.commissions.update_text}
            </p>
          </div>

          <button disabled className="px-8 py-3 border border-[var(--border-color)] text-[var(--text-secondary)] uppercase text-xs font-bold tracking-[0.2em] cursor-not-allowed opacity-50 hover:bg-transparent">
            {t.commissions.button}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Commissions;