'use client';

import { useLanguage } from "@/context/language-context";
import SubscribestarButton from "@/components/ui/subscribestar-button";

export default function SanctuaryView() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center pt-20">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ background: 'radial-gradient(circle at center, var(--accent-gold) 0%, transparent 60%)', filter: 'blur(100px)' }} 
      />

      <div className="relative z-10 max-w-2xl space-y-12 p-12 border border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-md rounded-2xl shadow-[0_0_50px_var(--vignette-color)]">
        
        <header className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-[var(--accent-gold)] uppercase italic font-[family-name:var(--font-cinzel)] drop-shadow-[0_0_15px_var(--accent-glow)]">
               {t.sanctuary.title}
            </h1>
            <div className="h-1 w-24 bg-[var(--accent-gold)] mx-auto" />
            <p className="text-[var(--text-primary)] text-lg font-mono">
               {t.sanctuary.quote}
            </p>
        </header>

        <div className="space-y-6">
            <p className="text-[var(--text-secondary)] text-sm uppercase tracking-widest font-bold">
               {t.sanctuary.instruction}
            </p>

            <div className="flex justify-center scale-125">
                <SubscribestarButton />
            </div>
            
            <p className="text-[10px] text-[var(--text-secondary)] font-mono pt-4">
               {t.sanctuary.requirement}
            </p>
        </div>
      </div>
    </div>
  );
}