import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function BusinessHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-office)]/95 backdrop-blur border-b border-[var(--border-sharp)] py-4 px-6 flex justify-between items-center transition-colors duration-500">
      
      {/* LEFT: LOGO + INTERNAL NAV */}
      <div className="flex items-center gap-8">
        <Link href="/" className="group">
          <h1 className="text-sm font-black text-[var(--text-paper)] uppercase tracking-tighter group-hover:opacity-80 transition-opacity">
            BN <span className="text-[var(--accent-lipstick)]">Enterprises</span>
          </h1>
        </Link>

        <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
           <Link href="/contact" className="hover:text-white transition-colors border-b border-transparent hover:border-[var(--accent-lipstick)] pb-1">Contact</Link>
           <Link href="/press" className="hover:text-white transition-colors border-b border-transparent hover:border-[var(--accent-lipstick)] pb-1">Press</Link>
           <Link href="/about" className="hover:text-white transition-colors border-b border-transparent hover:border-[var(--accent-lipstick)] pb-1">About</Link>
        </nav>
      </div>
      
      {/* RIGHT: PORTALS + TOGGLES */}
      <div className="flex items-center gap-6">
        <UniverseNav className="border-r border-[var(--border-sharp)] pr-6" />
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}