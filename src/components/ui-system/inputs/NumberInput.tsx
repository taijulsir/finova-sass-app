'use client';

import React from 'react';

interface NumberInputProps {
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function NumberInput({
  label,
  placeholder = 'Enter number',
  value,
  onChange,
  error,
  required,
  disabled,
  min,
  max,
}: NumberInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        className={`w-full h-11 rounded-lg border border-input bg-background px-3 py-2 text-sm
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
