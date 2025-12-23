'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from "@/context/language-context";

// --- CONFIGURATION ---
type TagType = 'content' | 'genre' | 'artist' | 'engine' | 'series' | 'origin' | 'character';

const TYPE_CONFIG: Record<TagType, { order: number; cardClass: string }> = {
  artist:    { order: 1, cardClass: "border-purple-500/30 text-purple-200 bg-purple-900/20" },
  engine:    { order: 2, cardClass: "border-yellow-500/30 text-yellow-200 bg-yellow-900/20" },
  series:    { order: 3, cardClass: "border-emerald-500/30 text-emerald-200 bg-emerald-900/20" },
  origin:    { order: 4, cardClass: "border-emerald-500/30 text-emerald-200 bg-emerald-900/20" },
  character: { order: 5, cardClass: "border-pink-500/30 text-pink-200 bg-pink-900/20" },
  genre:     { order: 6, cardClass: "border-white/10 text-[var(--text-secondary)]" },
  content:   { order: 7, cardClass: "border-white/10 text-[var(--text-secondary)]" }
};

interface Tag { name: string; type: TagType; tier: 1 | 2 | 3; parent?: string | null; }
interface Review { id: string; title: string; slug: string; cover: string | null; verdict: string; score: number; tags: Tag[]; }
type FilterState = 'include' | 'exclude' | 'neutral';

// --- COMPONENT: AUTO SCROLL TITLE (Updated for Card Hover + Ellipsis) ---
const AutoScrollTitle = ({ text, className, isHovered }: { text: string, className?: string, isHovered: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (isHovered && containerRef.current && ghostRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const textWidth = ghostRef.current.scrollWidth; // Measure the untruncated ghost
            const difference = textWidth - containerWidth;

            if (difference > 0) {
                // Wait a split second before scrolling so it doesn't feel jumpy
                const timer = setTimeout(() => {
                    setOffset(difference);
                    setDuration(difference * 20); // 20ms per pixel
                }, 150);
                return () => clearTimeout(timer);
            }
        } else {
            // Instant reset
            setOffset(0);
            setDuration(0);
        }
    }, [isHovered]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Visible Text */}
            <div 
                className={`whitespace-nowrap inline-block ${isHovered ? '' : 'truncate w-full'}`}
                style={{
                    transform: `translateX(-${offset}px)`,
                    transitionProperty: 'transform',
                    transitionDuration: `${duration}ms`,
                    transitionTimingFunction: 'linear'
                }}
            >
                {text}
            </div>

            {/* Invisible Ghost for Measuring */}
            <div 
                ref={ghostRef} 
                className="absolute top-0 left-0 whitespace-nowrap invisible pointer-events-none" 
                aria-hidden="true"
            >
                {text}
            </div>
        </div>
    );
};

// --- COMPONENT: SMART TAG DISPLAY ---
const SmartTag = ({ tag, className }: { tag: Tag, className?: string }) => {
    const { name, parent, type } = tag;
    const match = name.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) return <span className={`${className} flex items-baseline gap-1`}><span>{match[1]}</span><span className="opacity-50 text-[0.7em] uppercase tracking-wider">{match[2]}</span></span>;
    if (parent && type !== 'content' && parent !== 'Content' && parent !== 'Tags' && parent !== 'Root') return <span className={`${className} flex items-baseline gap-1`}><span>{name}</span><span className="opacity-50 text-[0.7em] uppercase tracking-wider">{parent}</span></span>;
    return <span className={className}>{name}</span>;
};

// --- COMPONENT: SMART DUAL SLIDER ---
const SmartRangeSlider = ({ min, max, onChange }: { min: number, max: number, onChange: (min: number, max: number) => void }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
    const getValueFromClientX = useCallback((clientX: number) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = (clientX - rect.left) / rect.width;
        return Math.max(0, Math.min(10, Math.round(percent * 10)));
    }, []);
    const handleMouseDown = (e: React.MouseEvent) => {
        const val = getValueFromClientX(e.clientX);
        const distMin = Math.abs(val - min);
        const distMax = Math.abs(val - max);
        if (distMin < distMax) { setDragging('min'); onChange(Math.min(val, max), max); }
        else if (distMax < distMin) { setDragging('max'); onChange(min, Math.max(val, min)); }
        else { if (val < min) { setDragging('min'); onChange(val, max); } else { setDragging('max'); onChange(min, val); } }
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => { if (!dragging) return; const val = getValueFromClientX(e.clientX); if (dragging === 'min') onChange(Math.min(val, max), max); else onChange(min, Math.max(val, min)); };
        const handleMouseUp = () => setDragging(null);
        if (dragging) { window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseup', handleMouseUp); }
        return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
    }, [dragging, min, max, onChange, getValueFromClientX]);
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end h-8 pb-1 border-b border-transparent"><label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Score Range</label><span className="text-[var(--accent-gold)] font-mono font-bold text-sm">{min} - {max}</span></div>
            <div ref={trackRef} onMouseDown={handleMouseDown} className="relative h-4 flex items-center cursor-pointer select-none touch-none py-2">
                <div className="absolute w-full h-1 bg-zinc-800 rounded-full" />
                <div className="absolute h-1 bg-[var(--accent-gold)] opacity-80" style={{ left: `${min * 10}%`, right: `${100 - (max * 10)}%` }} />
                <div className={`absolute h-4 w-4 rounded-full shadow border transition-transform ${dragging === 'min' ? 'scale-125 bg-[var(--accent-gold)] border-white z-20' : 'bg-zinc-200 border-zinc-500 z-10'}`} style={{ left: `calc(${min * 10}% - 8px)` }} />
                <div className={`absolute h-4 w-4 rounded-full shadow border transition-transform ${dragging === 'max' ? 'scale-125 bg-[var(--accent-gold)] border-white z-20' : 'bg-zinc-200 border-zinc-500 z-10'}`} style={{ left: `calc(${max * 10}% - 8px)` }} />
            </div>
        </div>
    );
};

// --- COMPONENT: TRI-STATE FILTER ---
const TriStateFilter = ({ title, items, state, onChange }: { title: string; items: string[]; state: Record<string, FilterState>; onChange: (tag: string, newState: FilterState) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = Object.values(state).filter(v => v !== 'neutral').length;
  return (
    <div className="border border-zinc-800 rounded bg-zinc-900/50 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest hover:bg-zinc-800 transition-colors">
        <span className={activeCount > 0 ? "text-[var(--accent-gold)]" : ""}>{title} {activeCount > 0 && `(${activeCount})`}</span><span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="max-h-60 overflow-y-auto border-t border-zinc-800">
          {items.map(item => {
            const currentState = state[item] || 'neutral';
            return (
              <div key={item} className="flex items-center justify-between px-4 py-2 hover:bg-zinc-800/50 border-b border-zinc-800/50 last:border-0">
                <SmartTag tag={{ name: item, type: 'content', tier: 1 }} className={`text-xs ${currentState === 'include' ? 'text-green-400 font-bold' : currentState === 'exclude' ? 'text-red-400 line-through' : 'text-zinc-400'}`} />
                <div className="flex gap-1">
                  <button onClick={() => onChange(item, currentState === 'include' ? 'neutral' : 'include')} className={`w-6 h-6 flex items-center justify-center rounded border transition-all ${currentState === 'include' ? 'bg-green-900/50 border-green-500 text-green-400' : 'bg-zinc-900 border-zinc-700 text-zinc-600 hover:border-zinc-500'}`}>✓</button>
                  <button onClick={() => onChange(item, currentState === 'exclude' ? 'neutral' : 'exclude')} className={`w-6 h-6 flex items-center justify-center rounded border transition-all ${currentState === 'exclude' ? 'bg-red-900/50 border-red-500 text-red-400' : 'bg-zinc-900 border-zinc-700 text-zinc-600 hover:border-zinc-500'}`}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: AUTOCOMPLETE ---
const TagAutocomplete = ({ placeholder, availableTags, onSelect, counts }: any) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const matches = useMemo(() => (!query ? [] : availableTags.filter((t: string) => t.toLowerCase().includes(query.toLowerCase())).slice(0, 10)), [query, availableTags]);
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIndex(prev => (prev + 1) % matches.length); } else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIndex(prev => (prev - 1 + matches.length) % matches.length); } else if (e.key === "Enter") { e.preventDefault(); if (matches[highlightIndex]) { onSelect(matches[highlightIndex]); setQuery(""); setIsOpen(false); } } else if (e.key === "Escape") setIsOpen(false); };
  const selectTag = (tag: string) => { onSelect(tag); setQuery(""); setIsOpen(false); };
  useEffect(() => { const handleClickOutside = (event: MouseEvent) => { if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false); }; document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white placeholder-zinc-500 focus:border-[var(--accent-gold)] focus:outline-none transition-colors" placeholder={placeholder} value={query} onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }} onKeyDown={handleKeyDown} onFocus={() => setIsOpen(true)} />
      {isOpen && matches.length > 0 && (
        <ul className="absolute z-50 w-full bg-zinc-900 border border-zinc-700 mt-1 rounded shadow-xl max-h-60 overflow-y-auto">
          {matches.map((tag: string, index: number) => (
            <li key={tag} className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center ${index === highlightIndex ? "bg-[var(--accent-gold)] text-black" : "text-zinc-300 hover:bg-zinc-800"}`} onClick={() => selectTag(tag)} onMouseEnter={() => setHighlightIndex(index)}>
              <SmartTag tag={{ name: tag, type: 'content', tier: 1 }} /><span className="text-xs opacity-60">({counts[tag] || 0})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- COMPONENT: REVIEW CARD (Extracted for Hoist Logic) ---
const ReviewCard = ({ review }: { review: Review }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Sort Tags by Tier & Config Order
    const sortTags = (tags: Tag[]) => tags.sort((a, b) => (TYPE_CONFIG[a.type]?.order || 99) - (TYPE_CONFIG[b.type]?.order || 99));
    const primaryTags = sortTags(review.tags.filter(t => t.tier === 1));
    const secondaryTags = sortTags(review.tags.filter(t => t.tier === 2));

    return (
        <a 
            href={`/reviews/${review.slug}`} 
            className="group relative block bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-gold)] transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)] flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-48 bg-zinc-900 relative flex items-center justify-center overflow-hidden flex-shrink-0">
                {review.cover ? <img src={review.cover} alt={review.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> : <span className="text-4xl">📜</span>}
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 flex justify-between items-center px-4 border-t border-[var(--accent-gold)] z-10"><span className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-widest">{review.verdict}</span><span className="text-white font-mono text-xs font-bold">{review.score}/10</span></div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                {/* Title now receives hover state from card */}
                <AutoScrollTitle text={review.title} isHovered={isHovered} className="text-lg font-bold text-[var(--text-primary)] font-[family-name:var(--font-cinzel)] group-hover:text-[var(--accent-gold)] transition-colors mb-3" />
                
                <div className="flex flex-wrap gap-1 mb-4 content-start relative z-20">
                    {primaryTags.map(t => <span key={t.name} className={`text-[9px] uppercase border px-2 py-0.5 rounded whitespace-nowrap ${TYPE_CONFIG[t.type]?.cardClass}`}><SmartTag tag={t} /></span>)}
                    {secondaryTags.map(t => <span key={t.name} className={`text-[9px] uppercase border px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${TYPE_CONFIG[t.type]?.cardClass}`}><SmartTag tag={t} /></span>)}
                </div>
                <div className="mt-auto pt-2"><span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--text-secondary)] pb-1 group-hover:text-white group-hover:border-white transition-colors">Read Scripture</span></div>
            </div>
        </a>
    );
};

export default function ReviewsListView({ reviews }: { reviews: Review[] }) {
  const { t } = useLanguage();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCreator, setSearchCreator] = useState("");
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 10]);
  const [includedTags, setIncludedTags] = useState<string[]>([]);
  const [excludedTags, setExcludedTags] = useState<string[]>([]);
  const [tagLogic, setTagLogic] = useState<'OR' | 'AND'>('AND');
  const [seriesOriginTags, setSeriesOriginTags] = useState<string[]>([]);
  const [characterTags, setCharacterTags] = useState<string[]>([]);
  const [charLogic, setCharLogic] = useState<'OR' | 'AND'>('OR');
  const [engineFilters, setEngineFilters] = useState<Record<string, FilterState>>({});
  const [genreFilters, setGenreFilters] = useState<Record<string, FilterState>>({});

  const availableEngines = useMemo(() => Array.from(new Set(reviews.flatMap(r => r.tags.filter(t => t.type === 'engine').map(t => t.name)))).sort(), [reviews]);
  const availableGenres = useMemo(() => Array.from(new Set(reviews.flatMap(r => r.tags.filter(t => t.type === 'genre').map(t => t.name)))).sort(), [reviews]);
  const contentList = useMemo(() => Array.from(new Set(reviews.flatMap(r => r.tags.filter(t => t.type === 'content').map(t => t.name)))).sort(), [reviews]);
  const seriesOriginList = useMemo(() => Array.from(new Set(reviews.flatMap(r => r.tags.filter(t => t.type === 'series' || t.type === 'origin').map(t => t.name)))).sort(), [reviews]);
  const characterList = useMemo(() => Array.from(new Set(reviews.flatMap(r => r.tags.filter(t => t.type === 'character').map(t => t.name)))).sort(), [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      if (searchTitle && !review.title.toLowerCase().includes(searchTitle.toLowerCase())) return false;
      if (searchCreator) { const artists = review.tags.filter(t => t.type === 'artist').map(t => t.name.toLowerCase()); if (!artists.some(a => a.includes(searchCreator.toLowerCase()))) return false; }
      if (review.score < scoreRange[0] || review.score > scoreRange[1]) return false;
      if (excludedTags.length > 0 && review.tags.some(t => excludedTags.includes(t.name))) return false;
      if (includedTags.length > 0) { const names = review.tags.map(t => t.name); if (tagLogic === 'AND') { if (!includedTags.every(req => names.includes(req))) return false; } else { if (!includedTags.some(req => names.includes(req))) return false; } }
      if (seriesOriginTags.length > 0) { const names = review.tags.map(t => t.name); if (!seriesOriginTags.some(req => names.includes(req))) return false; }
      if (characterTags.length > 0) { const names = review.tags.map(t => t.name); if (charLogic === 'AND') { if (!characterTags.every(req => names.includes(req))) return false; } else { if (!characterTags.some(req => names.includes(req))) return false; } }
      const checkTriState = (itemTags: Tag[], filters: Record<string, FilterState>) => { const inc = Object.keys(filters).filter(k => filters[k] === 'include'); const exc = Object.keys(filters).filter(k => filters[k] === 'exclude'); if (itemTags.some(t => exc.includes(t.name))) return false; if (inc.length > 0 && !itemTags.some(t => inc.includes(t.name))) return false; return true; };
      if (!checkTriState(review.tags.filter(t => t.type === 'engine'), engineFilters)) return false;
      if (!checkTriState(review.tags.filter(t => t.type === 'genre'), genreFilters)) return false;
      return true;
    });
  }, [reviews, searchTitle, searchCreator, scoreRange, includedTags, excludedTags, tagLogic, seriesOriginTags, characterTags, charLogic, engineFilters, genreFilters]);

  const getCounts = (list: string[]) => { const c: Record<string, number> = {}; list.forEach(t => c[t] = 0); filteredReviews.forEach(r => r.tags.forEach(t => { if (c[t.name] !== undefined) c[t.name]++; })); return c; };

  return (
    <div className="min-h-screen p-8 pt-24 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-5xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">{t.reviews.title}</h1>
          <p className="text-[var(--text-secondary)] font-mono">{t.reviews.subtitle}</p>
        </header>

        <div className="bg-black/40 border border-[var(--border-color)] rounded-xl p-6 space-y-6 shadow-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><div className="h-8 flex items-end pb-1"><label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Search Titles</label></div><input type="text" placeholder="Search titles..." className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[var(--accent-gold)] focus:outline-none" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} /></div>
                <div className="space-y-2"><div className="h-8 flex items-end pb-1"><label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Creator / Artist</label></div><input type="text" placeholder="Search creator..." className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[var(--accent-gold)] focus:outline-none" value={searchCreator} onChange={(e) => setSearchCreator(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-2">
                    <div className="flex justify-between items-end h-8 pb-1 border-b border-transparent">
                        <label className="text-xs font-bold text-green-500 uppercase tracking-widest">Tags (Include)</label>
                        <div className="flex bg-zinc-900 rounded border border-zinc-700 overflow-hidden text-[10px] font-bold"><button onClick={() => setTagLogic('OR')} className={`px-2 py-0.5 ${tagLogic === 'OR' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>OR</button><div className="w-[1px] bg-zinc-700"></div><button onClick={() => setTagLogic('AND')} className={`px-2 py-0.5 ${tagLogic === 'AND' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>AND</button></div>
                    </div>
                    <TagAutocomplete placeholder="Select content tags..." availableTags={contentList.filter(t => !includedTags.includes(t) && !excludedTags.includes(t))} onSelect={(t: string) => setIncludedTags([...includedTags, t])} counts={getCounts(contentList)} />
                    <div className="flex flex-wrap gap-2">{includedTags.map(tag => <button key={tag} onClick={() => setIncludedTags(includedTags.filter(t => t !== tag))} className="flex items-center gap-2 px-2 py-1 bg-green-900/30 border border-green-500/50 text-green-200 text-xs rounded hover:bg-zinc-800 transition-all"><SmartTag tag={{name: tag, type: 'content', tier: 1}} /><span className="opacity-50">✕</span></button>)}</div>
                </div>
                <div className="md:col-span-4 space-y-2">
                    <div className="flex justify-between items-end h-8 pb-1 border-b border-transparent"><label className="text-xs font-bold text-red-500 uppercase tracking-widest">Exclude Tags</label></div>
                    <TagAutocomplete placeholder="Select tags to exclude..." availableTags={contentList.filter(t => !includedTags.includes(t) && !excludedTags.includes(t))} onSelect={(t: string) => setExcludedTags([...excludedTags, t])} counts={getCounts(contentList)} />
                    <div className="flex flex-wrap gap-2">{excludedTags.map(tag => <button key={tag} onClick={() => setExcludedTags(excludedTags.filter(t => t !== tag))} className="flex items-center gap-2 px-2 py-1 bg-red-900/30 border border-red-500/50 text-red-200 text-xs rounded hover:bg-zinc-800 transition-all"><SmartTag tag={{name: tag, type: 'content', tier: 1}} /><span className="opacity-50">✕</span></button>)}</div>
                </div>
                <div className="md:col-span-3"><SmartRangeSlider min={scoreRange[0]} max={scoreRange[1]} onChange={(min, max) => setScoreRange([min, max])} /></div>
            </div>
            <div className="border-t border-zinc-800 pt-4"><button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="w-full py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded transition-all">{isAdvancedOpen ? 'Hide Advanced Filters' : 'Show Advanced Filters'}<span>{isAdvancedOpen ? '▲' : '▼'}</span></button></div>
            {isAdvancedOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2"><div className="h-8 flex items-end pb-1"><label className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Engine</label></div><TriStateFilter title="Select Engines" items={availableEngines} state={engineFilters} onChange={(t, s) => setEngineFilters({...engineFilters, [t]: s})} /></div>
                    <div className="space-y-2"><div className="h-8 flex items-end pb-1"><label className="text-xs font-bold text-white uppercase tracking-widest">Genre</label></div><TriStateFilter title="Select Genres" items={availableGenres} state={genreFilters} onChange={(t, s) => setGenreFilters({...genreFilters, [t]: s})} /></div>
                    <div className="space-y-2"><div className="h-8 flex items-end pb-1"><label className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Series & Origin</label></div><TagAutocomplete placeholder="Touhou, Genshin..." availableTags={seriesOriginList.filter(t => !seriesOriginTags.includes(t))} onSelect={(t: string) => setSeriesOriginTags([...seriesOriginTags, t])} counts={getCounts(seriesOriginList)} /><div className="flex flex-wrap gap-2">{seriesOriginTags.map(tag => <button key={tag} onClick={() => setSeriesOriginTags(seriesOriginTags.filter(t => t !== tag))} className="px-2 py-1 bg-emerald-900/30 border border-emerald-500/50 text-emerald-200 text-xs rounded hover:bg-zinc-800"><SmartTag tag={{name: tag, type: 'series', tier: 1}} /> ✕</button>)}</div></div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-end h-8 pb-1 border-b border-transparent">
                            <label className="text-xs font-bold text-pink-500 uppercase tracking-widest">Characters</label>
                            <div className="flex bg-zinc-900 rounded border border-zinc-700 overflow-hidden text-[10px] font-bold"><button onClick={() => setCharLogic('OR')} className={`px-2 py-0.5 ${charLogic === 'OR' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>OR</button><div className="w-[1px] bg-zinc-700"></div><button onClick={() => setCharLogic('AND')} className={`px-2 py-0.5 ${charLogic === 'AND' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>AND</button></div>
                        </div>
                        <TagAutocomplete placeholder="Seiga, Nue..." availableTags={characterList.filter(t => !characterTags.includes(t))} onSelect={(t: string) => setCharacterTags([...characterTags, t])} counts={getCounts(characterList)} />
                        <div className="flex flex-wrap gap-2">{characterTags.map(tag => <button key={tag} onClick={() => setCharacterTags(characterTags.filter(t => t !== tag))} className="px-2 py-1 bg-pink-900/30 border border-pink-500/50 text-pink-200 text-xs rounded hover:bg-zinc-800"><SmartTag tag={{name: tag, type: 'character', tier: 1}} /> ✕</button>)}</div>
                    </div>
                </div>
            )}
            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center"><span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">{filteredReviews.length} Artifacts Found</span><button onClick={() => { setSearchTitle(""); setSearchCreator(""); setScoreRange([0, 10]); setIncludedTags([]); setExcludedTags([]); setEngineFilters({}); setGenreFilters({}); setSeriesOriginTags([]); setCharacterTags([]); }} className="text-xs text-red-400 hover:text-red-300 uppercase tracking-widest underline">Reset All Filters</button></div>
        </div>

        {/* REVIEW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredReviews.length > 0 ? filteredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
          )) : (
            <div className="col-span-full text-center py-20 text-[var(--text-secondary)] font-mono border border-dashed border-[var(--border-color)] rounded">{t.reviews.empty}</div>
          )}
        </div>
      </main>
    </div>
  );
}