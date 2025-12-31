'use client';

export default function LabPage() {
  return (
    <div className="max-w-6xl mx-auto pt-12 space-y-12">
      
      {/* INTRO TERMINAL */}
      <div className="border border-cyan-500/30 bg-cyan-950/10 p-8 rounded relative overflow-hidden group hover:border-cyan-500/60 transition-colors">
        <div className="absolute top-0 right-0 p-2 opacity-50">
           <span className="text-[10px] uppercase border border-cyan-800 px-2 py-1 text-cyan-800">System: Online</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-cyan-500 mb-4 tracking-tighter">
          PROJECT <span className="text-white">GENESIS</span>
        </h1>
        <p className="text-cyan-200/60 max-w-2xl leading-relaxed">
          Welcome to the Research & Development Division. Here we synthesize the tools of corruption. 
          <br/>
          Current focus: Remote Control and Synthetic Biology.
        </p>
      </div>

      {/* GRID OF EXPERIMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1 */}
        <div className="bg-black/40 border border-cyan-900/50 p-1 hover:bg-cyan-900/10 transition-all cursor-pointer group">
           <div className="h-40 bg-cyan-950/30 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for Schematic Image */}
              <div className="absolute inset-0 border border-cyan-500/20 m-2 rounded-sm border-dashed"></div>
              <span className="text-4xl opacity-20 group-hover:opacity-50 transition-opacity">🔬</span>
           </div>
           <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                 <h3 className="text-cyan-400 font-bold uppercase tracking-wide">Crowd Control Orgasm</h3>
                 <span className="text-[10px] bg-red-900/20 text-red-400 px-2 py-0.5 rounded border border-red-900/30">PROTOTYPE</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                 The code behind Solomon's crowd voted orgasms.
              </p>
           </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-black/40 border border-cyan-900/50 p-1 hover:bg-cyan-900/10 transition-all cursor-pointer group">
           <div className="h-40 bg-cyan-950/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 border border-cyan-500/20 m-2 rounded-sm border-dashed"></div>
              <span className="text-4xl opacity-20 group-hover:opacity-50 transition-opacity">💉</span>
           </div>
           <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                 <h3 className="text-cyan-400 font-bold uppercase tracking-wide">The Inquisitor</h3>
                 <span className="text-[10px] bg-cyan-900/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-900/30">PERSONNEL</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                 Head Researcher dossier. Psychological profile and experiment history.
              </p>
           </div>
        </div>

        {/* CARD 3 (Locked) */}
        <div className="bg-black/20 border border-zinc-800 p-1 opacity-60 grayscale hover:grayscale-0 transition-all">
           <div className="h-40 bg-black flex items-center justify-center relative">
              <span className="text-2xl text-zinc-600">🔒</span>
           </div>
           <div className="p-4 space-y-2">
              <h3 className="text-zinc-500 font-bold uppercase tracking-wide">The Bluetooth Womb</h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                 [REDACTED] Clearance Required.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}