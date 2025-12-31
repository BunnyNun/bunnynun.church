// src/lib/routes.ts

export const getBaseUrl = (subdomain: string) => {
  // UNCOMMENT FOR LOCALHOST:
  // return `http://${subdomain}.bunnynun.local:3000`;
  
  // PRODUCTION:
  return `https://${subdomain}.bunnynun.church`;
};

export const PORTALS = [
  { id: 'home', label: '✝ Church', sub: 'www', color: 'text-zinc-400 hover:text-white' },
  
  { id: 'tithe', label: '♦️ Tithe', sub: 'tithe', color: 'text-amber-600 hover:text-amber-400' },
  { id: 'confess', label: '♠️ Sins', sub: 'confess', color: 'text-rose-600 hover:text-rose-400' }, // Updated
  { id: 'lab', label: '♣️ Lab', sub: 'lab', color: 'text-cyan-600 hover:text-cyan-400' },
  { id: 'library', label: '♥️ Archive', sub: 'library', color: 'text-stone-500 hover:text-stone-300' },
  { id: 'business', label: '⚖️ Firm', sub: 'business', color: 'text-zinc-500 hover:text-zinc-300' },
  { id: 'dev', label: '👁️ Dev', sub: 'dev', color: 'text-pink-600 hover:text-pink-400' }, // Updated
];