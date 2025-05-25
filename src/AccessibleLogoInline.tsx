import React from 'react';

interface AccessibleLogoInlineProps {
  className?: string;
  height?: number;
}

export function AccessibleLogoInline({ className, height = 84 }: AccessibleLogoInlineProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/accessible-logo.png" // ✅ direkter Pfad aus public/
        alt="Accessible Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
        }}
        className="object-contain"
      />
    </div>
  );
}
