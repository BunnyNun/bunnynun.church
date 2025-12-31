import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function SolomonHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-room)]/95 backdrop-blur border-b border-[var(--border-color)] py-3 px-6 flex justify-between items-center font-mono transition-colors duration-500">
      
      {/* LEFT: LOGO + INTERNAL NAV */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex gap-4 text-[10px] uppercase text-[var(--text-secondary)] group">
           <span className="text-[var(--accent-femboy)] font-bold group-hover:text-white transition-colors">Solomon@Terminal</span>
           <span>~</span>
           <span className="animate-pulse">_</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-[10px] uppercase text-[var(--text-secondary)]">
           <Link href="/about" className="hover:text-white hover:bg-[var(--accent-femboy)]/10 px-2 py-1 rounded transition-all">Me</Link>
           <Link href="/reviews" className="hover:text-[var(--accent-hacker)] hover:bg-[var(--accent-hacker)]/10 px-2 py-1 rounded transition-all">Reviews</Link>
           <Link href="/play" className="hover:text-[var(--accent-femboy)] animate-pulse hover:animate-none px-2 py-1 rounded transition-all">Play</Link>
        </nav>
      </div>

      {/* RIGHT: PORTALS + TOGGLES */}
      <div className="flex items-center gap-6">
        <UniverseNav className="border-r border-[var(--border-color)] pr-6" />
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}