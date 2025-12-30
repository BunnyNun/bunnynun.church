import MainHeader from "@/components/ui/main-header";
import AgeGate from "@/components/ui/age-gate";
import { DelveProvider } from "@/context/delve-context";
import { cookies } from 'next/headers';

// Client Wrapper for dynamic class switching (Corruption Mode)
import ChurchThemeWrapper from "@/components/ui/church-theme-wrapper"; 

export default async function ChurchLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const delveCookie = cookieStore.get('bunny_delve');
  const initialDelve = delveCookie?.value === 'true';

  return (
    <DelveProvider initialDelve={initialDelve}>
      {/* We need a client wrapper to toggle the 'corruption-active' class dynamically */}
      <ChurchThemeWrapper>
          <div className="vignette-overlay" />
          <AgeGate />
          <MainHeader />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
      </ChurchThemeWrapper>
    </DelveProvider>
  );
}