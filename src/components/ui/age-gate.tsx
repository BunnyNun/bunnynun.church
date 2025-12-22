'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context'; // Import Context
import LangToggle from "./lang-toggle";

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage(); // Grab the dictionary

  useEffect(() => {
    // We still use localStorage for "Age Verification" (client-only check is fine here)
    // But you COULD move this to a cookie if you want the server to know they are verified.
    const isVerified = localStorage.getItem('bunny_age_verified');
    
    if (!isVerified) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('bunny_age_verified', 'true');
    setIsVisible(false);
    document.body.style.overflow = 'auto';
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-8 transition-opacity duration-1000">
      
      {/* Container */}
      <div className="max-w-md w-full border border-[var(--border-color)] bg-[var(--bg-primary)] p-12 text-center rounded-xl shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Decorative Gold Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-gold)] shadow-[0_0_20px_var(--accent-glow)]" />

        <div className="space-y-8 relative z-10">
          
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-[var(--accent-gold)] uppercase font-[family-name:var(--font-cinzel)] leading-none">
              {t.ageGate.title}
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-[0.2em] border-b border-[var(--border-color)] pb-4">
              {t.ageGate.subtitle}
            </p>
          </div>

          {/* Warning Text (Using dangerouslySetInnerHTML for the <strong> tags) */}
          <div className="space-y-4 text-[var(--text-primary)] font-mono text-sm leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t.ageGate.text1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.ageGate.text2 }} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4">
            <button 
              onClick={handleEnter}
              className="w-full py-4 bg-[var(--accent-gold)] text-black font-black uppercase tracking-widest text-sm rounded hover:scale-[1.02] transition-transform shadow-[0_0_20px_var(--accent-glow)]"
            >
              {t.ageGate.enter}
            </button>
            
            <button 
              onClick={handleExit}
              className="w-full py-3 border border-zinc-800 text-zinc-500 hover:text-white hover:border-white transition-colors uppercase font-bold text-xs tracking-widest"
            >
              {t.ageGate.leave}
            </button>
          </div>
            <div className="flex items-center gap-4">
                <LangToggle />
            </div>
        </div>
      </div>
    </div>
  );
}