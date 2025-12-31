'use client';

import { useDelve } from "@/context/delve-context";

interface ThemeWrapperProps {
  children: React.ReactNode;
  baseTheme: string;  // You pass 'church-theme', 'tithe-theme', etc. here
  className?: string; // Optional: for extra styling (like flex, min-h-screen)
}

export default function ThemeWrapper({ 
  children, 
  baseTheme, 
  className = "" 
}: ThemeWrapperProps) {
  const { isDelveActive } = useDelve();
  
  // If Delve is active, we append "corruption-active" to the class list
  const themeClass = `${baseTheme} ${isDelveActive ? 'corruption-active' : ''} ${className}`;

  return (
    <div className={themeClass}>
      {children}
    </div>
  );
}