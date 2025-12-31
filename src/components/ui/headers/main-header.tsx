'use client'; 

import { useLanguage } from "@/context/language-context"; 
import DelveToggle from "../delve-toggle";
import LangToggle from "../lang-toggle";
import UniverseNav from "../universe-nav";

export default function MainHeader() {
  const { t } = useLanguage();

  return (
    <header className="bg-[var(--bg-primary)] sticky top-0 z-[100] border-b border-[var(--border-color)] transition-colors duration-700 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* LEFT: MAIN CONTENT */}
        <nav className="hidden md:flex gap-x-6 items-center text-sm uppercase tracking-widest font-bold font-[family-name:var(--font-cinzel)] text-[var(--text-secondary)]">
          <a href="/" className="hover:text-[var(--accent-gold)] transition-colors"> {t.nav.home} </a>
          <a href="/games" className="hover:text-[var(--accent-gold)] transition-colors"> {t.nav.games} </a>
          <a href="/animations" className="hover:text-[var(--accent-gold)] transition-colors"> {t.nav.animations} </a>
          <a href="/music" className="hover:text-[var(--accent-gold)] transition-colors"> Music </a>
          <a href="/art" className="hover:text-[var(--accent-gold)] transition-colors"> Art </a>
        </nav>

        {/* RIGHT: PORTALS & TOGGLES */}
        <div className="flex items-center gap-6 ml-auto">
            {/* The Shared Component */}
            <UniverseNav className="border-r border-white/10 pr-6 mr-2" />

            <div className="flex items-center gap-4">
                <LangToggle />
                <DelveToggle />
            </div>
        </div>
      </div>
    </header>
  );
}