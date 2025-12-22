'use client';
import { useLanguage } from '@/context/language-context';

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button 
      onClick={toggleLang}
      className="text-xs font-bold uppercase tracking-widest px-3 py-1 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all font-mono"
    >
      {lang === 'en' ? 'JP 🇯🇵' : 'EN 🇬🇧'}
    </button>
  );
}