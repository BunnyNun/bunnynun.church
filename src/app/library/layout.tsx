import LibraryHeader from "@/components/ui/headers/library-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import UniversalFooter from "@/components/ui/universal-footer";
import { cookies } from "next/headers";

export default async function LibraryLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isDelving = cookieStore.get('bunny_delve')?.value === 'true';

  return (
    <DelveProvider initialDelve={isDelving}>
      <ThemeWrapper 
        baseTheme="library-theme" 
        className="min-h-screen flex flex-col relative font-serif selection:bg-[#fde047] selection:text-black"
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

        {/* HEADER */}
        <LibraryHeader />

        {/* CONTENT */}
        <main className="relative z-10 p-8 md:p-16 max-w-5xl mx-auto min-h-[80vh] flex flex-col justify-center flex-grow">
          {children}
        </main>

        {/* FOOTER */}
        <UniversalFooter />

      </ThemeWrapper>
    </DelveProvider>
  );
}