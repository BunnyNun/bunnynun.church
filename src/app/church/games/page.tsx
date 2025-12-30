import GamesList from "@/components/views/games-list";
import { getServerLang } from "@/lib/get-server-lang"; // 1. Import helper

// 2. Update function to accept lang
async function getDrupalGames(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  
  // 3. Dynamic Prefix Logic
  // If lang is 'en', use base URL. If 'ja', add '/ja'.
  const prefix = lang === 'ja' ? '/ja' : ''; 
  
  try {
    // 4. Update Endpoint
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/game?include=field_cover_art&sort=-created`;
    
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    
    if (!res.ok) return [];
    const json = await res.json();
    const included = json.included || [];

    return json.data.map((node: any) => {
      const rel = node.relationships.field_cover_art?.data;
      let coverUrl = null;
      if (rel) {
        const media = included.find((i: any) => i.id === rel.id);
        if (media?.attributes?.uri?.url) {
          coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
        }
      }

      const rawAlias = node.attributes.path?.alias; 
      const slug = rawAlias 
        ? rawAlias.replace(/^\/games\//, "").replace(/^\//, "") 
        : node.id;

      return {
        id: node.id,
        title: node.attributes.title,
        status: node.attributes.field_status || "",
        shortDesc: node.attributes.field_short_description || "",
        cover: coverUrl,
        slug: slug 
      };
    });
  } catch (error) {
    console.error("Games Fetch Error:", error);
    return [];
  }
}

export default async function Games() {
  const lang = await getServerLang(); // 5. Get current lang
  const games = await getDrupalGames(lang); // 6. Pass to fetcher
  
  return <GamesList games={games} />;
}