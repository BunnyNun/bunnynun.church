import DevHeader from "@/components/ui/headers/solomon-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import { cookies } from "next/headers";

export default async function DevLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const delveCookie = cookieStore.get('bunny_delve');
  const initialDelve = delveCookie?.value === 'true';

  return (
    <DelveProvider initialDelve={initialDelve}>
      <ThemeWrapper 
        baseTheme="solomon-theme" 
        className="min-h-screen font-mono selection:bg-[#f8fafc] selection:text-[#4c1d95] relative overflow-hidden"
      >
        
        {/* HEADER (Z-Index 50: Must be clickable) */}
        <div className="relative z-50">
           <DevHeader />
        </div>
        
        {/* CONTENT (Z-Index 10: Sits above background) */}
        <main className="max-w-9xl mx-auto p-6 md:p-12 relative z-10">
          {children}
        </main>

        <div className="fixed bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity pointer-events-none z-20">
           <div className="w-20 h-20 bg-[#4c1d95]/10 rounded-full flex items-center justify-center text-[#e9d5ff]/40 text-[10px] border border-[#4c1d95]/30 italic text-center leading-tight">
              Please<br/>Use Me
           </div>
        </div>

      </ThemeWrapper>
    </DelveProvider>
  );
}