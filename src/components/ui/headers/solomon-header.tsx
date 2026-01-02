import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function SollyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-room)]/95 backdrop-blur border-b border-[var(--border-color)] py-3 px-6 flex justify-between items-center font-mono transition-colors duration-500">
      
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex gap-4 text-[10px] uppercase text-[var(--text-secondary)] group">
           <span className="text-[var(--accent-pink)] font-bold group-hover:text-white transition-colors">
             {'>'}ᴗ{'<'} Solly
           </span>
           <span className="animate-pulse">_</span>
        </Link>

        {/* INTERNAL NAV */}
        <nav className="hidden md:flex gap-6 text-[10px] uppercase text-[var(--text-secondary)]">
           <Link href="/about" className="hover:text-white hover:bg-[var(--accent-pink)]/10 px-2 py-1 rounded transition-all">Me</Link>
           <Link href="/reviews" className="hover:text-[var(--accent-bruise)] hover:bg-[var(--accent-bruise)]/10 px-2 py-1 rounded transition-all">Toys</Link>
           <Link href="/play" className="hover:text-[var(--accent-pink)] animate-pulse hover:animate-none px-2 py-1 rounded transition-all">Control</Link>
        </nav>
      </div>

      {/* RIGHT: PORTALS */}
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