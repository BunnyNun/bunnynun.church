import Link from "next/link";

export default function SolomonPage() {
  return (
    <div className="space-y-12">
      
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-zinc-800 pb-12">
         <div className="w-32 h-32 bg-zinc-800 rounded-full overflow-hidden border-2 border-[#f472b6] shrink-0">
            {/* Placeholder for Solomon Avatar */}
            <div className="w-full h-full bg-[#f472b6]/20 flex items-center justify-center text-[#f472b6]">
               ( ^-^ )
            </div>
         </div>
         <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Solomon <span className="text-zinc-600 text-sm font-normal block md:inline md:ml-4">@TheDev</span>
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
               I'm the one writing the code and rigging the models. 
               This is my corner of the church where I can be a degenerate without ruining the brand identity.
               <span className="text-[#f472b6]"> Femboys, tech reviews, and getting bullied by Azzy.</span>
            </p>
            <div className="flex gap-4 justify-center md:justify-start text-xs font-bold uppercase">
               <span className="text-[#4ade80] bg-[#4ade80]/10 px-2 py-1 rounded">Status: Coding</span>
               <span className="text-[#f472b6] bg-[#f472b6]/10 px-2 py-1 rounded">Mood: Needy</span>
            </div>
         </div>
      </div>

      {/* The Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: REVIEWS */}
        <Link href="/reviews" className="group bg-zinc-900 border border-zinc-800 p-6 hover:border-[#4ade80] transition-colors">
           <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl text-white font-bold group-hover:text-[#4ade80]">Hardware Reviews</h3>
              <span className="text-2xl grayscale group-hover:grayscale-0">🕹️</span>
           </div>
           <p className="text-xs text-zinc-500 mb-4">
              My thoughts on toys, tech, and games. 
              Warning: Contains explicit usage tests.
           </p>
           <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li className="border-b border-zinc-800 pb-1">Latest: Lovense Max 2 Integration</li>
              <li className="border-b border-zinc-800 pb-1">Latest: RTX 4090 Rendering Benchmarks</li>
           </ul>
        </Link>

        {/* CARD 2: TORTURE CHAMBER (PLAY) */}
        <Link href="/play" className="group bg-zinc-900 border border-zinc-800 p-6 hover:border-[#f472b6] transition-colors relative overflow-hidden">
           {/* Scanline Effect */}
           <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
           
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl text-white font-bold group-hover:text-[#f472b6]">Torture Protocol</h3>
                 <span className="text-2xl grayscale group-hover:grayscale-0">⛓️</span>
              </div>
              <p className="text-xs text-zinc-500 mb-6">
                 Vote on my punishments. Decide if I'm allowed to cum this month. 
                 The community controls the dev.
              </p>
              <div className="inline-block bg-[#f472b6] text-black text-[10px] font-bold px-3 py-1 rounded uppercase animate-pulse">
                 Live Session Active
              </div>
           </div>
        </Link>

        {/* CARD 3: ABOUT ME */}
        <Link href="/about" className="md:col-span-2 group bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
           <div>
              <h3 className="text-sm text-white font-bold">About Solomon</h3>
              <p className="text-xs text-zinc-500">The lore behind the self-insert.</p>
           </div>
           <span className="text-zinc-500 group-hover:text-white">→</span>
        </Link>

      </div>
    </div>
  );
}