'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
}

export function ErrorState({
  title = 'Error',
  message,
  action,
}: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-3" />
      <h3 className="font-semibold text-red-900 dark:text-red-200">{title}</h3>
      <p className="text-sm text-red-700 dark:text-red-300 mt-1">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
