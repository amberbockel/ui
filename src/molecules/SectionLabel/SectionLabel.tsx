import React from 'react';

export interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="font-sans text-sm font-medium tracking-wide uppercase text-[var(--color-green)] mb-4">
      {children}
    </div>
  );
}
