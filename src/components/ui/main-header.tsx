'use client'; 

import { useDelve } from "@/context/delve-context";
import { useLanguage } from "@/context/language-context"; 
import DelveToggle from "./delve-toggle";
import LangToggle from "./lang-toggle";

export default function MainHeader() {
  const { isDelving } = useDelve();
  const { t } = useLanguage();

  return (
    <header className="bg-[var(--bg-primary)] sticky top-0 z-[100] border-b border-[var(--border-color)] transition-colors duration-700">
      <div className="flex items-center justify-between px-8 py-4">
        
        {/* NAV LINKS */}
        <nav className="flex gap-x-8 items-center text-sm uppercase tracking-widest font-bold font-[family-name:var(--font-cinzel)] text-[var(--text-secondary)]">
          
          <a href="/" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.home}
          </a>
          <a href="/games" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.games}
          </a>
          <a href="/animations" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.animations}
          </a>
        

          <a href="/characters" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.characters}
          </a>
          
          <a href="/confessional" className="text-[var(--accent-gold)] hover:text-white transition-colors duration-300">
            {t.nav.confess}
          </a>
          
          {/* NEW COMMISSIONS LINK */}
          <a href="/commissions" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.commissions}
          </a>

          <a href="/reviews" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.reviews}
          </a>

          {isDelving && (
            <a 
              href="/sanctuary" 
              className="text-[var(--accent-gold)] animate-pulse drop-shadow-[0_0_10px_var(--accent-glow)] hover:text-white transition-all duration-300"
            >
              {t.nav.sanctuary}
            </a>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}