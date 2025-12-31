import BusinessHeader from "@/components/ui/headers/business-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import UniversalFooter from "@/components/ui/universal-footer";
import { cookies } from "next/headers";

export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isDelving = cookieStore.get('bunny_delve')?.value === 'true';

  return (
    <DelveProvider initialDelve={isDelving}>
      <ThemeWrapper 
        baseTheme="business-theme" 
        className="min-h-screen flex flex-col relative font-serif"
      >
        <div className="fixed inset-0 office-blinds-overlay z-0" />
        
        {/* HEADER */}
        <BusinessHeader />

        {/* CONTENT */}
        <main className="relative z-10 flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full flex flex-col justify-center">
          {children}
        </main>

        {/* FOOTER */}
        <UniversalFooter />

      </ThemeWrapper>
    </DelveProvider>
  );
}