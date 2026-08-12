import React from 'react';

export function Skeleton({ style, className = '' }: { style?: React.CSSProperties, className?: string }) {
  return (
    <div 
      className={`kz-skeleton ${className}`}
      style={{
        background: 'linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)',
        backgroundSize: '200% 100%',
        animation: 'kz-shimmer 1.5s infinite linear',
        borderRadius: '4px',
        ...style
      }}
    >
      <style>{`
        @keyframes kz-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
