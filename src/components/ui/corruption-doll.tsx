'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelve } from '@/context/delve-context';

interface DollProps {
  basePose: string; // e.g., "/temp/eve_base.png"
}

export default function CorruptionDoll({ basePose }: DollProps) {
  const { isDelveActive, activeSins } = useDelve();
  
  return (
    <div className="relative w-full max-w-[600px] aspect-[3/4] mx-auto overflow-hidden rounded-xl border border-white/5 bg-zinc-950">
      {/* 1. Base Layer */}
      <img 
        src={basePose} 
        alt="Character Base" 
        className="absolute inset-0 z-0 object-contain w-full h-full" 
      />

      {/* 2. Corruption Layers */}
      <AnimatePresence>
        {isDelving && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: 'contrast(200%) brightness(0%)' }}
            animate={{ opacity: 1, scale: 1, filter: 'contrast(100%) brightness(100%)' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            {activeSins.map((sin) => (
              <img
                key={sin}
                // POINTING TO TEMP ASSETS: Place these in public/temp/
                src={`/assets/temp/${sin}.png`}
                className={`absolute inset-0 w-full h-full object-contain ${
                  sin === 'trauma' ? 'mix-blend-multiply opacity-80' : 'mix-blend-screen'
                }`}
                alt=""
              />
            ))}
            
            {/* Glitch Flash */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              className="absolute inset-0 bg-red-600/30 z-50 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}