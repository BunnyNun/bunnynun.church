import { getServerLang } from "@/lib/get-server-lang";
import { getDictionary } from "@/lib/dictionary";

async function getReviews(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    // UPDATED: include=field_review_art
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/review?include=field_review_art&sort=-created`;
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const json = await res.json();
    const included = json.included || [];

    return json.data.map((node: any) => {
      let coverUrl = null;
      // UPDATED: check field_review_art
      if (node.relationships?.field_review_art?.data) {
        const mediaId = node.relationships.field_review_art.data.id;
        const media = included.find((i: any) => i.id === mediaId);
        if (media?.attributes?.uri?.url) {
          coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
        }
      }

      const rawAlias = node.attributes.path?.alias; 
      const slug = rawAlias 
        ? rawAlias.replace(/^\/reviews\//, "").replace(/^\//, "") 
        : node.id;

      // Rating Logic: Convert 0-100 to 0-10 (Floored)
      const rawScore = node.attributes.field_rating || 0;
      const displayScore = Math.floor(rawScore / 10); 

      return {
        id: node.id,
        title: node.attributes.title,
        verdict: node.attributes.field_verdict || "Pending Judgment",
        score: displayScore, // 99 -> 9
        cover: coverUrl,
        slug: slug,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ReviewsPage() {
  const lang = await getServerLang();
  const t = getDictionary(lang);
  const reviews = await getReviews(lang);

  return (
    <div className="min-h-screen p-8 pt-24 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto flex flex-col gap-12">
        
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">
            {t.reviews.title}
          </h1>
          <p className="text-[var(--text-secondary)] font-mono">
            {t.reviews.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <a 
                key={review.id} 
                href={`/reviews/${review.slug}`}
                className="group block bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-gold)] transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)]"
              >
                <div className="h-48 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
                   {review.cover ? (
                     <img src={review.cover} alt={review.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   ) : (
                     <span className="text-4xl">📜</span>
                   )}
                   
                   {/* Verdict Banner */}
                   <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 flex justify-between items-center px-4 border-t border-[var(--accent-gold)]">
                      <span className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-widest">
                        {review.verdict}
                      </span>
                      {/* Integer Score Display */}
                      <span className="text-white font-mono text-xs font-bold">
                        {review.score}/10
                      </span>
                   </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-cinzel)] group-hover:text-[var(--accent-gold)] transition-colors mb-4 line-clamp-1">
                    {review.title}
                  </h2>
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--text-secondary)] pb-1 group-hover:text-white group-hover:border-white transition-colors">
                    {t.reviews.read_more}
                  </span>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[var(--text-secondary)] font-mono border border-dashed border-[var(--border-color)] rounded">
              {t.reviews.empty}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}