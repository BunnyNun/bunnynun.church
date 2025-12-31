import Link from "next/link";

export default function UniversalFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-color)]/30 bg-[var(--bg-secondary)]/50 backdrop-blur-md py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h4 className="text-[var(--text-primary)] font-black uppercase tracking-widest text-sm">
            The Church of Bunny Nun
          </h4>
          <p className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider mt-1">
            Est. 2026 // All Rights Reserved
          </p>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-secondary)]">
           <Link href="https://www.bunnynun.church" className="hover:text-[var(--accent-gold)] transition-colors">
             Home
           </Link>
           <Link href="https://tithe.bunnynun.church/subscription" className="hover:text-[var(--accent-gold)] transition-colors">
             Tithe
           </Link>
           <Link href="https://business.bunnynun.church/contact" className="hover:text-[var(--accent-gold)] transition-colors">
             Contact
           </Link>
        </nav>

        {/* Status */}
        <div className="text-[10px] text-[var(--text-secondary)] opacity-50 font-mono text-center md:text-right">
           <p>contact@bunnynun.church</p>
        </div>

      </div>
    </footer>
  );
}