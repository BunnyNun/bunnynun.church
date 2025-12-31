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
  { id: 'confess', label: '♠️ Confess', sub: 'confess', color: 'text-fuchsia-500 hover:text-fuchsia-300' },
  { id: 'lab', label: '♣️ Lab', sub: 'lab', color: 'text-cyan-600 hover:text-cyan-400' },
  { id: 'library', label: '♥️ Archive', sub: 'library', color: 'text-green-500 hover:text-green-300' },
  { id: 'business', label: '♦️ Business', sub: 'business', color: 'text-rose-600 hover:text-rose-400' },
  { id: 'dev', label: '>ᴗ< Dev', sub: 'dev', color: 'text-indigo-600 hover:text-indigo-400' },
];