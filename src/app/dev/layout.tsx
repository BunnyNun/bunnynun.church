import DevHeader from "@/components/ui/headers/solomon-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import UniversalFooter from "@/components/ui/universal-footer";
import { cookies } from "next/headers";

export default async function DevLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isDelving = cookieStore.get('bunny_delve')?.value === 'true';

  return (
    <DelveProvider initialDelve={isDelving}>
      <ThemeWrapper 
        baseTheme="solomon-theme" 
        className="min-h-screen flex flex-col font-mono selection:bg-[#f8fafc] selection:text-[#4c1d95] relative"
      >
        
        {/* HEADER */}
        <DevHeader />
        
        {/* CONTENT */}
        <main className="max-w-7xl mx-auto p-6 md:p-12 relative z-10 w-full flex-grow">
          {children}
        </main>

        {/* FOOTER */}
        <UniversalFooter />

      </ThemeWrapper>
    </DelveProvider>
  );
}