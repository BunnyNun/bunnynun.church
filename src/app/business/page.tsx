import Link from "next/link";

export default function BusinessPage() {
  return (
    <div className="space-y-16">
      
      {/* INTRO: The Confrontation */}
      <div className="max-w-2xl border-l-4 border-[#be123c] pl-8 py-2">
        <h2 className="text-4xl text-white font-bold mb-4 font-[family-name:var(--font-cinzel)]">
          State your business.
        </h2>
        <p className="text-neutral-400 text-sm leading-loose font-sans max-w-lg">
          "This division manages the corporate face of the Church. 
          If you are here for <span className="text-white font-bold">Press Assets</span>, 
          <span className="text-white font-bold"> Brand Details</span>, or to   
          <span className="text-white font-bold"> Contact the Church</span> directly, make it quick. 
          I have a meeting with the board in five minutes." - Catherine
        </p>
      </div>

      {/* THE DESK: 3 FILE FOLDERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* FILE 1: MISSION (About) */}
        <Link href="/about" className="group bg-[#171717] border border-neutral-800 p-8 hover:border-[#be123c] transition-all duration-500 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
           {/* Folder Tab Visual */}
           <div className="absolute top-0 left-0 w-24 h-1 bg-[#be123c] group-hover:w-full transition-all duration-700"></div>
           
           <div>
             <h3 className="text-xl text-white font-bold uppercase tracking-wide mb-2 group-hover:translate-x-1 transition-transform">
               Mission Statement
             </h3>
             <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mb-6">
               Ref: Investor Relations
             </p>
             <p className="text-neutral-400 text-xs font-sans leading-relaxed">
               Read a less vulgar, corporate-approved vision of our operations. 
               (The version we show the banks).
             </p>
           </div>
           
           <div className="mt-8 flex items-center gap-2 text-[#be123c] text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              <span>Open File</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
           </div>
        </Link>

        {/* FILE 2: PRESS KIT */}
        <Link href="/press" className="group bg-[#171717] border border-neutral-800 p-8 hover:border-[#be123c] transition-all duration-500 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-24 h-1 bg-neutral-600 group-hover:bg-[#be123c] group-hover:w-full transition-all duration-700"></div>
           
           <div>
             <h3 className="text-xl text-white font-bold uppercase tracking-wide mb-2 group-hover:translate-x-1 transition-transform">
               Press Kit
             </h3>
             <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mb-6">
               Ref: Media Assets
             </p>
             <p className="text-neutral-400 text-xs font-sans leading-relaxed">
               High-resolution logos, character renders, and brand guidelines for media coverage.
             </p>
           </div>
           
           <div className="mt-8 flex items-center gap-2 text-[#be123c] text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              <span>Access Assets</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
           </div>
        </Link>

        {/* FILE 3: CONTACT */}
        <Link href="/contact" className="group bg-[#171717] border border-neutral-800 p-8 hover:border-[#be123c] transition-all duration-500 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-24 h-1 bg-neutral-600 group-hover:bg-[#be123c] group-hover:w-full transition-all duration-700"></div>
           
           <div>
             <h3 className="text-xl text-white font-bold uppercase tracking-wide mb-2 group-hover:translate-x-1 transition-transform">
               Direct Inquiry
             </h3>
             <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mb-6">
               Ref: Correspondence
             </p>
             <p className="text-neutral-400 text-xs font-sans leading-relaxed">
               Contact form for business proposals. 
               Warning: Solicitation spam will result in immediate blacklisting.
             </p>
           </div>
           
           <div className="mt-8 flex items-center gap-2 text-[#be123c] text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              <span>Contact Form</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
           </div>
        </Link>

      </div>
      
    </div>
  );
}