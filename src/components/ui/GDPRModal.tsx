import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Eye, FileText } from 'lucide-react';
import { Button } from './Button';

interface GDPRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GDPRModal: React.FC<GDPRModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-premium-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-green/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-green" />
              </div>
              <h2 className="text-2xl font-display font-bold text-luxury-black">
                Ochrana osobných údajov (GDPR)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lock className="w-3 h-3 text-emerald-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">
                    Spracovanie osobných údajov
                  </h3>
                  <p className="text-sm text-luxury-black/70 leading-relaxed">
                    Vaše osobné údaje spracovávame v súlade s Nariadením GDPR (EU) 2016/679 a zákonom č. 18/2018 Z.z. o ochrane osobných údajov.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Eye className="w-3 h-3 text-emerald-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">
                    Účel spracovania
                  </h3>
                  <p className="text-sm text-luxury-black/70 leading-relaxed">
                    Osobné údaje spracovávame na účely komunikácie, poskytovania služieb a plnenia zmluvných vzťahov. Vaše údaje nebudú predané tretím stranám.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-3 h-3 text-emerald-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">
                    Vaše práva
                  </h3>
                  <p className="text-sm text-luxury-black/70 leading-relaxed">
                    Máte právo na prístup k vašim údajom, ich opravu, vymazanie, obmedzenie spracovania a prenosnosť. Môžete tiež odvolať súhlas kedykoľvek.
                  </p>
                </div>
              </div>
            </div>

                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-emerald-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3 h-3 text-emerald-green" />
              </div>
              <div>
                <h4 className="font-semibold text-luxury-black mb-1">
                  Spoločnosť
                </h4>
                <p className="text-xs text-luxury-black/70">
                  <strong>Crescere s.r.o.</strong><br/>
                  Sídlo: Ulica Jozefa Adamca 9983/24, 917 01 Trnava<br/>
                  IČO: 47 587 792 | DIČ: 2023994973<br/>
                  Kontakt: tomas@crescere.sk
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-100">
            <Button
              variant="primary"
              onClick={onClose}
              className="bg-emerald-green hover:bg-emerald-green-light text-premium-white border-emerald-green hover:border-emerald-green-light"
            >
              Rozumiem
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
