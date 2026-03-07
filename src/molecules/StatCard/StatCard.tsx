import React from 'react';

export interface StatCardProps {
  number: string;
  label: string;
  suffix?: string;
}

export function StatCard({ number, label, suffix }: StatCardProps) {
  return (
    <div className="flex flex-col space-y-2 py-4">
      {/* Huge bold numeric text in Pink/Lilac */}
      <div className="font-sans font-bold text-5xl md:text-6xl text-[var(--color-pink)] tracking-tight">
        {number}{suffix && <span className="text-4xl">{suffix}</span>}
      </div>
      
      {/* Small grey sub-label */}
      <div className="font-sans text-lg text-[var(--color-grey-400)]">
        {label}
      </div>
    </div>
  );
}
