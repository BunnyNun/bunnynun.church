import TitheHeader from "@/components/ui/headers/tithe-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default function TitheLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelveProvider>
        <ThemeWrapper baseTheme="tithe-theme" className="min-h-screen flex flex-col items-center relative border-[20px] border-[#fffbf0]">
                
                <div className="w-full z-50">
                <TitheHeader />
                </div>

                <div className="fixed inset-0 border-[1px] border-[#d97706]/30 m-4 pointer-events-none z-40" />
                
                <header className="py-12 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-black text-[#d97706] uppercase tracking-tighter drop-shadow-sm">
                    The Tithe
                </h1>
                <p className="text-xs font-serif italic text-[#dc2626] mt-2">
                    "Salvation costs money. Salvation is not free." — Eve
                </p>
                </header>

                <main className="w-full max-w-4xl z-10 flex-grow px-6">
                    {children}
                </main>
                
                <footer className="py-8 text-center text-[#d97706]/40 text-[10px] uppercase tracking-widest">
                Processed by The Church // No Refunds on Miracles
                </footer>
        </ThemeWrapper>
    </DelveProvider>
  );
}