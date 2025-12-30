'use client';

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

// 1. Define the Shape of the Context
interface DelveContextType {
  isDelveActive: boolean;
  setDelveActive: (active: boolean) => void;
  toggleDelve: () => void;
  
  // FIX: Added activeSins to the type definition to prevent Doll errors
  activeSins: number; 
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
  
  // Placeholder for Sins logic (You can expand this later)
  const [activeSins] = useState(0); 

  const setDelveActive = (active: boolean) => {
    setDelveActiveState(active);
    Cookies.set('bunny_delve', String(active), { expires: 365 });
  };

  const toggleDelve = () => {
    setDelveActive(!isDelveActive);
  };

  return (
    <DelveContext.Provider value={{ 
        isDelveActive, 
        setDelveActive, 
        toggleDelve,
        activeSins // Passing it down
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