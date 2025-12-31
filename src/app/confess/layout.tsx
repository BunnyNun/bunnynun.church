import ConfessionalHeader from "@/components/ui/headers/confessional-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default function ConfessionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelveProvider>
      <ThemeWrapper 
        baseTheme="confessional-theme" 
        className="min-h-screen relative w-full"
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0f0005_90%)] z-0 pointer-events-none" />
        <div className="relative z-50">
          <ConfessionalHeader />
        </div>
        <div className="relative z-10 w-full">
           {children}
        </div>
      </ThemeWrapper>
    </DelveProvider>
  );
}