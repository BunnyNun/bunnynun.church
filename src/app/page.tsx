'use client'; // Needs to be client to use the Language Context

import { useLanguage } from "@/context/language-context";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Decorative Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none overflow-hidden">
        <span className="text-[20vw] font-black font-[family-name:var(--font-cinzel)] text-[var(--accent-gold)] rotate-90 md:rotate-0 whitespace-nowrap">
          {t.home.worship}
        </span>
      </div>

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-12">
        
        {/* The Title */}
        <header className="space-y-6">
          <p className="text-[var(--accent-gold)] text-xs md:text-sm font-bold uppercase tracking-[0.5em] font-[family-name:var(--font-cinzel)]">
            {t.home.established}
          </p>
          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-[var(--text-primary)] font-[family-name:var(--font-cinzel)] drop-shadow-2xl">
            {t.home.altar}
          </h1>
        </header>

        {/* The Manifesto */}
        <div className="max-w-lg space-y-6 text-[var(--text-secondary)] font-mono text-sm md:text-base leading-loose border-y border-[var(--border-color)] py-8">
          <p>
            {t.home.creed}
          </p>
        </div>

        {/* Navigation Hints */}
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
          <a href="/games" className="hover:text-[var(--accent-gold)] hover:underline decoration-[var(--accent-gold)] underline-offset-4 transition-all">
            {t.nav.games}
          </a>
          <span className="text-[var(--border-color)]">|</span>
          <a href="/characters" className="hover:text-[var(--accent-gold)] hover:underline decoration-[var(--accent-gold)] underline-offset-4 transition-all">
            {t.nav.characters}
          </a>
          <span className="text-[var(--border-color)]">|</span>
          <a href="/confessional" className="hover:text-[var(--accent-gold)] hover:underline decoration-[var(--accent-gold)] underline-offset-4 transition-all">
            {t.nav.confess}
          </a>
        </div>

      </div>
    </main>
  );
}