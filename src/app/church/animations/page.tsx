import type { Metadata } from "next";
import AnimationsList from "@/components/views/animations-list";
import { getServerLang } from "@/lib/get-server-lang";

export const metadata: Metadata = {
  title: 'Sacred Motion | Bunny Nun',
  description: 'Animated worship of the flesh.',
};

async function getAnimations(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  const endpoint = `${drupalUrl}${prefix}/jsonapi/node/animation?include=field_thumbnail&sort=-created`;
  
  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const json = await res.json();
    const included = json.included || [];

    return json.data.map((node: any) => {
      const rel = node.relationships.field_thumbnail?.data;
      let coverUrl = null;
      if (rel) {
        const media = included.find((i: any) => i.id === rel.id);
        if (media?.attributes?.uri?.url) {
          coverUrl = `${drupalUrl}${media.attributes.uri.url}`;
        }
      }

      const rawAlias = node.attributes.path?.alias;
      const slug = rawAlias ? rawAlias.replace(/^\/animations\//, "").replace(/^\//, "") : node.id;

      return {
        id: node.id,
        title: node.attributes.title,
        cover: coverUrl,
        slug: slug,
        duration: node.attributes.field_duration || "Loop"
      };
    });
  } catch (error) {
    console.error("Animation Fetch Error:", error);
    return [];
  }
}

export default async function AnimationsPage() {
  const lang = await getServerLang();
  const animations = await getAnimations(lang);
  return <AnimationsList animations={animations} />;
}