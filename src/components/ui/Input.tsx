"use client";

import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'success' | 'error';
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  icon,
  id,
  name,
  type = 'text',
  ...props
}, ref) => {
  // Use name prop or generate a stable ID based on props
  const inputId = useMemo(() => {
    if (id) return id;
    if (name) return `input-${name}`;
    return `input-${Math.random().toString(36).substr(2, 9)}`;
  }, [id, name]);

  // Determine autocomplete value based on name and type
  const getAutocompleteValue = () => {
    if (name === 'fullName') return 'name';
    if (name === 'phone') return 'tel';
    if (name === 'email') return 'email';
    if (type === 'email') return 'email';
    if (type === 'tel') return 'tel';
    return 'off';
  };
  
  const baseClasses = 'w-full px-4 py-3 text-base bg-premium-white border-2 rounded-lg transition-all duration-300 ease-premium focus:outline-none focus:ring-2 focus:ring-offset-2 placeholder:text-gray-400';
  
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
          htmlFor={inputId}
          className="block text-sm font-medium text-luxury-black"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          autoComplete={getAutocompleteValue()}
          required={props.required}
          className={clsx(
            baseClasses,
            variants[currentVariant],
            icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
      
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

Input.displayName = 'Input';
