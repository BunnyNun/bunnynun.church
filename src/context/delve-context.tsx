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
  // Initialize with 'trauma' if delve is active, otherwise empty
  const [activeSins, setActiveSins] = useState<string[]>(initialDelve ? ['trauma'] : []);

  // Helper to get the root domain for cookies (so subdomains share the state)
  const getCookieDomain = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      // If production/staging, allow sharing across subdomains
      if (hostname.includes('bunnynun.church')) return '.bunnynun.church';
      if (hostname.includes('bunnynun.local')) return '.bunnynun.local'; // For your hosts hack
    }
    return undefined; // Default for localhost
  };

  const setDelveActive = (active: boolean) => {
    setDelveActiveState(active);
    
    // Set cookie with domain so it works across library, tithe, etc.
    Cookies.set('bunny_delve', String(active), { 
      expires: 365, 
      domain: getCookieDomain() 
    });

    // AUTO-POPULATE SINS FOR VISUALS
    if (active) {
      // Add 'trauma' by default so the doll isn't empty
      setActiveSins((prev) => prev.includes('trauma') ? prev : [...prev, 'trauma']);
    } else {
      setActiveSins([]); // Clear sins when delving stops
    }
  };

  const toggleDelve = () => {
    setDelveActive(!isDelveActive);
  };

  const addSin = (sin: string) => {
    if (!activeSins.includes(sin)) {
      setActiveSins([...activeSins, sin]);
    }
  };

  const removeSin = (sin: string) => {
    setActiveSins(activeSins.filter(s => s !== sin));
  };

  // Sync state on mount (in case cookie exists but state is default)
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