'use client';

import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon ? (
        <div className="mb-4 text-muted-foreground">{icon}</div>
      ) : (
        <AlertCircle className="h-12 w-12 mb-4 text-muted-foreground" />
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      {action}
    </div>
  );
}

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
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
      <div className="flex items-start gap-4">
        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 dark:text-red-100">{title}</h3>
          <p className="text-sm text-red-800 dark:text-red-200 mt-1">{message}</p>
          {action && <div className="mt-4">{action}</div>}
        </div>
      </div>
    </div>
  );
}

interface SuccessStateProps {
  title?: string;
  message: string;
}

export function SuccessState({
  title = 'Success',
  message,
}: SuccessStateProps) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
      <div className="flex items-start gap-4">
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 dark:text-green-100">{title}</h3>
          <p className="text-sm text-green-800 dark:text-green-200 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}
