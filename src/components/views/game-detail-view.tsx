'use client';

import { useLanguage } from "@/context/language-context";

interface Game {
  title: string;
  description: string;
  features: string;
  status: string;
  downloadUrl: string;
  gallery: string[];
}

export default function GameDetailView({ game, slug }: { game: Game | null; slug: string }) {
  const { t } = useLanguage();

  // 1. Handle Not Found (Translated)
  if (!game) {
    return (
      <div className="min-h-screen pt-24 text-center">
        <h1 className="text-3xl font-black text-red-500 font-[family-name:var(--font-cinzel)]">
          {t.game_detail.not_found_title}
        </h1>
        <p className="font-mono text-[var(--text-secondary)] mt-4">
          {t.game_detail.not_found_desc} "{slug}".
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: VISUALS */}
        <div className="space-y-4">
            <div className="aspect-video bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg flex items-center justify-center shadow-[0_0_20px_var(--vignette-color)] overflow-hidden">
                {game.gallery[0] ? (
                     <img src={game.gallery[0]} alt="Main" className="w-full h-full object-cover" />
                ) : (
                     <span className="text-[var(--text-secondary)] font-mono text-xs uppercase">
                        {t.game_detail.no_media}
                     </span>
                )}
            </div>
            
            {game.gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                    {game.gallery.slice(1, 4).map((img, i) => (
                        <div key={i} className="aspect-square bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded overflow-hidden">
                            <img src={img} alt="Screenshot" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-black text-[var(--accent-gold)] uppercase font-[family-name:var(--font-cinzel)] leading-tight">
            {game.title}
          </h1>
          
          <div className="space-y-4 text-[var(--text-primary)] leading-relaxed border-l-2 border-[var(--border-color)] pl-6">
            {/* Description from Drupal (Likely HTML) */}
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
            
            {game.features && (
                <p className="text-[var(--text-secondary)] text-sm pt-4 border-t border-[var(--border-color)] mt-4">
                  <strong className="text-[var(--accent-gold)]">
                    {t.game_detail.features_label}
                  </strong> {game.features}
                </p>
            )}
          </div>

          <div className="pt-8">
              {game.downloadUrl ? (
                  <a href={game.downloadUrl} target="_blank" className="block w-full text-center py-4 bg-[var(--accent-gold)] text-black font-black uppercase tracking-widest rounded hover:scale-[1.02] transition-transform shadow-[0_0_20px_var(--accent-glow)]">
                      {t.game_detail.play_prefix} {game.status} {t.game_detail.play_suffix}
                  </a>
              ) : (
                  <button disabled className="w-full py-4 bg-zinc-800 text-zinc-500 font-black uppercase tracking-widest rounded cursor-not-allowed">
                      {t.game_detail.download_unavailable}
                  </button>
              )}
              
              <p className="text-center text-xs text-[var(--text-secondary)] mt-4 font-mono">
                  {t.game_detail.alpha_warning}
              </p>
          </div>
        </div>

      </main>
    </div>
  );
}