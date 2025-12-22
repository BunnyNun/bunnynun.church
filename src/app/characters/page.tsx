import CharactersList from "@/components/views/characters-list";
import { getServerLang } from "@/lib/get-server-lang";

async function getDrupalCharacters(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : ''; // Dynamic prefix
  
  try {
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/character?include=field_base_image&sort=created`;
    const res = await fetch(endpoint, { next: { revalidate: 60 } });

    if (!res.ok) return [];

    const json = await res.json();
    const included = json.included || [];

    return json.data.map((node: any) => {
      const imageRel = node.relationships.field_base_image?.data;
      let imageUrl = "/assets/temp/base.png"; 

      if (imageRel) {
        const mediaObj = included.find((inc: any) => inc.id === imageRel.id);
        if (mediaObj?.attributes?.uri?.url) {
          imageUrl = `${drupalUrl}${mediaObj.attributes.uri.url}`;
        }
      }

      const rawAlias = node.attributes.path?.alias; 
      const slug = rawAlias 
        ? rawAlias.replace(/^\/characters\//, "").replace(/^\//, "") 
        : node.id;

      return {
        id: node.id,
        name: node.attributes.title,
        role: node.attributes.field_role || "",
        desc: node.attributes.field_description || "",
        baseImage: imageUrl,
        slug: slug
      };
    });

  } catch (error) {
    console.error("Drupal Connection Error:", error);
    return [];
  }
}

export default async function Characters() {
  const lang = await getServerLang();
  const characters = await getDrupalCharacters(lang);
  return <CharactersList characters={characters} />;
}