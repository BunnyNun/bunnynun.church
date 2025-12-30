'use client';

import { useState } from 'react';
import { submitConfession } from '@/actions/submit-confession'; 
import { toggleVote } from '@/actions/vote-confession';
import { useLanguage } from '@/context/language-context';

interface CharacterOption {
  id: string;
  label: string;
}

interface Confession {
  id: string;
  text: string;
  votes: number;
}

export default function ConfessionalClient({ 
  availableCharacters,
  initialConfessions,
  initialVotedIds = [] // <--- Accept it
}: { 
  availableCharacters: CharacterOption[],
  initialConfessions: Confession[],
  initialVotedIds?: string[]
}) {
  const { t } = useLanguage();
  
  // State for Confessions (so we can update votes dynamically)
  const [confessions, setConfessions] = useState(initialConfessions);
  // State to track which IDs the user has clicked in this session (for visual feedback)
  const [localVotedIds, setLocalVotedIds] = useState<Set<string>>(new Set());
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form State
  const [text, setText] = useState("");
  const [futureConsent, setFutureConsent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!futureConsent || text.trim().length === 0) return;
    
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await submitConfession(formData);
      if (result?.error) {
        setSubmissionStatus('error');
        setErrorMessage(result.error);
      } else {
        setSubmissionStatus('success');
        setText(""); 
      }
    } catch (e) {
      setSubmissionStatus('error');
      setErrorMessage("The void did not answer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submissionStatus === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-1000">
        <h1 className="text-6xl font-black text-rose-500 uppercase tracking-widest drop-shadow-[0_0_25px_rgba(225,29,72,0.8)]">
          ACCEPTED
        </h1>
        <p className="text-rose-200 font-mono text-sm tracking-[0.2em]">
          Your filth has been recorded. Asmodeus is pleased.
        </p>
        <button 
            onClick={() => setSubmissionStatus('idle')}
            className="text-xs text-rose-800 underline hover:text-rose-500 mt-8 uppercase"
        >
            Submit Another
        </button>
      </div>
    );
  }

  // NEW: Vote Handler
  async function handleVote(id: string) {
    // 1. Optimistic Update
    const isCurrentlyVoted = localVotedIds.has(id);
    setLocalVotedIds(prev => {
        const next = new Set(prev);
        if (isCurrentlyVoted) next.delete(id);
        else next.add(id);
        return next;
    });

    setConfessions(prev => prev.map(c => {
        if (c.id === id) {
            return { ...c, votes: isCurrentlyVoted ? c.votes - 1 : c.votes + 1 };
        }
        return c;
    }));

    // 2. Server Request
    const result = await toggleVote(id);

    // 3. Revert if failed (or Sync with true server count)
    if (!result.success) {
        // Revert UI changes if error
        setConfessions(prev => prev.map(c => {
            if (c.id === id) {
                return { ...c, votes: isCurrentlyVoted ? c.votes + 1 : c.votes - 1 };
            }
            return c;
        }));
         // Toast or silent error here
    } else {
        // Sync with actual server count to be safe
        setConfessions(prev => prev.map(c => {
            if (c.id === id) return { ...c, votes: result.newCount };
            return c;
        }));
    }
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-12 relative z-20 px-6 md:px-12 py-12">
      
      {/* HEADER - Spans Full Width */}
      <header className="text-center space-y-4 animate-in fade-in zoom-in duration-1000 mb-16">
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-rose-500 via-pink-600 to-rose-900 uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(225,29,72,0.6)] font-[family-name:var(--font-cinzel)]">
          {t.confess?.title || "CONFESSIONAL"}
        </h1>
        <p className="text-rose-300/80 font-mono text-xs uppercase tracking-[0.5em] animate-pulse">
          {t.confess?.subtitle || "Asmodeus is watching."}
        </p>
      </header>

      {/* ERROR MESSAGE */}
      {submissionStatus === 'error' && (
          <div className="w-full bg-red-950/50 border border-red-600 text-red-200 p-4 text-center text-xs font-mono uppercase tracking-widest animate-pulse mb-8">
             Error: {errorMessage}
          </div>
      )}

      {/* THE SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        
        {/* === LEFT COLUMN: THE BOOTH (FORM) === */}
        <div className="space-y-10">
            <div className="border-b border-rose-900/30 pb-4 mb-4">
                <h2 className="text-rose-600 text-sm font-black uppercase tracking-[0.2em]">
                    Step Into The Booth
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 1. IDENTITY */}
                <div className="space-y-3">
                    <label className="text-[10px] text-rose-500 font-bold uppercase tracking-widest pl-1">Identify Yourself</label>
                    <input 
                        type="text" 
                        name="sinnerName"
                        placeholder="Anonymous Sinner"
                        className="w-full bg-black/80 border border-rose-900/50 text-rose-300 p-5 text-sm focus:outline-none focus:border-rose-500 transition-colors font-mono placeholder:text-rose-900/30 rounded"
                    />
                </div>

                {/* 2. TARGET (Redesigned Grid Buttons) */}
                <div className="space-y-3">
                    <label className="text-[10px] text-rose-500 font-bold uppercase tracking-widest pl-1">Select Subjects</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {availableCharacters.map(char => (
                            <label key={char.id} className="cursor-pointer relative group h-14">
                                <input type="checkbox" name="characters" value={char.id} className="peer hidden" />
                                {/* The Button Visual */}
                                <div className="absolute inset-0 bg-rose-950/20 border border-rose-900/30 flex items-center justify-center transition-all duration-300 peer-checked:bg-rose-900 peer-checked:border-rose-500 peer-checked:shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:border-rose-700 rounded-sm">
                                    <span className="text-[10px] text-rose-900/60 uppercase font-bold peer-checked:text-rose-100 group-hover:text-rose-500 transition-colors text-center px-1 tracking-wider">
                                        {char.label}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 3. THE TEXTAREA */}
                <div className="space-y-3">
                    <label className="text-[10px] text-rose-500 font-bold uppercase tracking-widest pl-1">Your Desire</label>
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-900 via-pink-900 to-rose-900 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-black border border-rose-900/50 p-1 rounded-lg">
                            <textarea 
                            name="confession"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Tell me what a pathetic little degenerate you are. What do you want to see?" 
                            className="w-full h-64 bg-[#080102] text-rose-100 p-6 text-base placeholder:text-rose-900/30 focus:outline-none focus:bg-[#0f0205] transition-colors resize-none font-mono leading-relaxed selection:bg-rose-900 selection:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. CONSENT & SUBMIT */}
                <div className="space-y-8 pt-4">
                    <div className="flex flex-col gap-4 px-4 py-4 border-l-2 border-rose-900/30 bg-rose-900/5">
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input type="checkbox" name="isPublic" className="accent-rose-600 w-5 h-5 cursor-pointer" />
                            <span className="text-xs text-rose-800 group-hover:text-rose-400 transition-colors font-mono">
                                Make my shame public (Post to the Wall)
                            </span>
                        </label>
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                name="futureUseConsent" 
                                checked={futureConsent}
                                onChange={(e) => setFutureConsent(e.target.checked)}
                                className="accent-rose-600 w-5 h-5 cursor-pointer" 
                            />
                            <span className="text-xs text-rose-800 group-hover:text-rose-400 transition-colors font-mono">
                                I consent to this idea being used for content.
                            </span>
                        </label>
                    </div>

                    <button 
                        type="submit"
                        disabled={!futureConsent || text.length === 0 || isSubmitting}
                        className="w-full bg-rose-900 hover:bg-rose-600 disabled:bg-rose-950 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase py-5 text-lg tracking-[0.3em] transition-all hover:shadow-[0_0_40px_#e11d48] active:scale-[0.98] rounded-sm"
                    >
                        {isSubmitting ? "TRANSMITTING..." : "SUBMIT YOUR FILTH"}
                    </button>
                </div>
            </form>
        </div>

        {/* === RIGHT COLUMN: THE WALL (FEED) === */}
       <div className="space-y-8 relative h-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rose-900/30 pb-4 mb-4">
                 <h2 className="text-rose-600 text-sm font-black uppercase tracking-[0.2em]">
                    The Wall of Shame
                 </h2>
                 <div className="flex items-center gap-2 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900/30">
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_#e11d48]"></span>
                    <span className="text-[10px] text-rose-400 font-mono tracking-widest">LIVE FEED</span>
                 </div>
            </div>

            {/* Scrollable Container */}
            <div className="h-[800px] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-rose-900 scrollbar-track-black/50 mask-gradient-bottom overscroll-contain">
                
                {confessions.length > 0 ? (
                    confessions.map((sin) => {
                        const isVoted = localVotedIds.has(sin.id);
                        return (
                            <div key={sin.id} className="group relative">
                                {/* Hover Glow */}
                                <div className="absolute -inset-0.5 bg-rose-900/0 group-hover:bg-rose-900/20 blur transition-all duration-500" />
                                
                                <div className="relative bg-[#050102] border border-rose-900/30 p-6 hover:border-rose-500/50 transition-colors flex flex-col gap-4">
                                    <span className="text-4xl text-rose-900/20 font-serif absolute top-2 left-2">“</span>
                                    <p className="text-sm md:text-base text-rose-200/80 font-serif italic leading-relaxed relative z-10 pl-4">
                                        {sin.text}
                                    </p>
                                    <div className="flex justify-between items-end pt-4 border-t border-rose-900/10 mt-2">
                                        <span className="text-[10px] text-rose-800 uppercase font-bold tracking-wider">Anonymous</span>
                                        
                                        {/* THE VOTING BUTTON */}
                                        <button 
                                            onClick={() => handleVote(sin.id)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-300 group/vote
                                                ${isVoted 
                                                    ? "bg-rose-600 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.6)]" 
                                                    : "bg-rose-950/30 border-rose-900/20 hover:border-rose-500 hover:bg-rose-900/40"
                                                }
                                            `}
                                        >
                                            <span className={`text-[10px] font-bold uppercase transition-colors ${isVoted ? "text-white" : "text-rose-600 group-hover/vote:text-rose-400"}`}>
                                                {isVoted ? "LUSTING" : "LUST"}
                                            </span>
                                            <span className={`text-xs font-mono font-bold pl-2 border-l ml-1 transition-colors ${isVoted ? "text-white border-white/30" : "text-rose-400 border-rose-900/50 group-hover/vote:text-rose-200"}`}>
                                                +{sin.votes}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    /* ... Empty State ... */
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-rose-900/10 rounded p-12 text-center space-y-6">
                        <span className="text-6xl opacity-10 grayscale">🕸️</span>
                        <p className="text-rose-900/40 text-xs font-mono uppercase tracking-widest leading-loose">
                            The wall is silent. <br/>Be the first to stain it.
                        </p>
                    </div>
                )}
            </div>
       </div>
      </div>
    </div>
  );
}