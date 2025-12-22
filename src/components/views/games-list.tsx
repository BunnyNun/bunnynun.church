'use client';

import { useLanguage } from "@/context/language-context";

interface Game {
  id: string;
  title: string;
  status: string;
  shortDesc: string;
  cover: string | null;
  slug: string;
}

export default function GamesList({ games }: { games: Game[] }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen p-8 pt-24 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto flex flex-col gap-12">
        
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">
            {t.games.title}
          </h1>
          <p className="text-[var(--text-secondary)] font-mono">
            {t.games.subtitle}
          </p>
        </header>

        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.length > 0 ? (
            games.map((game) => (
              <a 
                key={game.id} 
                href={`/games/${game.slug}`} 
                className="group block bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-gold)] transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)]"
              >
                {/* Cover Image Area */}
                <div className="h-48 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
                   {game.cover ? (
                     <img src={game.cover} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   ) : (
                     <span className="text-4xl">🎮</span>
                   )}
                </div>
                
                <div className="p-6 space-y-2">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-cinzel)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {game.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-[var(--accent-gold)] text-black px-2 py-0.5 rounded font-bold uppercase">
                      {game.status || t.games.status_fallback}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
                    {game.shortDesc}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[var(--text-secondary)] font-mono border border-dashed border-[var(--border-color)] rounded">
              {t.games.empty}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}