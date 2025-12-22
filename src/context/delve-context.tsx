'use client';

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface DelveContextType {
  isDelving: boolean;
  activeSins: string[]; // Added this back
  toggleDelve: () => void;
}

const DelveContext = createContext<DelveContextType>({
  isDelving: false,
  activeSins: [],
  toggleDelve: () => {},
});

export function DelveProvider({ 
  children, 
  initialDelve = false 
}: { 
  children: React.ReactNode; 
  initialDelve?: boolean 
}) {
  const [isDelving, setIsDelving] = useState(initialDelve);
  // Restored activeSins so the CorruptionDoll doesn't crash
  const [activeSins] = useState(['fluid', 'trauma']); 
  const router = useRouter();

  const toggleDelve = () => {
    // 1. Calculate new state
    const newState = !isDelving;

    // 2. Perform Side Effects
    Cookies.set('bunny_delve', String(newState), { expires: 365 });
    router.refresh();

    // 3. Update State
    setIsDelving(newState);
  };

  return (
    <DelveContext.Provider value={{ isDelving, activeSins, toggleDelve }}>
      {/* RESTORED: 'corruption-active' class name so your CSS works.
         ADDED: data-delve attribute for safer CSS targeting in the future.
      */}
      <div 
        data-delve={isDelving} 
        className={isDelving ? "corruption-active" : ""}
      >
        {children}
      </div>
    </DelveContext.Provider>
  );
}

export const useDelve = () => useContext(DelveContext);