'use client';

import { useLanguage } from "@/context/language-context";
import CorruptionDoll from "@/components/ui/corruption-doll";

interface Character {
  name: string;
  role: string;
  desc: string;
  baseImage: string;
}

export default function CharacterDetailView({ char, slug }: { char: Character | null; slug: string }) {
  const { t } = useLanguage();

  if (!char) return (
    <div className="min-h-screen pt-24 text-center">
      <h1 className="text-3xl font-black text-red-500 font-[family-name:var(--font-cinzel)]">
        {t.character_detail.not_found_title}
      </h1>
      <p className="font-mono text-[var(--text-secondary)] mt-4">
        {t.character_detail.not_found_desc.replace("{slug}", slug)}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: THE DOLL (Interactive) */}
        <div className="w-full aspect-[3/4] relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-[0_0_50px_var(--vignette-color)]">
           <div className="absolute inset-0 p-4">
             <CorruptionDoll basePose={char.baseImage} />
           </div>
        </div>

        {/* RIGHT: THE LORE */}
        <div className="flex flex-col gap-8">
          
          <header className="space-y-2">
             <h1 className="text-6xl md:text-8xl font-black text-[var(--accent-gold)] uppercase font-[family-name:var(--font-cinzel)] leading-none drop-shadow-lg">
                {char.name}
             </h1>
             <p className="text-xl text-[var(--text-primary)] font-bold tracking-[0.2em] uppercase border-b border-[var(--border-color)] pb-4 inline-block">
                {char.role || t.character_detail.role_fallback}
             </p>
          </header>

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed font-mono text-lg">
             <p className="whitespace-pre-wrap">
                {char.desc || t.character_detail.desc_fallback}
             </p>
          </div>

          <div className="pt-8 flex flex-col gap-4">
             <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded">
                <p className="text-xs text-[var(--accent-gold)] uppercase font-bold mb-2">
                    {t.character_detail.current_status}
                </p>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                   <span className="text-xs font-mono text-white">
                       {t.character_detail.status_available}
                   </span>
                </div>
             </div>
          </div>

        </div>

      </main>
    </div>
  );
}