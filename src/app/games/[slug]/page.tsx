import GameDetailView from "@/components/views/game-detail-view"; 
import { getServerLang } from "@/lib/get-server-lang";

async function getGameBySlug(slug: string, lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/game?include=field_cover_art,field_gallery&sort=-created`;
    const res = await fetch(endpoint, { next: { revalidate: 0 } });
    
    if (!res.ok) return null;
    const json = await res.json();
    
    const targetAlias = `/games/${slug}`;
    const node = json.data.find((n: any) => 
        n.attributes.path?.alias === targetAlias || 
        n.attributes.path?.alias === `/${slug}`
    );

    if (!node) return null;

    const included = json.included || [];

    const getUrl = (rel: any) => {
      if (!rel) return null;
      const media = included.find((i: any) => i.id === rel.id);
      return media?.attributes?.uri?.url ? `${drupalUrl}${media.attributes.uri.url}` : null;
    };

    const galleryRels = node.relationships.field_gallery?.data;
    let gallery: string[] = [];
    if (Array.isArray(galleryRels)) {
        gallery = galleryRels.map(getUrl).filter(Boolean) as string[];
    } else if (galleryRels) {
        gallery = [getUrl(galleryRels)].filter(Boolean) as string[];
    }

    return {
      title: node.attributes.title,
      description: node.attributes.body?.value || "",
      features: node.attributes.field_features,
      status: node.attributes.field_status,
      downloadUrl: node.attributes.field_download_link?.uri,
      gallery: gallery
    };

  } catch (error) {
    console.error("Game Detail Error:", error);
    return null;
  }
}

export default async function GameDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const lang = await getServerLang();
  const game = await getGameBySlug(slug, lang);

  return <GameDetailView game={game} slug={slug} />;
}