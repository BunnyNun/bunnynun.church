import { getServerLang } from "@/lib/get-server-lang";
import { getDictionary } from "@/lib/dictionary";

async function getReviewBySlug(slug: string, lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    // UPDATED: include=field_review_art
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/review?include=field_review_art`;
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    
    const json = await res.json();
    const targetAlias = `/reviews/${slug}`;
    const node = json.data.find((n: any) => 
        n.attributes.path?.alias === targetAlias || 
        n.attributes.path?.alias === `/${slug}`
    );

    if (!node) return null;
    const included = json.included || [];

    let coverUrl = null;
    if (node.relationships?.field_review_art?.data) {
        const mediaId = node.relationships.field_review_art.data.id;
        const media = included.find((i: any) => i.id === mediaId);
        if (media?.attributes?.uri?.url) {
            coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
        }
    }
    
    // Rating Logic: 0-100 -> 9.9
    const rawScore = node.attributes.field_rating || 0;
    const decimalScore = (rawScore / 10).toFixed(1); // 99 -> "9.9"

    const rawLinks = node.attributes.field_game_link;
    let links = [];

    if (Array.isArray(rawLinks)) {
        links = rawLinks;
    } else if (rawLinks) {
        // If Drupal sends a single object instead of an array (rare but possible)
        links = [rawLinks];
    }

    return {
    title: node.attributes.title,
    body: node.attributes.body?.value,
    verdict: node.attributes.field_verdict,
    score: decimalScore,
    cover: coverUrl,
    links: links // Pass the whole array
    };
  } catch (error) {
    return null;
  }
}

export default async function ReviewDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const lang = await getServerLang();
  const t = getDictionary(lang);
  const review = await getReviewBySlug(slug, lang);

  if (!review) return <div className="text-center pt-24">Not Found</div>;

  // FIX: Define the CMS URL to prepend
  const drupalBase = "https://cms.bunnynun.church";
  
  // FIX: Replace relative paths with absolute ones in the body text
  // This looks for 'src="/sites' and turns it into 'src="https://cms.../sites'
  const processedBody = review.body?.replace(/src="\/sites/g, `src="${drupalBase}/sites`);

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header Image */}
        {review.cover && (
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-[var(--border-color)] shadow-[0_0_40px_var(--vignette-color)] relative group">
                <img src={review.cover} alt={review.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase font-[family-name:var(--font-cinzel)] drop-shadow-md leading-none">
                        {review.title}
                    </h1>
                </div>
            </div>
        )}

        {/* Verdict Box */}
        <div className="grid md:grid-cols-[1fr_auto] gap-4">
            
            {/* Left: Verdict & Score */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--accent-gold)] p-6 rounded-lg flex items-center gap-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                {/* Score Circle */}
                <div className="relative w-16 h-16 flex items-center justify-center border-4 border-[var(--accent-gold)] rounded-full">
                    <span className="text-white font-black text-xl font-mono">{review.score}</span>
                </div>
                
                <div>
                    <p className="text-[var(--text-secondary)] text-xs uppercase tracking-widest font-bold mb-1">
                        {t.reviews.verdict_label}
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-[var(--accent-gold)] font-[family-name:var(--font-cinzel)]">
                        {review.verdict}
                    </p>
                </div>
            </div>

            {/* Right: Links */}
            <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                {review.links && review.links.map((link: any, index: number) => {
                    const url = link.uri;
                    const title = link.title || "Acquire Artifact"; // Fallback if you didn't name it in Drupal
                    
                    // Detect Store for Styling
                    let icon = "↗";
                    let colorClass = "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"; // Default
                    
                    if (url.includes("steampowered.com")) {
                        icon = "🎮"; // You can use a real SVG icon here if you want
                        colorClass = "bg-[#171a21] border-[#171a21] hover:bg-[#2a475e] text-white";
                    } else if (url.includes("dlsite.com")) {
                        icon = "📁";
                        colorClass = "bg-[#002d5d] border-[#002d5d] hover:bg-[#004080] text-white";
                    } else if (url.includes("itch.io")) {
                        icon = "🔥";
                        colorClass = "bg-[#fa5c5c] border-[#fa5c5c] hover:bg-[#ff4d4d] text-white";
                    } else if (url.includes("gamejolt.com")) {
                        icon = "⚡";
                        colorClass = "bg-[#2f7f6f] border-[#2f7f6f] hover:bg-[#3ea08a] text-white";
                    }

                    return (
                        <a 
                            key={index}
                            href={url} 
                            target="_blank" 
                            className={`${colorClass} border p-4 rounded-lg flex items-center justify-between transition-all group shadow-lg`}
                        >
                            <span className="font-bold uppercase tracking-widest text-xs group-hover:scale-105 transition-transform">
                                {title}
                            </span>
                            <span className="text-lg opacity-80 group-hover:opacity-100">{icon}</span>
                        </a>
                    );
                })}
            </div>
        </div>

        {/* The Body Text */}
        <div 
            className="
            prose prose-invert prose-gold max-w-none 
            text-[var(--text-primary)] leading-loose font-serif text-lg p-4
            [&>p>img]:rounded-xl [&>p>img]:shadow-[0_0_20px_var(--vignette-color)]
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4  {/* FIX: Restore Bullets */}
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 {/* FIX: Restore Numbers */}
            [&>li]:mb-2                                {/* FIX: Spacing between items */}
            "
            dangerouslySetInnerHTML={{ __html: processedBody }} 
        />
        
        <div className="pt-12 border-t border-[var(--border-color)] text-center">
            <a href="/reviews" className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] text-xs uppercase tracking-[0.2em] transition-colors">
                ← {t.reviews.back}
            </a>
        </div>

      </main>
    </div>
  );
}