import CharacterDetailView from "@/components/views/character-detail-view"; 
import { getServerLang } from "@/lib/get-server-lang"; 

async function getCharacterBySlug(slug: string, lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/character?include=field_base_image`;
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    
    if (!res.ok) return null;
    const json = await res.json();
    
    const targetAlias = `/characters/${slug}`;
    const node = json.data.find((n: any) => 
      n.attributes.path?.alias === targetAlias ||
      n.attributes.path?.alias === `/${slug}`
    );

    if (!node) return null;

    const included = json.included || [];

    const imageRel = node.relationships.field_base_image?.data;
    let imageUrl = "/assets/temp/base.png"; 

    if (imageRel) {
      const mediaObj = included.find((inc: any) => inc.id === imageRel.id);
      if (mediaObj?.attributes?.uri?.url) {
        imageUrl = `${drupalUrl}${mediaObj.attributes.uri.url}`;
      }
    }

    return {
      name: node.attributes.title,
      role: node.attributes.field_role || "", 
      desc: node.attributes.field_description || "",
      baseImage: imageUrl,
    };

  } catch (error) {
    console.error("Character Detail Error:", error);
    return null;
  }
}

export default async function CharacterDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const lang = await getServerLang();
  const char = await getCharacterBySlug(slug, lang);

  return <CharacterDetailView char={char} slug={slug} />;
}