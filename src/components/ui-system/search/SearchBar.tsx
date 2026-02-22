'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  value = '',
  disabled = false,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setInternalValue('');
    onSearch('');
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
        className="w-full h-11 rounded-lg border border-input bg-background pl-10 pr-10 py-2 text-sm
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {internalValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
