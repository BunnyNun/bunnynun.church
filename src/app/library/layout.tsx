import LibraryHeader from "@/components/ui/headers/library-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelveProvider>
      <ThemeWrapper 
        baseTheme="library-theme" 
        className="min-h-screen relative overflow-hidden font-serif selection:bg-[#fde047] selection:text-black"
      >
        
        {/* 1. The God Ray (Light from above) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-screen library-godray blur-3xl" />

        {/* 2. Dust Motes (Atmosphere) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="dust-mote w-1 h-1 top-[20%] left-[20%] animate-[float_15s_infinite]" />
          <div className="dust-mote w-1 h-1 top-[60%] left-[70%] animate-[float_20s_infinite]" />
          <div className="dust-mote w-1 h-1 top-[40%] left-[50%] animate-[float_12s_infinite]" />
          <div className="dust-mote w-1 h-1 top-[80%] left-[30%] animate-[float_18s_infinite]" />
        </div>

        {/* 3. The Header */}
        <LibraryHeader />
          <main className="relative z-10 p-8 md:p-16 max-w-9xl mx-auto min-h-[80vh] flex flex-col justify-center">
            {children}
          </main>
      </ThemeWrapper>
    </DelveProvider>
  );
}