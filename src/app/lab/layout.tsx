import Link from "next/link";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lab-theme min-h-screen flex flex-col font-mono relative overflow-hidden">
      
      {/* BACKGROUND FX */}
      <div className="lab-grid-overlay" />
      <div className="scanline" />

      {/* LAB HEADER */}
      <header className="relative z-20 border-b border-cyan-900/50 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-cyan-900/20 border border-cyan-500 rounded flex items-center justify-center animate-pulse">
              <span className="text-cyan-400 text-xs">R&D</span>
            </div>
            <span className="text-cyan-400 font-bold tracking-widest uppercase">Sacrilege Labs</span>
          </div>
          
          <nav className="flex gap-6 text-xs text-cyan-700 font-bold uppercase tracking-widest">
             <Link href="/" className="hover:text-cyan-400 transition-colors">Experiments</Link>
             <Link href="/" className="hover:text-cyan-400 transition-colors">Data</Link>
             <a href="https://www.bunnynun.church" className="text-red-900 hover:text-red-500 transition-colors">Exit to Church ↗</a>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="relative z-10 flex-grow p-6">
        {children}
      </main>

      {/* LAB FOOTER */}
      <footer className="relative z-20 border-t border-cyan-900/30 p-4 text-center">
        <p className="text-[10px] text-cyan-900/60 uppercase tracking-[0.3em]">
          Authorized Personnel Only // Dr. Gnosis // Property of The Church
        </p>
      </footer>
    </div>
  );
}