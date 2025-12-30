export default function LibraryPage() {
  return (
    <div className="space-y-16">
      
      {/* Title: The "Shrinking" Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl text-[#e7e5e4] font-thin tracking-widest uppercase opacity-90 drop-shadow-[0_0_15px_rgba(253,224,71,0.1)]">
          Apocrypha
        </h1>
        <p className="text-xs md:text-sm text-[#a8a29e] font-serif italic tracking-widest max-w-md mx-auto leading-loose border-b border-[#57534e] pb-6">
          "I write this to remember who I was, before the darkness takes the rest of me." 
          <br/>— <span className="text-[#fde047]/60">Alice</span>
        </p>
      </div>
      
      {/* The Bookshelf (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-12">
        
        {/* BOOK 1: THE INNOCENT INDEX */}
        <div className="group relative cursor-pointer">
           {/* The "Halo" Hover Effect */}
           <div className="absolute -inset-4 border border-[#fde047]/0 rounded-full group-hover:border-[#fde047]/20 transition-all duration-700 blur-sm" />
           
           <div className="relative border-l border-[#57534e] pl-6 py-2 group-hover:border-[#fde047] transition-colors duration-500">
              <span className="text-[9px] text-[#a8a29e] uppercase tracking-[0.2em] block mb-2 group-hover:text-[#fde047]">
                 Volume I
              </span>
              <h3 className="text-2xl text-[#e7e5e4] font-serif mb-3 group-hover:translate-x-1 transition-transform">
                 The Sisters
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed font-serif opacity-70 group-hover:opacity-100 transition-opacity">
                 Biometrics and history. The lives we led before the corruption began.
              </p>
           </div>
        </div>

        {/* BOOK 2: THE TECHNICAL SCROLL */}
        <div className="group relative cursor-pointer">
           <div className="absolute -inset-4 border border-[#fde047]/0 rounded-full group-hover:border-[#fde047]/20 transition-all duration-700 blur-sm" />
           
           <div className="relative border-l border-[#57534e] pl-6 py-2 group-hover:border-[#fde047] transition-colors duration-500">
              <span className="text-[9px] text-[#a8a29e] uppercase tracking-[0.2em] block mb-2 group-hover:text-[#fde047]">
                 Volume II
              </span>
              <h3 className="text-2xl text-[#e7e5e4] font-serif mb-3 group-hover:translate-x-1 transition-transform">
                 Creation Myths
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed font-serif opacity-70 group-hover:opacity-100 transition-opacity">
                 Asset credits and citations. The tools used to build this purgatory.
              </p>
           </div>
        </div>

        {/* BOOK 3: THE FORBIDDEN (The "Crack" in the purity) */}
        <div className="group relative cursor-pointer md:col-span-2 max-w-md mx-auto w-full mt-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
           <div className="relative border-t border-[#451a03] pt-6 text-center group-hover:border-red-900/50 transition-colors">
              <span className="text-[9px] text-[#451a03] uppercase tracking-[0.2em] block mb-2 group-hover:text-red-900/60 font-bold">
                 Restricted
              </span>
              <h3 className="text-xl text-[#78350f] font-serif mb-2 group-hover:text-red-900/80 transition-colors">
                 The Fall
              </h3>
              <p className="text-[10px] text-[#451a03]/60 italic font-serif">
                 Records of corruption levels. Do not read if you wish to remain pure.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}