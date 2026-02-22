'use client';

import React from 'react';

interface SelectInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function SelectInput({
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  error,
  required,
  disabled,
  options,
}: SelectInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full h-11 rounded-lg border border-input bg-background px-3 py-2 text-sm 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
