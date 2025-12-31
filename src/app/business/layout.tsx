import BusinessHeader from "@/components/ui/headers/business-header";
import { DelveProvider } from "@/context/delve-context"; 
import ThemeWrapper from "@/components/ui/theme-wrapper";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelveProvider>
      <ThemeWrapper 
        baseTheme="business-theme" 
        className="min-h-screen relative flex flex-col font-serif overflow-x-hidden"
      >
        <div className="fixed inset-0 office-blinds-overlay z-0" />
        <BusinessHeader />
        <main className="relative z-10 flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full flex flex-col justify-center">
          {children}
        </main>

      <footer className="relative z-10 border-t border-neutral-800 p-8 text-center bg-[#0a0a0a]">
        <div className="flex flex-col gap-2">
            <span className="text-[10px] text-neutral-700 uppercase tracking-widest">
                Bunny Nun Enterprises © 2025 // All Rights Reserved
            </span>
            <a href="https://www.bunnynun.church" className="text-xs text-neutral-500 hover:text-white uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-[#be123c] inline-block mx-auto pb-1 mt-2">
                Dismiss Yourself (Return to Church)
            </a>
        </div>
      </footer>
    </ThemeWrapper>
    </DelveProvider>
  );
}