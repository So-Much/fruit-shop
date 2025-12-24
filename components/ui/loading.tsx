import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Loading({ size = 'md', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`inline-block ${className}`} role="status" aria-label="Loading">
      <div
        className={`
          ${sizeClasses[size]}
          border-solid border-current border-t-transparent
          rounded-full
          animate-spin
        `}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
