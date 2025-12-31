import { getServerLang } from "@/lib/get-server-lang";
import ReviewsListView from "@/components/views/reviews-list";

// --- 1. DEFINE TYPES (Copy these to be safe) ---
type TagType = 'content' | 'genre' | 'artist' | 'engine' | 'series' | 'origin' | 'character';

interface Tag {
  name: string;
  type: TagType;
  tier: 1 | 2 | 3;
  parent?: string | null;
}

async function getReviews(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    // 2. FETCH DEEP LINEAGE (3 Levels Up)
    const includes = [
        "field_review_art",
        "field_primary_review_tags", 
        "field_primary_review_tags.parent", 
        "field_primary_review_tags.parent.parent",
        
        "field_secondary_review_tags", 
        "field_secondary_review_tags.parent", 
        "field_secondary_review_tags.parent.parent",
        
        "field_tertiary_review_tags", 
        "field_tertiary_review_tags.parent", 
        "field_tertiary_review_tags.parent.parent"
    ];

    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/review?include=${includes.join(',')}&sort=-created`;
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const json = await res.json();
    const included = json.included || [];

    // --- SMART TYPE INFERENCE HELPER ---
    // Determines if a tag is an Engine, Character, etc. based on its folder
    const inferTypeAndParent = (tagObj: any): { type: TagType, parentName: string | null } => {
        let currentType: TagType = 'content'; // Default
        let parentName = null;
        let rootName = null;
        let depth = 0;

        // 1. Get Immediate Parent
        if (tagObj.relationships?.parent?.data?.[0]) {
            const pId = tagObj.relationships.parent.data[0].id;
            const pObj = included.find((i: any) => i.id === pId);
            
            if (pObj) {
                parentName = pObj.attributes.name;
                rootName = parentName; // Assume parent is root for now
                depth = 1;

                // 2. Get Grandparent (The Root Folder?)
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

        // 3. Logic Map: Check the Root Folder Name
        switch (rootName) {
            case 'Engine':
                currentType = 'engine';
                break;
            case 'Genre':
                currentType = 'genre';
                break;
            case 'Artist':
                currentType = 'artist';
                break;
            case 'Origin': // Matches your "Origins" folder
                // Depth 1 = Touhou (Series/Origin)
                // Depth 2 = Reimu (Character)
                currentType = depth === 2 ? 'character' : 'origin';
                break;
            default:
                // Fallback for Content tags (e.g. Non-Con -> Rape)
                currentType = 'content';
                break;
        }

        // Clean up parent name for display (Don't show "Origins" or "Engines" as the parent tag text)
        const systemFolders = ['Engines', 'Genres', 'Artists', 'Origins', 'Series', 'Content', 'Root'];
        if (parentName && systemFolders.includes(parentName)) {
            parentName = null;
        }

        return { type: currentType, parentName };
    };

    // --- TAG PROCESSOR ---
    const processTags = (rels: any, startTier: 1 | 2 | 3): Tag[] => {
        const data = rels?.data || [];
        const generatedTags: Tag[] = [];

        data.forEach((rel: any) => {
            const tagObj = included.find((inc: any) => inc.id === rel.id);
            if (!tagObj) return;

            // INFER TYPE AUTOMATICALLY
            const { type, parentName } = inferTypeAndParent(tagObj);
            
            // Add the Main Tag
            generatedTags.push({
                name: tagObj.attributes.name,
                type: type,
                tier: startTier,
                parent: parentName
            });

            // LOGIC: If it's a Character (Reimu), ensure the Series (Touhou) is added as a tag too
            if (type === 'character' && parentName) {
                generatedTags.push({
                    name: parentName,
                    type: 'origin', // Force parent of character to be Origin/Series
                    tier: startTier === 1 ? 2 : 3, // Demote tier by 1 step
                    parent: null
                });
            }
            
            // LOGIC: If it's Content (Gangbang), ensure Parent (Rape) is added
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

    return json.data.map((node: any) => {
      // Image Logic
      let coverUrl = null;
      if (node.relationships?.field_review_art?.data) {
        const mediaId = node.relationships.field_review_art.data.id;
        const media = included.find((i: any) => i.id === mediaId);
        if (media?.attributes?.uri?.url) {
          coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
        }
      }

      // Process Tags
      const primary = processTags(node.relationships.field_primary_review_tags, 1);
      const secondary = processTags(node.relationships.field_secondary_review_tags, 2);
      const tertiary = processTags(node.relationships.field_tertiary_review_tags, 3);
      
      // Deduplicate (Keep lowest tier / highest priority)
      const tagMap = new Map<string, Tag>();
      [...primary, ...secondary, ...tertiary].forEach(tag => {
          if (!tagMap.has(tag.name)) {
              tagMap.set(tag.name, tag);
          } else {
              const existing = tagMap.get(tag.name)!;
              if (tag.tier < existing.tier) {
                  tagMap.set(tag.name, tag);
              }
          }
      });

      const rawAlias = node.attributes.path?.alias; 
      const slug = rawAlias ? rawAlias.replace(/^\/reviews\//, "").replace(/^\//, "") : node.id;
      const rawScore = node.attributes.field_rating || 0;
      const displayScore = Math.floor(rawScore / 10); 

      return {
        id: node.id,
        title: node.attributes.title,
        verdict: node.attributes.field_verdict || "Pending Judgment",
        score: displayScore,
        cover: coverUrl,
        slug: slug,
        tags: Array.from(tagMap.values())
      };
    });
  } catch (error) {
    return [];
  }
}

export default async function ReviewsPage() {
  const lang = await getServerLang();
  const reviews = await getReviews(lang);
  return <ReviewsListView reviews={reviews} />;
}