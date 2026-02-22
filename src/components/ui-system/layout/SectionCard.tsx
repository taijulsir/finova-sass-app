'use client';

import React from 'react';

interface SectionCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export function SectionCard({
  title,
  description,
  children,
  className = '',
  footer,
}: SectionCardProps) {
  return (
    <div className={`rounded-lg border border-border bg-card p-6 shadow-sm ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      {children}
      {footer && <div className="mt-6 pt-6 border-t border-border">{footer}</div>}
    </div>
  );
}
