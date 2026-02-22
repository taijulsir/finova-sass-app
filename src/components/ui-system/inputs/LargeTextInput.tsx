'use client';

interface LargeTextInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function LargeTextInput({
  label,
  error,
  required,
  placeholder = 'Enter text...',
  className,
  ...props
}: LargeTextInputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className={`text-sm font-medium ${error ? 'text-red-500' : ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        className={`w-full min-h-30 rounded-lg border border-input bg-background px-3 py-2 text-sm
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
          ${className || ''}`}
        {...props}
      />
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
