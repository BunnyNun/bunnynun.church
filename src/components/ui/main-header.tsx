'use client'; 

import { useDelve } from "@/context/delve-context";
import { useLanguage } from "@/context/language-context"; 
import DelveToggle from "./delve-toggle";
import LangToggle from "./lang-toggle";

export default function MainHeader() {
  // FIX 1: Renamed 'isDelving' to 'isDelveActive' to match your Context
  const { isDelveActive } = useDelve();
  const { t } = useLanguage();

  // Helper to switch domain based on env (Optional, defaults to Prod structure)
  const getUrl = (sub: string) => {
    // If you are on localhost, uncomment this line:
    // return `http://${sub}.bunnynun.local:3000`;
    return `https://${sub}.bunnynun.church`;
  };

  return (
    <header className="bg-[var(--bg-primary)] sticky top-0 z-[100] border-b border-[var(--border-color)] transition-colors duration-700 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* LEFT: MAIN CONTENT (Bunny's Domain) */}
        <nav className="flex gap-x-6 items-center text-sm uppercase tracking-widest font-bold font-[family-name:var(--font-cinzel)] text-[var(--text-secondary)]">
          
          <a href="/" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.home}
          </a>
          <a href="/games" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.games}
          </a>
          <a href="/animations" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            {t.nav.animations}
          </a>
          <a href="/reviews" className="hover:text-[var(--accent-gold)] transition-colors duration-300">
            Scripture
          </a>
        </nav>

        {/* RIGHT: THE PORTALS & TOGGLES */}
        <div className="flex items-center gap-6">
            
            {/* The Subdomain Portals */}
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono border-r border-white/10 pr-6 mr-2">
                <a href={getUrl('lab')} className="text-cyan-600 hover:text-cyan-400 uppercase tracking-wider transition-colors">
                    [ 🧪 Lab ]
                </a>
                <a href={getUrl('library')} className="text-stone-500 hover:text-stone-300 uppercase tracking-wider transition-colors">
                    [ 📚 Lib ]
                </a>
                <a href={getUrl('treasury')} className="text-emerald-700 hover:text-emerald-500 uppercase tracking-wider transition-colors">
                    [ 💰 Bank ]
                </a>
                <a href={getUrl('confess')} className="text-rose-800 hover:text-rose-500 uppercase tracking-wider transition-colors">
                    [ 💋 Lust ]
                </a>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-4">
                <LangToggle />
                <DelveToggle />
            </div>
        </div>

      </div>
    </header>
  );
}