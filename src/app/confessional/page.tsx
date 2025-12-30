import { getServerLang } from "@/lib/get-server-lang";
import ConfessionalClient from "@/components/ui/confessional-client";
import { cookies } from 'next/headers';

// --- FETCH 1: CHARACTERS (For the Form) ---
async function getDrupalCharacters(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';
  
  try {
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/character?fields[node--character]=title&sort=created`;
    // Revalidate every 60s
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    
    if (!res.ok) return [];
    const json = await res.json();

    return json.data.map((node: any) => ({
      id: node.id,
      label: node.attributes.title
    }));

  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return [];
  }
}

// --- FETCH 2: PUBLIC CONFESSIONS (For the Wall) ---
async function getPublicConfessions(lang: string) {
  const drupalUrl = "https://cms.bunnynun.church";
  const prefix = lang === 'ja' ? '/ja' : '';

  try {
    // Fetch published confessions, newest first
    const endpoint = `${drupalUrl}${prefix}/jsonapi/node/confession?filter[status]=1&sort=-created&page[limit]=20&fields[node--confession]=field_confession_text,field_vote_count`;
    
    const res = await fetch(endpoint, { next: { revalidate: 30 } });
    
    if (!res.ok) return [];
    const json = await res.json();

    return json.data.map((node: any) => ({
      id: node.id,
      text: node.attributes.field_confession_text,
      votes: node.attributes.field_vote_count || 0
    }));

  } catch (error) {
    console.error("Failed to fetch confessions:", error);
    return [];
  }
}

export default async function ConfessionalPage() {
  const lang = await getServerLang();
  
  // Read the Vote Cookie
  const cookieStore = await cookies();
  const votedCookie = cookieStore.get('bunnynun_votes');
  const initialVotedIds = votedCookie?.value ? votedCookie.value.split(',') : [];

  const [characters, confessions] = await Promise.all([
    getDrupalCharacters(lang),
    getPublicConfessions(lang)
  ]);

  return (
    <main className="w-full pt-24 pb-24">
      <ConfessionalClient 
          availableCharacters={characters || []} 
          initialConfessions={confessions || []}
          initialVotedIds={initialVotedIds} // <--- Pass this prop
      />
    </main>
  );
}