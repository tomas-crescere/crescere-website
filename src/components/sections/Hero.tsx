"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Globe, Code, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { scrollToSection, HEADER_HEIGHT } from '@/lib/scrollUtils';

export const Hero: React.FC = () => {
  const features = [
    {
      icon: Globe,
      label: 'Digitálna vizitka',
      description: 'Statické a dynamické webové stránky na mieru'
    },
    {
      icon: Code,
      label: 'Webové aplikácie',
      description: 'Transformácia papierových procesov na digitálne'
    },
    {
      icon: Lightbulb,
      label: 'Poradenstvo',
      description: 'Bezplatná analýza a konzultácia vhodného riešenia pre vašu firmu'
    }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-luxury-black pt-24 sm:pt-28 md:pt-20 pb-6">
      {/* Premium Border Effect */}
      <div className="absolute inset-0 border border-emerald-green/10 rounded-none pointer-events-none" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#146321_1px,_transparent_1px)] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_40%,_#146321_0.5px,_transparent_60%)] bg-[length:100px_100px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-24 sm:top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-green/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-20 h-20 sm:w-28 sm:h-28 bg-premium-white/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute top-1/2 left-8 sm:left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-emerald-green/15 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4
        }}
      />


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8 sm:pt-0">


        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-premium-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-premium-white to-premium-white/90 bg-clip-text text-transparent pb-1">Digitalizácia</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-green via-emerald-green-light to-emerald-green-dark bg-clip-text text-transparent">vášho podnikania</span>
          </h1>
          
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-premium-white/90 max-w-2xl mx-auto leading-relaxed font-body px-4">
            Transformujeme vaše papierové procesy na digitálne. 
            <span className="block mt-2">Od webových prezentácií až po komplexnú automatizáciu procesov.</span>
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="mb-10"
        >
          <Button
            variant="premium"
            size="lg"
            onClick={() => scrollToSection('portfolio', HEADER_HEIGHT)}
            className="group relative overflow-hidden bg-gradient-to-br from-luxury-black/40 to-luxury-black/20 border border-emerald-green/20 backdrop-blur-sm hover:border-emerald-green/40 hover:bg-gradient-to-br hover:from-luxury-black/60 hover:to-luxury-black/40 transition-all duration-500 ease-premium hover:transform hover:-translate-y-1"
          >
            <span className="relative z-10 text-premium-white font-semibold">Ukážky projektov</span>
            <ArrowDown className="ml-3 transition-transform duration-300 group-hover:translate-y-1 relative z-10 text-premium-white" />
          </Button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
              className="text-center group"
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-luxury-black/40 to-luxury-black/20 border border-emerald-green/20 backdrop-blur-sm hover:border-emerald-green/40 hover:bg-gradient-to-br hover:from-luxury-black/60 hover:to-luxury-black/40 transition-all duration-500 ease-premium group-hover:transform group-hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-green/20 to-emerald-green/10 rounded-2xl mb-6 group-hover:from-emerald-green/30 group-hover:to-emerald-green/20 transition-all duration-500 ease-premium border border-emerald-green/20 group-hover:border-emerald-green/40 relative">
                  <feature.icon className="w-8 h-8 text-emerald-green relative z-10" />
                  <div className="absolute inset-0 bg-emerald-green/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-lg font-semibold text-premium-white mb-3 group-hover:text-emerald-green transition-colors duration-300">
                  {feature.label}
                </h3>
                <p className="text-sm text-premium-white/80 leading-relaxed group-hover:text-premium-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-emerald-green/40 rounded-full flex justify-center backdrop-blur-sm bg-luxury-black/20"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-emerald-green to-emerald-green-light rounded-full mt-2"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
