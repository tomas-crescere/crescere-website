"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { scrollToHref, HEADER_HEIGHT } from '@/lib/scrollUtils';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['hero', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#hero', label: 'Úvod', id: 'hero' },
    { href: '#portfolio', label: 'Portfólio', id: 'portfolio' },
    { href: '#contact', label: 'Kontakt', id: 'contact' }
  ];

  const scrollToSectionHandler = (href: string, itemId: string) => {
    setClickedItem(itemId);
    
    // Add a small delay for the click animation to play
    setTimeout(() => {
      scrollToHref(href, HEADER_HEIGHT);
      setIsOpen(false);
      
      // Reset clicked item after animation
      setTimeout(() => setClickedItem(null), 300);
    }, 150);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium ${
        isScrolled 
          ? 'bg-premium-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-luxury-black border-b border-emerald-green/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Logo variant="full" size="md" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSectionHandler(item.href, item.id)}
                className={`transition-all duration-300 ease-premium font-semibold text-base px-3 py-2 relative overflow-hidden ${
                  isScrolled 
                    ? 'text-luxury-black hover:text-emerald-green' 
                    : 'text-premium-white hover:text-emerald-green'
                } ${
                  activeSection === item.id ? 'text-emerald-green' : ''
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ 
                  scale: 0.95,
                  y: 0
                }}
                animate={clickedItem === item.id ? {
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.3, ease: 'easeInOut' }
                } : {}}
              >
                {/* Ripple effect background */}
                <motion.div
                  className="absolute inset-0 bg-emerald-green/20 rounded-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={clickedItem === item.id ? {
                    scale: 1,
                    opacity: [0, 0.3, 0],
                    transition: { duration: 0.4, ease: 'easeOut' }
                  } : {}}
                />
                
                {/* Text with better positioning */}
                <span className="relative z-10">{item.label}</span>
                
                {/* Active indicator with enhanced animation */}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-green"
                    layoutId="activeSection"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      mass: 0.8
                    }}
                  />
                )}
                
                {/* Hover underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-emerald-green/60"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden p-2 transition-colors duration-300 rounded-lg ${
              isScrolled 
                ? 'text-luxury-black hover:text-emerald-green' 
                : 'text-premium-white hover:text-emerald-green'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`md:hidden backdrop-blur-md border-t ${
              isScrolled 
                ? 'bg-premium-white/98 border-gray-200' 
                : 'bg-luxury-black/98 border-emerald-green/20'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSectionHandler(item.href, item.id)}
                  className={`block w-full text-left transition-all duration-300 ease-premium font-semibold text-base py-3 px-4 rounded-lg relative overflow-hidden ${
                    activeSection === item.id 
                      ? 'text-emerald-green bg-emerald-green/10' 
                      : isScrolled
                        ? 'text-luxury-black hover:text-emerald-green hover:bg-gray-50'
                        : 'text-premium-white hover:text-emerald-green hover:bg-luxury-black/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 5
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    x: 0
                  }}
                >
                  {/* Mobile ripple effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg ${
                      isScrolled 
                        ? 'bg-emerald-green/10' 
                        : 'bg-emerald-green/20'
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={clickedItem === item.id ? {
                      scale: 1,
                      opacity: [0, 0.2, 0],
                      transition: { duration: 0.4, ease: 'easeOut' }
                    } : {}}
                  />
                  
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
