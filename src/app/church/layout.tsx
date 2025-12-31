import MainHeader from "@/components/ui/headers/main-header";
import AgeGate from "@/components/ui/age-gate";
import { DelveProvider } from "@/context/delve-context";
import { cookies } from 'next/headers';
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default async function ChurchLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const delveCookie = cookieStore.get('bunny_delve');
  const initialDelve = delveCookie?.value === 'true';

  return (
    <DelveProvider initialDelve={initialDelve}>
      {/* We need a client wrapper to toggle the 'corruption-active' class dynamically */}
      <ThemeWrapper baseTheme="church-theme" className="min-h-screen">
          <div className="vignette-overlay" />
          <AgeGate />
          <MainHeader />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
      </ThemeWrapper>
    </DelveProvider>
  );
}