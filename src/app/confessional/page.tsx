import ConfessionalForm from "@/components/ui/confessional-form";
import { getServerLang } from "@/lib/get-server-lang";

// 1. Fetch Logic with Language Support
async function getDrupalCharacters(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    // Using dynamic prefix for localization
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/character?fields[node--character]=title&sort=created`;
    
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    
    if (!res.ok) return [];
    const json = await res.json();

    return json.data.map((node: any) => ({
      id: node.id,
      label: node.attributes.title
    }));

  } catch (error) {
    console.error("Failed to fetch characters for confessional:", error);
    return [];
  }
}

export default async function ConfessionalPage() {
  const lang = await getServerLang();
  const characters = await getDrupalCharacters(lang);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8">
      <ConfessionalForm availableCharacters={characters} />
    </div>
  );
}