'use client';

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

// 1. Define the Shape of the Context
interface DelveContextType {
  isDelveActive: boolean; // The new standard name
  isDelving: boolean;     // ALIAS: Keeps old components working
  setDelveActive: (active: boolean) => void;
  toggleDelve: () => void;
  
  // FIXED: Restored to string[] so your Doll can map over it
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
  
  // FIXED: Restored state to an Array
  const [activeSins, setActiveSins] = useState<string[]>([]); 

  const setDelveActive = (active: boolean) => {
    setDelveActiveState(active);
    Cookies.set('bunny_delve', String(active), { expires: 365 });
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

  return (
    <DelveContext.Provider value={{ 
        isDelveActive,
        isDelving: isDelveActive, // Alias for backward compatibility
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