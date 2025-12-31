'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface DelveContextType {
  isDelveActive: boolean;
  isDelving: boolean;
  setDelveActive: (active: boolean) => void;
  toggleDelve: () => void;
  activeSins: string[];
  addSin: (sin: string) => void;
  removeSin: (sin: string) => void;
}

const DelveContext = createContext<DelveContextType | undefined>(undefined);

export function DelveProvider({ 
  children, 
  initialDelve = false 
}: { 
  children: React.ReactNode; 
  initialDelve?: boolean;
}) {
  const [isDelveActive, setDelveActiveState] = useState(initialDelve);
  // Initialize with 'trauma' if delve is active from server
  const [activeSins, setActiveSins] = useState<string[]>(initialDelve ? ['trauma'] : []);

  // Dynamic Domain Logic: Works for .local, .church, or any domain with 2+ parts
  const getCookieDomain = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost') return undefined; // Localhost doesn't like dots
      
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        // Returns .bunnynun.local or .bunnynun.church
        return `.${parts.slice(-2).join('.')}`;
      }
    }
    return undefined;
  };

  const setDelveActive = (active: boolean) => {
    setDelveActiveState(active);
    
    // Set cookie on the ROOT domain so all subdomains can see it
    Cookies.set('bunny_delve', String(active), { 
      expires: 365, 
      domain: getCookieDomain() 
    });

    if (active) {
      setActiveSins((prev) => prev.includes('trauma') ? prev : [...prev, 'trauma']);
    } else {
      setActiveSins([]);
    }
  };

  const toggleDelve = () => {
    setDelveActive(!isDelveActive);
  };

  const addSin = (sin: string) => {
    setActiveSins((prev) => prev.includes(sin) ? prev : [...prev, sin]);
  };

  const removeSin = (sin: string) => {
    setActiveSins((prev) => prev.filter(s => s !== sin));
  };

  // Sync client-side on mount (just in case server missed it or cookie changed)
  useEffect(() => {
    const cookieVal = Cookies.get('bunny_delve');
    if (cookieVal === 'true' && !isDelveActive) {
      setDelveActive(true);
    }
  }, []);

  return (
    <DelveContext.Provider value={{ 
        isDelveActive,
        isDelving: isDelveActive,
        setDelveActive, 
        toggleDelve,
        activeSins,
        addSin,
        removeSin
    }}>
      {children}
    </DelveContext.Provider>
  );
}

export function useDelve() {
  const context = useContext(DelveContext);
  if (context === undefined) {
    throw new Error('useDelve must be used within a DelveProvider');
  }
  return context;
}