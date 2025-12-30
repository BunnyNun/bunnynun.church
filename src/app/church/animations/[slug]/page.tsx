import { cookies } from 'next/headers';
import AnimationDetailView from "@/components/views/animation-detail-view"; 
import { getServerLang } from "@/lib/get-server-lang"; // 1. Import Helper

// 2. Accept lang argument
async function getAnimationBySlug(slug: string, lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : ''; // 3. Prefix Logic
  
  try {
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/animation?include=field_thumbnail`;
    const res = await fetch(endpoint, { next: { revalidate: 0 } });
    
    if (!res.ok) return null;
    const json = await res.json();
    
    // THE FIND LOGIC:
    // Note: When translated, the alias might change or Drupal might handle it differently.
    // Ideally, aliases are language specific, but checking both is safer.
    const targetAlias = `/animations/${slug}`;
    const node = json.data.find((n: any) => 
        n.attributes.path?.alias === targetAlias || 
        n.attributes.path?.alias === `/${slug}`
    );

    if (!node) return null;
    
    const included = json.included || [];

    let coverUrl = null;
    if (node.relationships?.field_thumbnail?.data) {
        const mediaId = node.relationships.field_thumbnail.data.id;
        const media = included.find((i: any) => i.id === mediaId);
        if (media?.attributes?.uri?.url) {
            coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
        }
    }

    return {
      title: node.attributes.title,
      desc: node.attributes.body?.value || "",
      iwaraLink: node.attributes.field_iwara_link?.uri || null,
      premiumSource: node.attributes.field_premium_source?.uri || null,
      cover: coverUrl, 
    };
  } catch (error) {
    console.error("Animation Detail Error:", error);
    return null;
  }
}

export default async function AnimationDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const lang = await getServerLang(); // 4. Get Language
  const anim = await getAnimationBySlug(slug, lang); // 5. Pass to Fetcher

  // CHECK PERMISSIONS (Server Side)
  const cookieStore = await cookies();
  const tierCookie = cookieStore.get('bunny_tier');
  const isDevotee = tierCookie?.value === 'devotee';

  // Pass everything to the Client View
  return <AnimationDetailView anim={anim} slug={slug} isDevotee={isDevotee} />;
}