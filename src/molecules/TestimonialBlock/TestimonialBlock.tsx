import React from 'react';

export interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export function TestimonialBlock({ quote, author, role, avatarUrl }: TestimonialBlockProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Quote Icon styling if needed, or simply quotes */}
      <div className="text-6xl text-[var(--color-pink)] font-display opacity-80 leading-none">“</div>
      
      {/* Oversized gradient text */}
      <h3 className="text-3xl md:text-5xl font-sans font-bold leading-tight" style={{
        background: 'linear-gradient(105deg, var(--color-pink) 0%, var(--color-indigo) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {quote}
      </h3>
      
      {/* Avatar and Info */}
      <div className="flex flex-col items-center space-y-3 pt-4">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={author} 
            className="w-16 h-16 rounded-full object-cover border border-[var(--glass-border)] shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[var(--color-grey-200)] flex items-center justify-center text-[var(--color-grey-600)] font-bold text-xl">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-bold text-[var(--color-white)] text-lg">{author}</div>
          <div className="text-[var(--color-grey-400)] text-sm">{role}</div>
        </div>
      </div>
    </div>
  );
}
