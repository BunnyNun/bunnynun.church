'use client';

import { useLanguage } from "@/context/language-context";

interface Animation {
  id: string;
  title: string;
  cover: string | null;
  slug: string;
  duration: string;
}

export default function AnimationsList({ animations }: { animations: Animation[] }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen p-8 pt-24 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">
            {t.animations.title}
          </h1>
          
          <div className="flex flex-col items-center gap-3">
            <p className="text-[var(--text-secondary)] font-mono uppercase text-xs tracking-[0.2em]">
              {t.animations.subtitle}
            </p>
            
            <a 
              href="https://www.iwara.tv/profile/bunnynun" 
              target="_blank"
              className="text-[var(--accent-gold)] hover:text-white text-[10px] font-bold uppercase tracking-widest border-b border-[var(--border-color)] hover:border-white pb-1 transition-all"
            >
              {t.animations.iwara_link}
            </a>
          </div>
        </header>

        {animations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animations.map((anim) => (
              <a 
                key={anim.id} 
                href={`/animations/${anim.slug}`}
                className="group relative aspect-video bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-gold)] hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300"
              >
                  {/* Thumbnail */}
                  {anim.cover ? (
                    <img src={anim.cover} alt={anim.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary)] font-mono text-xs">
                       {t.animations.no_signal}
                    </div>
                  )}

                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h2 className="text-xl font-bold text-white font-[family-name:var(--font-cinzel)] uppercase tracking-wider mb-1">
                        {anim.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[var(--accent-gold)] text-black px-2 py-0.5 rounded font-bold uppercase">
                            {anim.duration}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono uppercase">
                             {t.animations.available_4k}
                        </span>
                    </div>
                  </div>

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-16 h-16 rounded-full bg-[var(--accent-gold)] flex items-center justify-center shadow-[0_0_20px_var(--accent-glow)]">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1" />
                     </div>
                  </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-xl">
            <p className="text-[var(--text-secondary)] font-mono mb-4">
              {t.animations.empty}
            </p>
            <a 
              href="https://www.iwara.tv/profile/bunnynun" 
              target="_blank"
              className="px-4 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] uppercase text-xs font-bold tracking-widest hover:bg-[var(--accent-gold)] hover:text-black transition-colors"
            >
              {t.animations.check_iwara}
            </a>
          </div>
        )}

      </main>
    </div>
  );
}