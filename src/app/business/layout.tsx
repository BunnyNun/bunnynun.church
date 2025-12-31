import BusinessHeader from "@/components/ui/headers/business-header";
import { DelveProvider } from "@/context/delve-context"; 
import ThemeWrapper from "@/components/ui/theme-wrapper";
import { cookies } from "next/headers";

export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const delveCookie = cookieStore.get('bunny_delve');
  const initialDelve = delveCookie?.value === 'true';

  return (
    <DelveProvider initialDelve={initialDelve}>
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
                Bunny Nun Enterprises © 2026 // All Rights Reserved
            </span>
        </div>
      </footer>
    </ThemeWrapper>
    </DelveProvider>
  );
}