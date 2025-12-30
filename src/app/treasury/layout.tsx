export default function TreasuryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="treasury-theme min-h-screen relative flex flex-col font-serif">
      {/* Noir Blinds Effect */}
      <div className="fixed inset-0 office-blinds-overlay z-0" />
      
      {/* The Header: "The Reception Desk" */}
      <header className="relative z-10 border-b border-neutral-800 bg-[#0a0a0a]/90 backdrop-blur-md p-6 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
             EXECUTIVE <span className="text-[#be123c]">SUITE</span>
           </h1>
           <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mt-1">
             Catherine is currently: <span className="text-[#be123c] font-bold animate-pulse">IN A MEETING</span>
           </p>
        </div>
        <div className="hidden md:block text-right">
           <p className="text-[10px] text-neutral-600 font-mono">CASE FILE: #883-BUNNY</p>
           <p className="text-[10px] text-neutral-600 font-mono">STATUS: PENDING PAYMENT</p>
        </div>
      </header>

      <main className="relative z-10 flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full">
        {children}
      </main>

       {/* Footer: The "Dismissal" */}
       <footer className="relative z-10 border-t border-neutral-800 p-8 text-center">
          <a href="https://www.bunnynun.church" className="text-xs text-neutral-500 hover:text-white uppercase tracking-widest transition-colors border-b border-transparent hover:border-[#be123c] pb-1">
            Dismiss Yourself (Return to Church)
          </a>
       </footer>
    </div>
  );
}