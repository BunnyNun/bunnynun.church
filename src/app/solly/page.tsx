import Link from "next/link";

export default function SolomonPage() {
  return (
    <div className="space-y-16 pt-8">
      
      {/* HEADER PROFILE */}
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start border-b border-[#4a3b55]/50 pb-12 relative">
         
         {/* Visual: The Messy Avatar */}
         <div className="relative shrink-0 group">
            <div className="absolute -inset-2 bg-gradient-to-b from-[#f8fafc] to-[#4c1d95] rounded-full blur-md opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative w-48 h-48 bg-[#1a161f] rounded-full overflow-hidden border-4 border-[#f8fafc] flex items-center justify-center shadow-[0_0_30px_rgba(248,250,252,0.15)]">
               <div className="text-center space-y-2">
                  <div className="text-5xl animate-bounce">🍑</div>
                  <p className="text-[10px] text-[#9382a3] uppercase font-bold tracking-widest">Gaping</p>
               </div>
            </div>
            <div className="absolute bottom-2 right-0 bg-[#4c1d95] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border border-[#f8fafc] -rotate-6 shadow-lg">
               Meat
            </div>
         </div>

         {/* The Text */}
         <div className="text-center md:text-left space-y-6 max-w-xl">
            <div>
               <h1 className="text-5xl font-black text-[#f8fafc] tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                 Solomon
               </h1>
               <span className="text-[#f472b6] text-xs font-bold tracking-[0.2em] uppercase block mt-1">
                 The Church's Stress Relief
               </span>
            </div>
            
            <div className="space-y-4 text-sm text-[#e9d5ff]/90 leading-relaxed font-sans border-l-2 border-[#4c1d95] pl-4">
               <p>
                  I write the code, but mostly I exist to be used. 
                  My body is soft, curvy, and constantly leaking. 
               </p>
               <p>
                  My ass belongs to the Congregation. I pretend to resist, I might even cry, 
                  but <span className="text-[#f8fafc] font-bold underline decoration-pink-500">I am begging for it</span>. 
                  Please don't listen when I say stop.
               </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
               <span className="bg-[#f8fafc] text-[#1a161f] px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white">
                  Curvy
               </span>
               <span className="bg-[#261e2e] text-[#f472b6] border border-[#f472b6] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  Anal Only
               </span>
               <span className="bg-[#261e2e] text-[#a78bfa] border border-[#a78bfa] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  CNC / Non-Con
               </span>
               <span className="bg-[#261e2e] text-[#ffffff] border border-[#ffffff] px-3 py-1 rounded-full text-[10px] font-bold uppercase animate-pulse">
                  Leaking
               </span>
            </div>
         </div>
      </div>

      {/* THE DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CARD 1: REVIEWS */}
        <Link href="/reviews" className="group relative bg-[#261e2e]/80 backdrop-blur-sm border border-[#4a3b55] p-8 hover:border-[#f8fafc] transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-2xl text-[#f8fafc] font-bold group-hover:text-white transition-colors">Game/Item Reviews</h3>
                    <p className="text-[10px] text-[#f472b6] uppercase tracking-widest mt-1">NSFW Games, Sex Toys, Bodypillows, Engineering parts, and more!</p>
                 </div>
                 <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">🔌</span>
              </div>
              
              <p className="text-sm text-[#e9d5ff]/70 mb-6 leading-relaxed">
                 Read my logs on game quality, item endurance, pain tolerance, and how much mess I made.
              </p>

              <div className="bg-[#1a161f]/80 rounded-lg p-4 border border-[#4a3b55] group-hover:border-[#f472b6]/50 transition-colors">
                 <span className="text-[10px] text-[#9382a3] uppercase block mb-1 font-bold">Current Obsession:</span>
                 <span className="text-xs text-[#f8fafc] font-mono">Kissing my lewd bodypillow~!</span>
              </div>
           </div>
        </Link>

        {/* CARD 2: TORTURE */}
        <Link href="/play" className="group relative bg-[#261e2e]/80 backdrop-blur-sm border border-[#4a3b55] p-8 hover:border-[#f472b6] transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-2xl text-[#f472b6] font-bold group-hover:text-[#fbcfe8] transition-colors">Torture Chamber</h3>
                    <p className="text-[10px] text-[#9382a3] uppercase tracking-widest mt-1">Live Control</p>
                 </div>
                 <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">⛓️</span>
              </div>
              
              <p className="text-sm text-[#e9d5ff]/70 mb-6 leading-relaxed">
                 Vote on my denial. Make me quiver. 
                 <span className="text-[#f8fafc] font-bold"> If the community votes 'NO', I don't get to cum for another week.</span>
              </p>

              <div className="flex items-center gap-3">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                 </span>
                 <span className="text-xs text-pink-300 font-bold uppercase tracking-widest">Chastity Cage: LOCKED</span>
              </div>
           </div>
        </Link>

        {/* CARD 3: LORE */}
        <Link href="/about" className="lg:col-span-2 group bg-[#261e2e]/50 backdrop-blur-sm border border-[#4a3b55] p-6 flex items-center justify-between hover:bg-[#261e2e] transition-colors rounded-xl">
           <div className="flex items-center gap-6">
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">💄</div>
              <div>
                 <h3 className="text-sm text-[#f8fafc] font-bold uppercase tracking-wide">About the dev</h3>
                 <p className="text-xs text-[#9382a3] mt-1">Want to know more about me personally? I appreciate it~! Come on, I'll tell you everything.</p>
              </div>
           </div>
           <span className="text-[#9382a3] group-hover:text-[#f8fafc] group-hover:translate-x-1 transition-all text-sm font-bold">Read History →</span>
        </Link>

      </div>
    </div>
  );
}