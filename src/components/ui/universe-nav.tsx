import { getBaseUrl, PORTALS } from "@/lib/routes";

export default function UniverseNav({ className = "" }: { className?: string }) {
  return (
    <div className={`hidden xl:flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider ${className}`}>
      {PORTALS.map((portal) => (
        <a 
          key={portal.id}
          href={getBaseUrl(portal.sub)} 
          className={`${portal.color} transition-colors duration-300`}
        >
          [ {portal.label} ]
        </a>
      ))}
    </div>
  );
}