'use client';

import { useLanguage } from "@/context/language-context";

export default function ConfessionsBoardView() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] text-center row-start-2 items-center">
        <h1 className="text-3xl md:text-5xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">
          {t.confessional_board.title}
        </h1>
        <p className="text-[var(--text-secondary)] font-mono">
            {/* Placeholder for future logic */}
            [ Awaiting Data ]
        </p>
      </main>
    </div>
  );
}