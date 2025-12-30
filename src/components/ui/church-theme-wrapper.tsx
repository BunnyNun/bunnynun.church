'use client';
import { useDelve } from "@/context/delve-context";

export default function ChurchThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDelveActive } = useDelve();
  return (
    <div className={`church-theme min-h-screen ${isDelveActive ? 'corruption-active' : ''}`}>
      {children}
    </div>
  );
}