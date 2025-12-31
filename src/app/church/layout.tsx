import MainHeader from "@/components/ui/headers/main-header";
import AgeGate from "@/components/ui/age-gate";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper"; 
import UniversalFooter from "@/components/ui/universal-footer";
import { cookies } from "next/headers";

export default async function ChurchLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isDelving = cookieStore.get('bunny_delve')?.value === 'true';

  return (
    <DelveProvider initialDelve={isDelving}>
      <ThemeWrapper baseTheme="church-theme" className="min-h-screen flex flex-col relative">
          
          <div className="vignette-overlay" />
          <AgeGate />
          
          {/* HEADER */}
          <MainHeader />
          
          {/* CONTENT */}
          <main className="min-h-screen relative z-10 flex-grow">
            {children}
          </main>

          {/* FOOTER */}
          <UniversalFooter />

      </ThemeWrapper>
    </DelveProvider>
  );
}