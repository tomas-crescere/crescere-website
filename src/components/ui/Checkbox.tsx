import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  name,
  checked,
  onChange,
  ...props
}, ref) => {
  // Use name prop or generate a stable ID based on props
  const checkboxId = useMemo(() => {
    if (id) return id;
    if (name) return `checkbox-${name}`;
    return `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  }, [id, name]);
  
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            id={checkboxId}
            name={name}
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onChange}
            required={props.required}
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={clsx(
              'block w-5 h-5 border-2 rounded transition-all duration-300 ease-premium cursor-pointer relative',
              'hover:border-emerald-green focus-within:ring-2 focus-within:ring-emerald-green/20',
              error 
                ? 'border-red-500' 
                : checked 
                  ? 'border-emerald-green bg-emerald-green' 
                  : 'border-gray-300',
              className
            )}
          >
            {checked && (
              <Check
                className="w-3 h-3 text-premium-white absolute inset-0 m-auto transition-all duration-300 ease-premium"
              />
            )}
          </label>
        </div>
        
        {label && (
          <div className="text-sm text-luxury-black select-none leading-tight">
            {label}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 animate-fade-in ml-8">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-600 ml-8">
          {helperText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
