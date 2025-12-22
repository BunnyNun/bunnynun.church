'use client';

import { useLanguage } from "@/context/language-context";

interface Animation {
  title: string;
  desc: string;
  iwaraLink: string | null;
  premiumSource: string | null;
  cover: string | null;
}

interface Props {
  anim: Animation | null;
  slug: string;
  isDevotee: boolean;
}

export default function AnimationDetailView({ anim, slug, isDevotee }: Props) {
  const { t } = useLanguage();

  // 1. STYLED 404 STATE
  if (!anim) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-primary)]">
        <h1 className="text-4xl font-black text-[var(--accent-gold)] uppercase font-[family-name:var(--font-cinzel)] mb-4">
          {t.animation_detail.not_found_title}
        </h1>
        <p className="text-[var(--text-secondary)] font-mono mb-8">
          {t.animation_detail.not_found_desc} "{slug}"
        </p>
        <a href="/animations" className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors uppercase text-xs font-bold tracking-widest">
          {t.animation_detail.return}
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* VIDEO PLAYER AREA */}
        <div className="w-full aspect-video bg-black border border-[var(--border-color)] rounded-xl overflow-hidden shadow-[0_0_50px_var(--vignette-color)] relative group">
            
            {/* SCENARIO A: PREMIUM & UNLOCKED */}
            {isDevotee && anim.premiumSource ? (
                <video 
                    controls 
                    className="w-full h-full object-contain"
                    poster={anim.cover || undefined}
                >
                    <source src={anim.premiumSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                /* SCENARIO B: LOCKED / GUEST */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 text-center p-8">
                    
                    {/* Background Blur */}
                    {anim.cover && (
                        <div 
                            className="absolute inset-0 opacity-20 blur-xl bg-cover bg-center pointer-events-none"
                            style={{ backgroundImage: `url(${anim.cover})` }}
                        />
                    )}

                    <div className="relative z-10 flex flex-col items-center">
                        <h3 className="text-3xl font-black text-[var(--accent-gold)] mb-4 font-[family-name:var(--font-cinzel)] drop-shadow-md">
                            {t.animation_detail.locked_title}
                        </h3>
                        <p className="text-[var(--text-secondary)] font-mono mb-8 max-w-md">
                            {t.animation_detail.locked_desc_1}
                            <br/><br/>
                            {t.animation_detail.locked_desc_2}
                        </p>
                        
                        <div className="flex gap-4">
                            {anim.iwaraLink ? (
                                <a 
                                href={anim.iwaraLink} 
                                target="_blank"
                                className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-white hover:text-white text-[var(--text-secondary)] transition-colors uppercase font-bold text-xs tracking-widest"
                                >
                                    {t.animation_detail.watch_iwara}
                                </a>
                            ) : (
                                <span className="px-6 py-3 border border-red-900/50 text-red-900 uppercase font-bold text-xs tracking-widest cursor-not-allowed">
                                    {t.animation_detail.iwara_unavailable}
                                </span>
                            )}

                            <a 
                            href="/sanctuary" 
                            className="px-6 py-3 bg-[var(--accent-gold)] text-black hover:scale-105 transition-transform uppercase font-black text-xs tracking-widest shadow-[0_0_20px_var(--accent-glow)]"
                            >
                                {t.animation_detail.unlock_source}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* INFO AREA */}
        <div className="flex flex-col gap-4">
             <h1 className="text-4xl font-black text-[var(--accent-gold)] uppercase font-[family-name:var(--font-cinzel)]">
                {anim.title}
             </h1>
             
             <div className="text-[var(--text-secondary)] leading-relaxed max-w-2xl font-mono" dangerouslySetInnerHTML={{ __html: anim.desc }} />
             
             {isDevotee && anim.premiumSource && (
                 <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded inline-block self-start">
                     <p className="text-green-500 text-xs uppercase font-bold tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                         {t.animation_detail.master_file}
                     </p>
                 </div>
             )}
        </div>

      </main>
    </div>
  );
}