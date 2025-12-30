export default function TreasuryPage() {
  return (
    <div className="space-y-12">
      
      {/* Intro: The Confrontation */}
      <div className="max-w-2xl border-l-4 border-[#be123c] pl-6 py-2">
        <h2 className="text-4xl text-white font-bold mb-4">Your file is incomplete.</h2>
        <p className="text-neutral-400 text-sm leading-relaxed font-sans max-w-lg">
          "I don't have all day to chase you for signatures. 
          The Church requires funding, and quite frankly, you look like you can afford it. 
          Select a payment method before I lose my patience."
        </p>
      </div>

      {/* The Desk: 3 Folders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* FOLDER 1: ONE-TIME PAYMENTS (ITCH.IO) */}
        <div className="bg-[#171717] border border-neutral-800 p-8 flex flex-col justify-between group hover:border-white transition-colors duration-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white select-none pointer-events-none group-hover:opacity-20 transition-opacity">
              01
           </div>
           
           <div className="space-y-4 relative z-10">
              <div className="w-12 h-1 bg-[#be123c] mb-6"></div>
              <h3 className="text-xl text-white font-bold uppercase tracking-wide">Single Transaction</h3>
              <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                Ref: Indulgences / Keys
              </p>
              <p className="text-neutral-400 text-sm font-sans leading-relaxed border-t border-neutral-800 pt-4 mt-4">
                Purchase individual game licenses. Clean. Simple. No lingering attachments.
                Perfect for those with commitment issues.
              </p>
           </div>
           
           <button className="mt-8 w-full border border-neutral-600 text-neutral-300 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
             Process Payment
           </button>
        </div>

        {/* FOLDER 2: SUBSCRIPTION (THE RETAINER) - Highlighted */}
        <div className="bg-[#171717] border-2 border-[#be123c] p-10 flex flex-col justify-between relative shadow-[0_0_50px_rgba(190,18,60,0.1)] transform md:-translate-y-4">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#be123c] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
              Required Field
           </div>

           <div className="space-y-6 text-center">
              <h3 className="text-3xl text-white font-black uppercase tracking-tight">The Retainer</h3>
              <p className="text-neutral-400 text-xs font-sans">
                Monthly Recurring Billing via SubscribeStar
              </p>
              
              <div className="space-y-4 py-6 border-y border-neutral-800">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Tier I: Sinner</span>
                   <span className="font-mono text-white">$5.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Tier II: Heretic</span>
                   <span className="font-mono text-white">$10.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-[#be123c] uppercase tracking-widest text-[10px] font-bold">Tier III: Blasphemer</span>
                   <span className="font-mono text-[#be123c] font-bold">$20.00</span>
                </div>
              </div>
           </div>

           <a href="https://subscribestar.adult/bunny-nun" target="_blank" className="mt-8 block w-full bg-[#be123c] text-white py-5 text-center text-sm font-black uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
             Sign Agreement
           </a>
        </div>

        {/* FOLDER 3: COMMISSIONS (CLOSED) */}
        <div className="bg-[#171717] border border-neutral-800 p-8 flex flex-col justify-between opacity-60 grayscale hover:grayscale-0 transition-all duration-500 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
           
           <div className="space-y-4 relative z-10">
              <div className="w-12 h-1 bg-neutral-600 mb-6"></div>
              <h3 className="text-xl text-neutral-300 font-bold uppercase tracking-wide">Special Projects</h3>
              <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                Ref: Custom Contracts
              </p>
              <p className="text-neutral-500 text-sm font-sans leading-relaxed border-t border-neutral-800 pt-4 mt-4">
                Private commissions are currently suspended pending audit. 
                Do not ask me when they will reopen.
              </p>
           </div>
           
           <div className="mt-8 w-full border border-dashed border-neutral-700 text-neutral-600 py-4 text-xs font-bold uppercase tracking-[0.2em] text-center cursor-not-allowed">
             Applications Closed
           </div>
        </div>

      </div>
    </div>
  );
}