import UniverseNav from "@/components/ui/universe-nav";
import DelveToggle from "@/components/ui/delve-toggle";
import LangToggle from "@/components/ui/lang-toggle";
import Link from "next/link";

export default function TitheHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-altar)]/95 backdrop-blur border-b border-[var(--accent-gold)]/20 py-4 px-6 flex justify-between items-center transition-colors duration-500">
      
      {/* LEFT: LOGO + INTERNAL NAV */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl text-[var(--accent-gold)] group-hover:text-[var(--accent-sacrificial)] transition-colors">†</span>
          <span className="text-sm font-black text-[var(--text-script)] uppercase tracking-widest font-serif group-hover:text-[var(--accent-gold)] transition-colors">
            The Offering
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 text-xs font-serif italic text-[var(--text-script)] opacity-80">
           <Link href="/subscription" className="hover:text-[var(--accent-gold)] hover:underline transition-all">Subscription</Link>
           <Link href="/shop" className="hover:text-[var(--accent-gold)] hover:underline transition-all">Shop</Link>
           <Link href="/donation" className="hover:text-[var(--accent-gold)] hover:underline transition-all">Donation</Link>
        </nav>
      </div>
      
      {/* RIGHT: PORTALS + TOGGLES */}
      <div className="flex items-center gap-6">
        <UniverseNav className="border-r border-[var(--accent-gold)]/20 pr-6" />
        
        <div className="flex items-center gap-4">
            <LangToggle />
            <DelveToggle />
        </div>
      </div>
    </header>
  );
}