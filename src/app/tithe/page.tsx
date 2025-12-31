import Link from "next/link";

export default function TithePage() {
  return (
    <div className="space-y-12 py-12">
      
      {/* Intro Text */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif text-[#451a03]">Select Your Offering</h2>
        <p className="text-sm text-[#d97706] italic">
          "The Church does not run on prayers alone. Capital is the blood that keeps the heart beating."
        </p>
      </div>

      {/* The Three Offering Plates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 1. SUBSCRIPTION (The Monthly Tithe) */}
        <Link href="/subscription" className="group relative bg-white border border-[#d97706]/20 p-8 shadow-sm hover:shadow-xl hover:border-[#d97706] transition-all duration-500 text-center">
           <div className="w-16 h-16 mx-auto bg-[#fffbf0] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d97706] transition-colors">
              <span className="text-2xl group-hover:text-white transition-colors">†</span>
           </div>
           <h3 className="text-xl font-bold text-[#451a03] mb-2 uppercase tracking-wide">The Tithe</h3>
           <p className="text-xs text-[#78350f] leading-relaxed mb-6">
             Monthly recurring support via SubscribeStar. Unlocks early access and the Confessional.
           </p>
           <span className="inline-block border-b border-[#d97706] text-[#d97706] text-[10px] uppercase tracking-widest pb-1 group-hover:text-[#451a03] group-hover:border-[#451a03]">
             Subscribe
           </span>
        </Link>

        {/* 2. SHOP (Indulgences) */}
        <Link href="/shop" className="group relative bg-white border border-[#d97706]/20 p-8 shadow-sm hover:shadow-xl hover:border-[#d97706] transition-all duration-500 text-center">
           <div className="w-16 h-16 mx-auto bg-[#fffbf0] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d97706] transition-colors">
              <span className="text-2xl group-hover:text-white transition-colors">⚿</span>
           </div>
           <h3 className="text-xl font-bold text-[#451a03] mb-2 uppercase tracking-wide">Indulgences</h3>
           <p className="text-xs text-[#78350f] leading-relaxed mb-6">
             Purchase individual game keys, assets, or digital goods directly.
           </p>
           <span className="inline-block border-b border-[#d97706] text-[#d97706] text-[10px] uppercase tracking-widest pb-1 group-hover:text-[#451a03] group-hover:border-[#451a03]">
             Enter Shop
           </span>
        </Link>

        {/* 3. DONATION (Alms) */}
        <Link href="/donation" className="group relative bg-white border border-[#d97706]/20 p-8 shadow-sm hover:shadow-xl hover:border-[#dc2626] transition-all duration-500 text-center">
           <div className="w-16 h-16 mx-auto bg-[#fffbf0] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#dc2626] transition-colors">
              <span className="text-2xl group-hover:text-white transition-colors">♥</span>
           </div>
           <h3 className="text-xl font-bold text-[#451a03] mb-2 uppercase tracking-wide">Alms</h3>
           <p className="text-xs text-[#78350f] leading-relaxed mb-6">
             One-time donations. No rewards, no strings attached. Just faith.
           </p>
           <span className="inline-block border-b border-[#d97706] text-[#d97706] text-[10px] uppercase tracking-widest pb-1 group-hover:text-[#dc2626] group-hover:border-[#dc2626]">
             Give Freely
           </span>
        </Link>

      </div>
    </div>
  );
}