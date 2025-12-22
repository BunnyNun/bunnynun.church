'use client';

import { useLanguage } from "@/context/language-context";
import CorruptionDoll from "@/components/ui/corruption-doll";

interface Character {
  id: string;
  name: string;
  role: string;
  baseImage: string;
  slug: string;
}

export default function CharactersList({ characters }: { characters: Character[] }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen p-8 pt-24 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">
            {t.characters.title}
          </h1>
          <p className="text-[var(--text-secondary)] font-mono uppercase text-xs tracking-[0.2em]">
            {t.characters.subtitle}
          </p>
        </header>

        {characters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 justify-items-center">
            {characters.map((char) => (
              <a 
                key={char.id} 
                href={`/characters/${char.slug}`}
                className="flex flex-col items-center gap-6 w-full max-w-[400px] group cursor-pointer"
              >
                  {/* DOLL CONTAINER */}
                  <div className="w-full aspect-[3/4] relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-2xl group-hover:border-[var(--accent-gold)] group-hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-500">
                      <div className="absolute inset-0 p-4 pointer-events-none">
                          <CorruptionDoll basePose={char.baseImage} />
                      </div>
                  </div>
                  
                  {/* INFO CARD */}
                  <div className="text-center space-y-2">
                      <h2 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-cinzel)] group-hover:text-[var(--accent-gold)] transition-colors">
                          {char.name}
                      </h2>
                      <p className="text-[var(--accent-gold)] text-xs uppercase tracking-widest font-bold">
                          {char.role || t.characters.role_fallback}
                      </p>
                  </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-xl">
            <p className="text-[var(--text-secondary)] font-mono">
              {t.characters.empty}
            </p>
          </div>
        )}

      </main>
    </div>
  );
}