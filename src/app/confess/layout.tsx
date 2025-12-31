import ConfessHeader from "@/components/ui/headers/confessional-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";
import UniversalFooter from "@/components/ui/universal-footer";
import { cookies } from "next/headers";

export default async function ConfessionalLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isDelving = cookieStore.get('bunny_delve')?.value === 'true';

  return (
    <DelveProvider initialDelve={isDelving}>
      <ThemeWrapper 
        baseTheme="confessional-theme" 
        className="min-h-screen flex flex-col relative w-full"
      >
        
        {/* Ambience (Fixed Background) */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-void)_90%)] z-0 pointer-events-none" />
        
        {/* HEADER */}
        <ConfessHeader />
        
        {/* CONTENT (Flex Grow pushes footer down, but not off screen) */}
        <div className="relative z-10 w-full flex-grow flex flex-col">
           {children}
        </div>

        {/* FOOTER */}
        <UniversalFooter />

      </ThemeWrapper>
    </DelveProvider>
  );
}