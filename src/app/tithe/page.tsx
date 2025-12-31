import Link from "next/link";

export default function TithePage() {
  return (
    <div className="space-y-16">
      
      {/* THE VIP TABLE (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* 1. SUBSCRIPTION (The Monthly Tithe) - HIGHLIGHTED */}
        <Link href="/subscription" className="group relative bg-[#1c1917] border border-[#f59e0b]/20 p-10 flex flex-col items-center text-center hover:border-[#f59e0b] hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-500 transform md:-translate-y-4 rounded-sm overflow-hidden tithe-card">
           {/* Shine Effect */}
           <div className="absolute inset-0 tithe-card-shine opacity-0 group-hover:opacity-100 pointer-events-none"></div>
           
           <div className="relative z-10 w-full">
              <div className="w-20 h-20 mx-auto bg-black border border-[#f59e0b]/30 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#f59e0b] group-hover:text-black transition-all duration-500 shadow-lg">
                 <span className="text-3xl">†</span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Subscribe</h3>
              <p className="text-[10px] text-[#f59e0b] uppercase tracking-[0.2em] mb-6">VIP Access</p>
              
              <p className="text-sm text-[#a8a29e] leading-relaxed mb-8 font-sans border-t border-[#f59e0b]/20 pt-6">
                Unlock all features, Early Access builds, and uncensored assets. 
                This is the premium experience.
              </p>
              
              <span className="block w-full py-4 bg-[#f59e0b] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
                Start Tithing
              </span>
           </div>
        </Link>

        {/* 2. SHOP (Indulgences) */}
        <Link href="/shop" className="group relative bg-[#1c1917] border border-[#44403c] p-8 flex flex-col items-center text-center hover:border-[#f59e0b]/50 transition-all duration-500 rounded-sm">
           <div className="w-16 h-16 mx-auto bg-black border border-[#44403c] rounded-full flex items-center justify-center mb-6 group-hover:border-[#f59e0b] transition-colors">
              <span className="text-2xl text-[#a8a29e] group-hover:text-[#f59e0b]">⚿</span>
           </div>
           <h3 className="text-xl font-bold text-[#fafaf9] mb-2 uppercase tracking-wide">Indulgences</h3>
           <p className="text-[10px] text-[#78716c] uppercase tracking-[0.2em] mb-4">Single Purchase</p>
           <p className="text-xs text-[#a8a29e] leading-relaxed mb-6 font-sans">
             Buy individual game keys and assets directly. No commitment.
           </p>
           <span className="text-[#f59e0b] text-[10px] uppercase tracking-widest border-b border-[#f59e0b] pb-1 opacity-60 group-hover:opacity-100 transition-opacity">
             Enter Shop
           </span>
        </Link>

        {/* 3. DONATION (Alms) */}
        <Link href="/donation" className="group relative bg-[#1c1917] border border-[#44403c] p-8 flex flex-col items-center text-center hover:border-[#f59e0b]/50 transition-all duration-500 rounded-sm">
           <div className="w-16 h-16 mx-auto bg-black border border-[#44403c] rounded-full flex items-center justify-center mb-6 group-hover:border-[#f59e0b] transition-colors">
              <span className="text-2xl text-[#a8a29e] group-hover:text-[#f59e0b]">♥</span>
           </div>
           <h3 className="text-xl font-bold text-[#fafaf9] mb-2 uppercase tracking-wide">Alms</h3>
           <p className="text-[10px] text-[#78716c] uppercase tracking-[0.2em] mb-4">Pure Charity</p>
           <p className="text-xs text-[#a8a29e] leading-relaxed mb-6 font-sans">
             Throw money at the stage. No rewards, just showing appreciation.
           </p>
           <span className="text-[#f59e0b] text-[10px] uppercase tracking-widest border-b border-[#f59e0b] pb-1 opacity-60 group-hover:opacity-100 transition-opacity">
             Tip Jar
           </span>
        </Link>

      </div>
    </div>
  );
}