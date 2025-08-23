"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, AlertCircle, Clock, Shield, CreditCard, Globe, Building, Mail, Phone, MapPin, AlertTriangle, User } from 'lucide-react';
import { Button } from './Button';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');

  if (!isOpen) return null;

  const sections = [
    { id: 'overview', label: 'Prehľad', icon: FileText },
    { id: 'services', label: 'Služby', icon: Shield },
    { id: 'payment', label: 'Platby', icon: CreditCard },
    { id: 'liability', label: 'Zodpovednosť', icon: AlertCircle },
    { id: 'company', label: 'Spoločnosť', icon: Building }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-premium-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-green/5 to-emerald-green/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-green/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-green" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-luxury-black">
                  Všeobecné obchodné podmienky (VOP)
                </h2>
                <p className="text-sm text-luxury-black/60">Všeobecné obchodné podmienky • Crescere s.r.o.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex h-[calc(80vh-80px)]">
            {/* Sidebar Navigation */}
            <div className="w-48 border-r border-gray-100 bg-gray-50/50 p-2 flex flex-col h-full">
              <nav className="space-y-2 flex-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-emerald-green text-premium-white shadow-md'
                        : 'hover:bg-gray-100 text-luxury-black/70 hover:text-luxury-black'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
              
              {/* Date at bottom of sidebar */}
              <div className="mt-auto pt-4 border-t border-emerald-green/20">
                <div className="text-xs text-emerald-green/80 text-center">
                  <div className="font-medium">Posledná aktualizácia:</div>
                  <div className="text-emerald-green/90 font-semibold mt-1">
                    {new Date().toLocaleDateString('sk-SK')}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-3">
              {activeSection === 'overview' && (
                <div className="space-y-3">
                  <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-md p-3">
                    <h3 className="text-base font-semibold text-luxury-black mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-emerald-green mr-2" />
                      Dôležité informácie
                    </h3>
                    <p className="text-sm text-luxury-black/80 leading-relaxed">
                      Tieto všeobecné obchodné podmienky sú v súlade s <strong>zákonom č. 108/2024 Z.z.</strong> o ochrane spotrebiteľa 
                      a <strong>zákonom č. 102/2014 Z.z.</strong> o spotrebe tovaru na diaľku.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-luxury-black mb-1.5">Spoločnosť</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-3">
                          <Building className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">Crescere s.r.o.</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">Ulica Jozefa Adamca 9983/24, 917 01 Trnava</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">IČO: 47 587 792</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">DIČ: 2023994973</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-luxury-black mb-1.5">Kontakt</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">tomas@crescere.sk</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">+421 914 222 889</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">Tomáš Kušmirek, MBA - Majiteľ a konateľ spoločnosti</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">Mgr. Viera Bobáková - Konateľ spoločnosti</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <h4 className="font-semibold text-luxury-black mb-3">Aplikovateľnosť podmienok</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Tieto podmienky sa vzťahujú na všetky služby poskytované spoločnosťou Crescere s.r.o., 
                      vrátane webových stránok, automatizácie, digitálnej transformácie a poradenstva.
                    </p>
                    <p className="text-sm text-luxury-black/70">
                      Používaním našich služieb súhlasíte s týmito podmienkami. Odporúčame vám ich dôkladne prečítať.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'services' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Poskytované služby</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Webové stránky</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Návrh a vývoj webových stránok</li>
                        <li>• Údržba a podpora</li>
                        <li>• Registrácia a správa domén</li>
                        <li>• Správa hostingov</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Automatizácia</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Automatizácia procesov</li>
                        <li>• Workflow riešenia</li>
                        <li>• Integrácia systémov</li>
                        <li>• API integrácie</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Digitálna transformácia</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Digitálna stratégia</li>
                        <li>• Cloud riešenia</li>
                        <li>• Migrácia dát</li>
                        <li>• Školenie zamestnancov</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Poradenstvo</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• IT konzultácie</li>
                        <li>• Projektový manažment</li>
                        <li>• Technická podpora</li>
                        <li>• Audit a analýza</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Kvalita služieb</h4>
                    <p className="text-sm text-luxury-black/70">
                      Služby poskytujeme s odbornou starostlivosťou a v súlade s najlepšími praktikami v odvetví. 
                      Vyhradzujeme si právo na úpravu služieb s predchádzajúcim upozornením.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'payment' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Platobné podmienky</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Spôsoby platby</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Bankový prevod</li>
                        <li>• Platba v hotovosti</li>
                        <li>• Faktúra s odloženou splatnosťou</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Splatnosť</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Jednorazová platba</li>
                        <li>• Priebežná splátková platba podľa dohody</li>
                        <li>• Štandardná splatnosť: 14 dní</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Cenotvorba</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Ceny služieb sú uvedené bez DPH. Spoločnosť Crescere s.r.o. je k aktuálnemu dátumu neplatca DPH.
                    </p>
                    <p className="text-sm text-luxury-black/70">
                      Ceny môžu byť upravené v prípade zmeny požiadaviek alebo rozsahu projektu. 
                      Všetky zmeny budú s vami prediskutované a potvrdené písomne.
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Nesplatenie platby</h4>
                    <p className="text-sm text-luxury-black/70">
                      V prípade nesplatenia platby v dohodnutom termíne si vyhradzujeme právo pozastaviť poskytovanie služieb 
                      a uplatniť úroky z omeškania podľa platnej legislatívy SR.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'liability' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Obmedzenie zodpovednosti</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Rozsah zodpovednosti</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Zodpovednosť je obmedzená na sumu zaplatenú za služby</li>
                        <li>• Nezodpovedáme za nepriame škody</li>
                        <li>• Nezodpovedáme za ušlý zisk</li>
                        <li>• Nezodpovedáme za škody spôsobené tretími stranami</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Vylúčenie zodpovednosti</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Force majeure udalosti</li>
                        <li>• Škody spôsobené klientom</li>
                        <li>• Nesprávne použitie služieb</li>
                        <li>• Technické problémy tretích strán</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Záruka</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Poskytujeme záruku na naše služby po dobu 30 dní od odovzdania diela. 
                      Záruka sa nevzťahuje na chyby spôsobené nesprávnym používaním alebo úpravami tretími stranami.
                    </p>
                    <p className="text-sm text-luxury-black/70">
                      V rámci záruky opravíme chyby bezplatne. Ak oprava nie je možná, poskytneme náhradu služby.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Riešenie sporov</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Všetky spory sa snažíme riešiť mimosúdne. Ak sa nedohodneme, 
                      príslušné sú súdy SR so sídlom v Trnave.
                    </p>

                  </div>
                </div>
              )}

              {activeSection === 'company' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Informácie o spoločnosti</h3>
                  
                  <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-4">Crescere s.r.o.</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">Právna forma</p>
                            <p className="text-sm text-luxury-black/70">Spoločnosť s ručením obmedzeným</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">Sídlo</p>
                            <p className="text-sm text-luxury-black/70">Ulica Jozefa Adamca 9983/24<br/>917 01 Trnava</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">IČO</p>
                            <p className="text-sm text-luxury-black/70">47 587 792</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">DIČ</p>
                            <p className="text-sm text-luxury-black/70">2023994973</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Registrácia a licencie</h4>
                    <div className="text-sm text-luxury-black/70 space-y-2">
                      <p>• Spoločnosť je zaregistrovaná v Obchodnom registri Okresného súdu Trnava</p>
                      <p>• Číslo vložky: TR-XXXXX</p>
                      <p>• Spoločnosť nie je v konkurze ani v likvidácii</p>
                      <p>• Všetky potrebné licencie a oprávnenia na poskytovanie služieb sú splnené</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Kontaktné informácie</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">tomas@crescere.sk</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">+421 914 222 889</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">www.crescere.sk</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">Po-Pi: 9:00-17:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="text-xs text-luxury-black/50">
              Posledná aktualizácia: {new Date().toLocaleDateString('sk-SK')}
            </div>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => window.open('mailto:tomas@crescere.sk?subject=Otázka k podmienkam používania', '_blank')}
                className="border-gray-300 text-luxury-black hover:bg-gray-100"
              >
                Kontaktovať
              </Button>
              <Button
                variant="primary"
                onClick={onClose}
                className="bg-emerald-green hover:bg-emerald-green-light text-premium-white border-emerald-green hover:border-emerald-green-light"
              >
                Rozumiem
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
