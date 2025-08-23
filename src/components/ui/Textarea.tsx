import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'success' | 'error';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  id,
  name,
  rows = 4,
  ...props
}, ref) => {
  // Use name prop or generate a stable ID based on props
  const textareaId = useMemo(() => {
    if (id) return id;
    if (name) return `textarea-${name}`;
    return `textarea-${Math.random().toString(36).substr(2, 9)}`;
  }, [id, name]);
  
  const baseClasses = 'w-full px-4 py-3 text-base bg-premium-white border-2 rounded-lg transition-all duration-300 ease-premium focus:outline-none focus:ring-2 focus:ring-offset-2 placeholder:text-gray-400 resize-none';
  
  const variants = {
    default: 'border-gray-200 focus:border-emerald-green focus:ring-emerald-green/20',
    success: 'border-emerald-green focus:border-emerald-green focus:ring-emerald-green/20',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
  };

  const currentVariant = error ? 'error' : variant;

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-luxury-black"
        >
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        required={props.required}
        className={clsx(
          baseClasses,
          variants[currentVariant],
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
