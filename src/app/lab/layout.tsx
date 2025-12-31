import LabHeader from "@/components/ui/headers/lab-header";
import { DelveProvider } from "@/context/delve-context";
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelveProvider>
      <ThemeWrapper 
        baseTheme="lab-theme" 
        className="min-h-screen flex flex-col font-mono relative overflow-hidden"
      >
        <div className="lab-grid-overlay" />
        <div className="scanline" />
        <LabHeader />
        <main className="relative z-10 flex-grow p-6">
          {children}
        </main>
        {/* LAB FOOTER */}
        <footer className="relative z-20 border-t border-cyan-900/30 p-4 text-center">
          <p className="text-[10px] text-cyan-900/60 uppercase tracking-[0.3em]">
            Authorized Personnel Only // The Inquisitor // Property of The Church
          </p>
        </footer>
      </ThemeWrapper>
    </DelveProvider>
  );
}