'use client';

import React, { createContext, useContext, useState } from 'react';
import { Locale, getDictionary } from '@/lib/dictionary';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type Dictionary = ReturnType<typeof getDictionary>;

interface LanguageContextType {
  lang: Locale;
  t: Dictionary;
  toggleLang: () => void;
}

const defaultDictionary = getDictionary('en');

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: defaultDictionary,
  toggleLang: () => {},
});

export function LanguageProvider({ 
  children, 
  initialLang = 'en' 
}: { 
  children: React.ReactNode; 
  initialLang?: Locale 
}) {
  const [lang, setLang] = useState<Locale>(initialLang);
  const router = useRouter();

  const toggleLang = () => {
    // 1. Calculate new language based on current state
    const newLang = lang === 'en' ? 'ja' : 'en';

    // 2. Perform Side Effects (Cookie & Router) FIRST
    Cookies.set('bunny_lang', newLang, { expires: 365 });
    router.refresh();

    // 3. Finally, update the local state
    setLang(newLang);
  };

  const t = getDictionary(lang);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);