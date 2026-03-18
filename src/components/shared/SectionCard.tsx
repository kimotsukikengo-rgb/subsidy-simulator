import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, icon, children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
        {icon && <span className="text-navy-500">{icon}</span>}
        <h2 className="text-lg font-bold text-navy-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
