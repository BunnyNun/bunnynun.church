import { getServerLang } from "@/lib/get-server-lang";
import { getDictionary } from "@/lib/dictionary";

// --- CONFIGURATION ---
type TagType = 'content' | 'genre' | 'artist' | 'engine' | 'series' | 'origin' | 'character';

interface Tag {
  name: string;
  type: TagType;
  tier: 1 | 2 | 3;
  parent?: string | null;
}

const TYPE_ORDER: Record<string, number> = {
    'artist': 1,
    'engine': 2,
    'series': 3,
    'origin': 4,
    'character': 5,
    'genre': 6,
    'content': 7
};

// --- SMART TAG COMPONENT (Server Version) ---
// Handles visual logic: Hides parents for Content/Genre, shows for Character/Series
const SmartTag = ({ tag, className }: { tag: Tag, className?: string }) => {
    const { name, parent, type } = tag;

    // 1. Manual Disambiguation: "Name (Series)"
    const match = name.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
        return (
            <span className={`${className} flex items-baseline gap-1`}>
                <span>{match[1]}</span>
                <span className="opacity-50 text-[0.7em] uppercase tracking-wider">{match[2]}</span>
            </span>
        );
    }

    // 2. Parent Hierarchy Display
    // Hide parent if it's a Content/Genre tag (User Request) or a generic root folder
    if (parent && type !== 'content' && type !== 'genre' && parent !== 'Content' && parent !== 'Tags' && parent !== 'Root') {
        return (
            <span className={`${className} flex items-baseline gap-1`}>
                <span>{name}</span>
                <span className="opacity-50 text-[0.7em] uppercase tracking-wider">{parent}</span>
            </span>
        );
    }

    // 3. Fallback
    return <span className={className}>{name}</span>;
};

// --- DATA FETCHING ---
async function getReviewBySlug(slug: string, lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    // 1. FETCH DEEP LINEAGE (3 Levels Up)
    const includes = [
        "field_review_art",
        "field_primary_review_tags", "field_primary_review_tags.parent", "field_primary_review_tags.parent.parent",
        "field_secondary_review_tags", "field_secondary_review_tags.parent", "field_secondary_review_tags.parent.parent",
        "field_tertiary_review_tags", "field_tertiary_review_tags.parent", "field_tertiary_review_tags.parent.parent"
    ];

    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/review?include=${includes.join(',')}&sort=-created`;
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

    // --- SMART TYPE INFERENCE HELPER ---
    const inferTypeAndParent = (tagObj: any): { type: TagType, parentName: string | null } => {
        let currentType: TagType = 'content'; 
        let parentName = null;
        let rootName = null;
        let depth = 0;

        // 1. Get Immediate Parent
        if (tagObj.relationships?.parent?.data?.[0]) {
            const pId = tagObj.relationships.parent.data[0].id;
            const pObj = included.find((i: any) => i.id === pId);
            
            if (pObj) {
                parentName = pObj.attributes.name;
                rootName = parentName; 
                depth = 1;

                // 2. Get Grandparent (Root Folder?)
                if (pObj.relationships?.parent?.data?.[0]) {
                    const gpId = pObj.relationships.parent.data[0].id;
                    const gpObj = included.find((i: any) => i.id === gpId);
                    if (gpObj) {
                        rootName = gpObj.attributes.name;
                        depth = 2;
                    }
                }
            }
        }

        // 3. Logic Map
        switch (rootName) {
            case 'Engine': currentType = 'engine'; break;
            case 'Genre': currentType = 'genre'; break;
            case 'Artist': currentType = 'artist'; break;
            case 'Origin': 
                // Depth 1 = Series (Touhou -> Origins)
                // Depth 2 = Character (Reimu -> Touhou -> Origins)
                currentType = depth === 2 ? 'character' : 'origin';
                break;
            default: currentType = 'content'; break;
        }

        // Clean up parent name for display
        const systemFolders = ['Engine', 'Genre', 'Artist', 'Origin', 'Series', 'Content', 'Root'];
        if (parentName && systemFolders.includes(parentName)) {
            parentName = null;
        }

        return { type: currentType, parentName };
    };

    // --- RECURSIVE TAG PROCESSOR ---
    const processTags = (rels: any, startTier: 1 | 2 | 3): Tag[] => {
        const data = rels?.data || [];
        const generatedTags: Tag[] = [];

        data.forEach((rel: any) => {
            const tagObj = included.find((inc: any) => inc.id === rel.id);
            if (!tagObj) return;

            // INFER TYPE
            const { type, parentName } = inferTypeAndParent(tagObj);
            
            // Add Main Tag
            generatedTags.push({
                name: tagObj.attributes.name,
                type: type,
                tier: startTier,
                parent: parentName
            });

            // LOGIC: If Character -> Add Series as Tag
            if (type === 'character' && parentName) {
                generatedTags.push({
                    name: parentName,
                    type: 'origin',
                    tier: startTier === 1 ? 2 : 3,
                    parent: null
                });
            }
            
            // LOGIC: If Content -> Add Parent as Tag (Recursively)
            if (type === 'content' && parentName) {
                 generatedTags.push({
                    name: parentName,
                    type: 'content',
                    tier: startTier === 1 ? 2 : 3,
                    parent: null
                });
            }
        });
        return generatedTags;
    };

    // Process all tiers
    const primary = processTags(node.relationships.field_primary_review_tags, 1);
    const secondary = processTags(node.relationships.field_secondary_review_tags, 2);
    const tertiary = processTags(node.relationships.field_tertiary_review_tags, 3);
    
    // Deduplicate
    const tagMap = new Map<string, Tag>();
    [...primary, ...secondary, ...tertiary].forEach(tag => {
        if (!tagMap.has(tag.name)) {
            tagMap.set(tag.name, tag);
        } else {
            const existing = tagMap.get(tag.name)!;
            if (tag.tier < existing.tier) tagMap.set(tag.name, tag);
        }
    });

    // Sort by Strict Order
    const allTags = Array.from(tagMap.values()).sort((a, b) => {
        const orderA = TYPE_ORDER[a.type] || 99;
        const orderB = TYPE_ORDER[b.type] || 99;
        return orderA - orderB;
    });

    // Image & Links Logic
    let coverUrl = null;
    if (node.relationships?.field_review_art?.data) {
        const mediaId = node.relationships.field_review_art.data.id;
        const media = included.find((i: any) => i.id === mediaId);
        if (media?.attributes?.uri?.url) coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
    }
    const rawScore = node.attributes.field_rating || 0;
    const decimalScore = (rawScore / 10).toFixed(1); 
    const rawLinks = node.attributes.field_game_link;
    let links = [];
    if (Array.isArray(rawLinks)) links = rawLinks;
    else if (rawLinks) links = [rawLinks];

    return {
      title: node.attributes.title,
      body: node.attributes.body?.value,
      verdict: node.attributes.field_verdict,
      steamLink: node.attributes.field_game_link?.uri,
      cover: coverUrl,
      score: decimalScore,
      links: links,
      tags: allTags
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

  const drupalBase = "https://cms.bunnynun.church";
  const processedBody = review.body?.replace(/src="\/sites/g, `src="${drupalBase}/sites`);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header Image */}
        {review.cover && (
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-[var(--border-color)] shadow-[0_0_40px_var(--vignette-color)] relative group">
                <img src={review.cover} alt={review.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                    <h1 className="text-4xl md:text-7xl font-black text-white uppercase font-[family-name:var(--font-cinzel)] drop-shadow-md leading-none">
                        {review.title}
                    </h1>
                </div>
            </div>
        )}

        {/* Info Grid */}
        <div className="grid md:grid-cols-[1fr_auto] gap-4">
            <div className="bg-[var(--bg-secondary)] border border-[var(--accent-gold)] p-6 rounded-lg flex items-center gap-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <div className="relative w-16 h-16 flex items-center justify-center border-4 border-[var(--accent-gold)] rounded-full flex-shrink-0">
                    <span className="text-white font-black text-xl font-mono">{review.score}</span>
                </div>
                <div>
                    <p className="text-[var(--text-secondary)] text-xs uppercase tracking-widest font-bold mb-1">{t.reviews.verdict_label}</p>
                    <p className="text-2xl md:text-3xl font-black text-[var(--accent-gold)] font-[family-name:var(--font-cinzel)]">{review.verdict}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto min-w-[200px]">
                {review.links && review.links.map((link: any, index: number) => {
                    const url = link.uri;
                    const title = link.title || "Acquire Artifact";
                    let icon = "↗";
                    let colorClass = "bg-zinc-900 border-zinc-700 hover:bg-zinc-800";
                    if (url.includes("steampowered.com")) { icon = "🎮"; colorClass = "bg-[#171a21] border-[#171a21] hover:bg-[#2a475e] text-white"; }
                    else if (url.includes("dlsite.com")) { icon = "📁"; colorClass = "bg-[#002d5d] border-[#002d5d] hover:bg-[#004080] text-white"; }
                    else if (url.includes("itch.io")) { icon = "🔥"; colorClass = "bg-[#fa5c5c] border-[#fa5c5c] hover:bg-[#ff4d4d] text-white"; }
                    return (
                        <a key={index} href={url} target="_blank" className={`${colorClass} border px-6 py-3 rounded-lg flex items-center justify-between transition-all group shadow-lg`}>
                            <span className="font-bold uppercase tracking-widest text-xs group-hover:scale-105 transition-transform">{title}</span>
                            <span className="text-lg opacity-80 group-hover:opacity-100">{icon}</span>
                        </a>
                    );
                })}
            </div>
        </div>

        {/* --- TAGS SECTION --- */}
        {review.tags && review.tags.length > 0 && (
            <div className="border-t border-b border-[var(--border-color)] py-6">
                <p className="text-[var(--text-secondary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-center">
                    {t.reviews.tags_label}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {review.tags.map((t: Tag, idx: number) => (
                        <div key={idx} className={`text-[10px] uppercase border px-3 py-1 rounded font-bold tracking-wide ${
                            t.type === 'engine' ? 'border-yellow-500/30 text-yellow-200 bg-yellow-900/20' :
                            t.type === 'artist' ? 'border-purple-500/30 text-purple-200 bg-purple-900/20' :
                            t.type === 'series' || t.type === 'origin' ? 'border-emerald-500/30 text-emerald-200 bg-emerald-900/20' :
                            t.type === 'character' ? 'border-pink-500/30 text-pink-200 bg-pink-900/20' :
                            'border-white/10 text-[var(--text-secondary)] bg-zinc-900/50'
                        }`}>
                            <SmartTag tag={t} />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Body Text */}
        <div 
            className="prose prose-invert prose-gold max-w-none text-[var(--text-primary)] leading-loose font-serif text-lg p-4 [&>p>img]:rounded-xl [&>p>img]:shadow-[0_0_20px_var(--vignette-color)] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>li]:mb-2"
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