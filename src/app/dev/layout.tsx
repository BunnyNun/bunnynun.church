import DevHeader from "@/components/ui/headers/solomon-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelveProvider>
      <ThemeWrapper 
        baseTheme="solomon-theme" 
        className="min-h-screen font-mono selection:bg-[#f472b6] selection:text-black"
      >
        
        <DevHeader />
        <main className="max-w-9xl mx-auto p-6 md:p-12">
          {children}
        </main>

        <div className="fixed bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity pointer-events-none z-0">
           <div className="w-24 h-24 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500/50 text-xs">
              ( ^-^ )
           </div>
        </div>

      </ThemeWrapper>
    </DelveProvider>
  );
}