import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-premium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-emerald-green hover:bg-emerald-green-light text-premium-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-emerald-green',
    secondary: 'bg-luxury-black hover:bg-premium-gray text-premium-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-luxury-black',
    outline: 'border-2 border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-premium-white focus:ring-emerald-green',
    ghost: 'text-emerald-green hover:bg-emerald-green/10 focus:ring-emerald-green',
    premium: 'bg-gradient-to-r from-emerald-green via-emerald-green-light to-emerald-green-dark text-premium-white shadow-2xl hover:shadow-emerald-green/25 transform hover:-translate-y-1 focus:ring-emerald-green border border-emerald-green/20 backdrop-blur-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-premium-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 before:ease-premium after:absolute after:inset-0 after:bg-emerald-green/20 after:rounded-lg after:blur-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-12 py-6 text-xl rounded-xl'
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
