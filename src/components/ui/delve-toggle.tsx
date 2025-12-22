'use client';
import { useDelve } from '@/context/delve-context';
import { useLanguage } from '@/context/language-context'; // Import Language
import { useState } from 'react';

export default function DelveToggle() {
  const { isDelving, toggleDelve } = useDelve();
  const { t } = useLanguage(); // Get Dictionary
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative flex items-center gap-4 bg-[var(--bg-secondary)] backdrop-blur-md p-2 rounded-full border border-[var(--border-color)] transition-colors duration-500">
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
      >
        ⚙️
      </button>
      
      <button
        onClick={toggleDelve} 
        className={`px-6 py-2 rounded-full font-black uppercase tracking-tighter transition-all duration-500 font-[family-name:var(--font-cinzel)] ${
          isDelving 
            ? 'bg-[var(--accent-gold)] text-black shadow-[0_0_25px_var(--accent-glow)] scale-105' 
            : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
        }`}
      >
        {isDelving ? t.ui.delve_stop : t.ui.delve_start}
      </button>

      {/* Settings Menu */}
      {showSettings && (
        <div className="absolute top-full right-0 mt-4 p-4 bg-[var(--bg-secondary)] border border-[var(--accent-gold)] shadow-[0_0_20px_var(--accent-glow)] rounded-lg min-w-[200px] z-50">
           <p className="text-[10px] text-[var(--accent-gold)] uppercase font-bold mb-2 tracking-widest border-b border-[var(--border-color)] pb-1">
             {t.ui.settings_filters}
           </p>
           <p className="text-xs text-[var(--text-secondary)] italic">
             {t.ui.coming_soon}
           </p>
        </div>
      )}
    </div>
  );
}