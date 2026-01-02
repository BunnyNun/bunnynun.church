// src/lib/routes.ts

export const getBaseUrl = (subdomain: string) => {
  // UNCOMMENT FOR LOCALHOST:
  return `http://${subdomain}.bunnynun.local:3000`;
  
  // PRODUCTION:
  return `https://${subdomain}.bunnynun.church`;
};

export const PORTALS = [
  // 1. MAIN CHURCH (Content)
  { id: 'home', label: '✝ Church', sub: 'www', color: 'text-zinc-400 hover:text-white' },
  
  // DISABLED MODULES (Commented out for later)
  // { id: 'tithe', label: '♦️ Tithe', sub: 'tithe', color: 'text-amber-600 hover:text-amber-400' },
  // { id: 'confess', label: '♠️ Confess', sub: 'confess', color: 'text-fuchsia-500 hover:text-fuchsia-300' },
  // { id: 'lab', label: '♣️ Lab', sub: 'lab', color: 'text-cyan-600 hover:text-cyan-400' },
  // { id: 'library', label: '♥️ Archive', sub: 'library', color: 'text-green-500 hover:text-green-300' },
  
  // 2. BUSINESS (Catherine)
  { id: 'business', label: '☎ Business', sub: 'business', color: 'text-rose-600 hover:text-rose-400' },
  
  // 3. SOLLY (You)
  { id: 'solly', label: '>ᴗ< Solly', sub: 'solly', color: 'text-indigo-600 hover:text-indigo-400' },
];