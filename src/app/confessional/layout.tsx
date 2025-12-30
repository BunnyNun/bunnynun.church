export default function ConfessionalLayout({ children }: { children: React.ReactNode }) {
  return (
    // CHANGED: Removed 'overflow-x-hidden'
    <div className="confessional-theme min-h-screen relative w-full">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0f0005_90%)] z-0 pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full">
         {children}
         
         <div className="text-center py-8">
            <a href="https://www.bunnynun.church" className="text-[10px] text-pink-900 hover:text-pink-500 uppercase tracking-widest transition-colors">
              Leave the Booth
            </a>
         </div>
      </div>

    </div>
  );
}