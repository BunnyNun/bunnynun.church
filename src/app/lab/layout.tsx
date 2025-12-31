import LabHeader from "@/components/ui/headers/lab-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import UniversalFooter from "@/components/ui/universal-footer";
import { cookies } from "next/headers";

export default async function LabLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isDelving = cookieStore.get('bunny_delve')?.value === 'true';

  return (
    <DelveProvider initialDelve={isDelving}>
      <ThemeWrapper 
        baseTheme="lab-theme" 
        className="min-h-screen flex flex-col font-mono relative"
      >
        <div className="lab-grid-overlay" />
        <div className="scanline" />

        {/* HEADER */}
        <LabHeader />

        {/* CONTENT */}
        <main className="relative z-10 flex-grow p-6">
          {children}
        </main>

        {/* FOOTER */}
        <UniversalFooter />

      </ThemeWrapper>
    </DelveProvider>
  );
}