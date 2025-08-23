"use client";

import React from 'react';
import { scrollToSection, HEADER_HEIGHT } from '@/lib/scrollUtils';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const handleLogoClick = () => {
    scrollToSection('hero', HEADER_HEIGHT);
  };

  // World-class premium luxury styled "Crescere" text
  const renderPremiumText = () => (
    <div 
      className={`font-display font-black tracking-[0.2em] ${sizeClasses[size]} ${className} relative group cursor-pointer`}
      onClick={handleLogoClick}
    >
      {/* Ultra-premium 3D text effect */}
      <div className="relative transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1">
        {/* Primary luxury text with premium gradient */}
        <span className="relative z-20 bg-gradient-to-r from-emerald-green via-emerald-green-light to-emerald-green-dark bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(20,99,33,0.3)] filter">
          Crescere
        </span>
        
        {/* Premium inner glow */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-green/40 via-emerald-green-light/60 to-emerald-green-dark/40 bg-clip-text text-transparent blur-[1px] filter">
          Crescere
        </span>
        
        {/* Luxury border with premium shine */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-green-dark/90 via-emerald-green-light to-emerald-green/90 bg-clip-text text-transparent filter">
          Crescere
        </span>
        
        {/* Sophisticated shadow layer */}
        <span className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-emerald-green/50 to-luxury-black/80 bg-clip-text text-transparent blur-[0.8px] filter">
          Crescere
        </span>
        
        {/* Premium highlight effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-green-light/60 via-emerald-green-light/80 to-transparent bg-clip-text text-transparent filter">
          Crescere
        </span>
        
        {/* Ultra-premium metallic shine */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-green-light/30 via-emerald-green-light/40 to-transparent bg-clip-text text-transparent filter">
          Crescere
        </span>
        
        {/* Luxury depth effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-green/20 via-transparent to-emerald-green-dark/20 bg-clip-text text-transparent blur-[0.3px] filter">
          Crescere
        </span>
        
        {/* Premium outer glow */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-green/10 via-emerald-green-light/20 to-emerald-green-dark/10 bg-clip-text text-transparent blur-[2px] filter">
          Crescere
        </span>
      </div>
      
      {/* Luxury background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-green/5 via-transparent to-emerald-green-dark/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out scale-150 group-hover:scale-100" />
      
      {/* Premium accent line */}
      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-green-light to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-x-0 group-hover:scale-x-100" />
    </div>
  );

  // Full logo with premium text styling
  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderPremiumText()}
      </div>
    );
  }

  // Icon variant now shows just the premium text
  if (variant === 'icon') {
    return renderPremiumText();
  }

  // Text variant
  if (variant === 'text') {
    return renderPremiumText();
  }

  return renderPremiumText();
};
