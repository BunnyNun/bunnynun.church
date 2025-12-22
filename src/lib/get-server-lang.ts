import { cookies } from 'next/headers';
import { Locale } from './dictionary';

export async function getServerLang(): Promise<Locale> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('bunny_lang');
  return (langCookie?.value === 'ja' ? 'ja' : 'en') as Locale;
}