import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function LabHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-lab)]/90 backdrop-blur border-b border-[var(--accent-cyan)]/50 py-3 px-6 flex justify-between items-center transition-colors duration-500">
      
      {/* LEFT: LOGO + INTERNAL NAV */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-pulse" />
          <span className="text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-widest group-hover:text-white transition-colors">
            Sacrilege Labs <span className="text-[var(--text-dim)]">v1.0</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-dim)]">
           <Link href="/experiments" className="hover:text-[var(--accent-cyan)] transition-colors">[ Experiments ]</Link>
           <Link href="/data" className="hover:text-[var(--accent-cyan)] transition-colors">[ Data ]</Link>
        </nav>
      </div>
      
      {/* RIGHT: PORTALS + TOGGLES */}
      <div className="flex items-center gap-6">
        <UniverseNav className="border-r border-[var(--accent-cyan)]/30 pr-6" />
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}