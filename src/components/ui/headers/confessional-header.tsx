import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function ConfessionalHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-void)]/80 backdrop-blur border-b border-[var(--border-lust)]/30 py-4 px-6 flex justify-between items-center transition-colors duration-500">
      
      {/* LEFT: LOGO + INTERNAL NAV */}
      <div className="flex items-center gap-8">
        <Link href="/" className="group">
          <h1 className="text-lg font-black text-[var(--text-rose)] uppercase tracking-[0.2em] drop-shadow-[0_0_10px_var(--accent-glow)] group-hover:text-[var(--accent-neon)] transition-colors">
            Confessional
          </h1>
        </Link>

        <nav className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-rose)] opacity-60">
           <Link href="/about" className="hover:text-[var(--accent-neon)] hover:opacity-100 transition-all">About</Link>
           <Link href="/board" className="hover:text-[var(--accent-neon)] hover:opacity-100 transition-all">The Board</Link>
           <Link href="/history" className="hover:text-[var(--accent-neon)] hover:opacity-100 transition-all">History</Link>
        </nav>
      </div>
      
      {/* RIGHT: PORTALS + TOGGLES */}
      <div className="flex items-center gap-6">
        <UniverseNav className="border-r border-[var(--border-lust)]/30 pr-6" />
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}