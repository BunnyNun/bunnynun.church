import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function LibraryHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-sanctuary)]/90 backdrop-blur border-b border-[var(--border-delicate)]/50 py-4 px-8 flex justify-between items-center transition-colors duration-500">
      
      {/* LEFT: LOGO + INTERNAL NAV */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex flex-col group">
          <span className="text-[10px] text-[var(--text-faded)] uppercase tracking-[0.3em] group-hover:text-[var(--accent-holy)] transition-colors">
             The Archive
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 text-xs font-serif text-[var(--text-faded)]">
           <Link href="/characters" className="hover:text-[var(--text-scripture)] hover:underline decoration-[var(--accent-holy)] underline-offset-4 transition-all">Characters</Link>
           <Link href="/lore" className="hover:text-[var(--text-scripture)] hover:underline decoration-[var(--accent-holy)] underline-offset-4 transition-all">Lore</Link>
        </nav>
      </div>

      {/* RIGHT: PORTALS + TOGGLES */}
      <div className="flex items-center gap-6">
        <UniverseNav className="border-r border-[var(--border-delicate)]/30 pr-6" />
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}