import TitheHeader from "@/components/ui/headers/tithe-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import { cookies } from "next/headers";

export default async function TitheLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const delveCookie = cookieStore.get('bunny_delve');
  const initialDelve = delveCookie?.value === 'true';

  return (
    <DelveProvider initialDelve={initialDelve}>
      <ThemeWrapper 
        baseTheme="tithe-theme" 
        className="min-h-screen flex flex-col relative bg-[var(--bg-altar)] selection:bg-[var(--accent-gold)] selection:text-black"
      >
        
        {/* GOLD PINSTRIPE BORDER (Luxury) */}
        <div className="fixed inset-0 border-[1px] border-[var(--accent-gold)]/30 m-6 pointer-events-none z-40" />
        <div className="fixed inset-0 border-[1px] border-[var(--accent-gold)]/10 m-8 pointer-events-none z-40" />

        <div className="w-full z-50">
           <TitheHeader />
        </div>
        
        <header className="py-16 text-center z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-[var(--accent-gold)] uppercase tracking-tighter drop-shadow-[0_0_25px_var(--accent-glow)]">
            The Tithe
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-[var(--accent-gold)]/50"></div>
             <p className="text-xs font-serif italic text-[var(--text-muted)] tracking-widest uppercase">
               "No Prayers. Only Payment." — Eve
             </p>
             <div className="h-[1px] w-12 bg-[var(--accent-gold)]/50"></div>
          </div>
        </header>

        <main className="w-full max-w-6xl z-10 flex-grow px-6 md:px-12 mx-auto">
          {children}
        </main>
        
        <footer className="py-12 text-center text-[var(--text-muted)] opacity-50 text-[10px] uppercase tracking-[0.3em]">
          Processed by The Church // No Refunds on Miracles
        </footer>

      </ThemeWrapper>
    </DelveProvider>
  );
}