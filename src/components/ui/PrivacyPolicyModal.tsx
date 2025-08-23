"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Eye, FileText, UserCheck, Database, Clock, Mail, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');

  if (!isOpen) return null;

  const sections = [
    { id: 'overview', label: 'Prehľad', icon: Shield },
    { id: 'data', label: 'Údaje', icon: Database },
    { id: 'rights', label: 'Vaše práva', icon: UserCheck },
    { id: 'security', label: 'Bezpečnosť', icon: Lock },
    { id: 'contact', label: 'Kontakt', icon: Mail }
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
                <Shield className="w-6 h-6 text-emerald-green" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-luxury-black">
                  Ochrana osobných údajov
                </h2>
                <p className="text-sm text-luxury-black/60">GDPR Compliance • EU Regulation 2016/679</p>
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
                      Táto politika ochrany osobných údajov je v súlade s <strong>GDPR (EU) 2016/679</strong> a 
                      <strong> zákonom č. 18/2018 Z.z.</strong> o ochrane osobných údajov.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-luxury-black mb-1.5">Spoločnosť</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-emerald-green" />
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
                      <h3 className="text-base font-semibold text-luxury-black mb-1.5">Kontakt DPO</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">tomas@crescere.sk</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">+421 914 222 889</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'data' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Spracovávané osobné údaje</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Identifikačné údaje</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Meno a priezvisko</li>
                        <li>• Emailová adresa</li>
                        <li>• Telefónne číslo</li>
                        <li>• Názov spoločnosti</li>
                        <li>• IČO/DIČ (ak je relevantné)</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Technické údaje</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• IP adresa</li>
                        <li>• Cookies a podobné technológie</li>
                        <li>• Údaje o prehliadači</li>
                        <li>• Časové údaje návštev</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Právny základ spracovania</h4>
                    <div className="space-y-3 text-sm text-luxury-black/70">
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Zmluvný vzťah:</strong> Poskytovanie služieb a komunikácia</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Oprávnený záujem:</strong> Marketingové aktivity (s možnosťou odvolania)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Súhlas:</strong> Newsletter a marketingové komunikácie</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'rights' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Vaše práva podľa GDPR</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                        <h4 className="font-semibold text-luxury-black mb-2 flex items-center">
                          <Eye className="w-4 h-4 text-emerald-green mr-2" />
                          Právo na prístup
                        </h4>
                        <p className="text-sm text-luxury-black/70">Máte právo získať informácie o tom, aké osobné údaje o vás spracovávame.</p>
                      </div>

                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                        <h4 className="font-semibold text-luxury-black mb-2 flex items-center">
                          <FileText className="w-4 h-4 text-emerald-green mr-2" />
                          Právo na opravu
                        </h4>
                        <p className="text-sm text-luxury-black/70">Môžete požiadať o opravu nesprávnych alebo neúplných údajov.</p>
                      </div>

                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                        <h4 className="font-semibold text-luxury-black mb-2 flex items-center">
                          <UserCheck className="w-4 h-4 text-emerald-green mr-2" />
                          Právo na vymazanie
                        </h4>
                        <p className="text-sm text-luxury-black/70">Môžete požiadať o vymazanie vašich údajov (právo na zabudnutie).</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                        <h4 className="font-semibold text-luxury-black mb-2 flex items-center">
                          <Lock className="w-4 h-4 text-emerald-green mr-2" />
                          Právo na obmedzenie
                        </h4>
                        <p className="text-sm text-luxury-black/70">Môžete požiadať o obmedzenie spracovania vašich údajov.</p>
                      </div>

                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                        <h4 className="font-semibold text-luxury-black mb-2 flex items-center">
                          <Database className="w-4 h-4 text-emerald-green mr-2" />
                          Právo na prenosnosť
                        </h4>
                        <p className="text-sm text-luxury-black/70">Môžete požiadať o prenos vašich údajov v štruktúrovanom formáte.</p>
                      </div>

                      <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                        <h4 className="font-semibold text-luxury-black mb-2 flex items-center">
                          <Shield className="w-4 h-4 text-emerald-green mr-2" />
                          Právo na odvolanie súhlasu
                        </h4>
                        <p className="text-sm text-luxury-black/70">Môžete kedykoľvek odvolať súhlas so spracovaním údajov.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Ako uplatniť vaše práva</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Všetky žiadosti môžete uplatniť kontaktovaním nás na <strong>tomas@crescere.sk</strong> alebo telefonicky na <strong>+421 914 222 889</strong>.
                    </p>
                    <p className="text-sm text-luxury-black/70">
                      Odpovieme vám do <strong>30 dní</strong> od prijatia žiadosti. V prípade zložitých žiadostí môžeme tento termín predĺžiť o ďalších 60 dní.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Bezpečnosť a ochrana údajov</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Technické opatrenia</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Šifrovanie údajov v prenose (HTTPS/TLS)</li>
                        <li>• Šifrovanie údajov v pokoji</li>
                        <li>• Pravidelné zálohovanie</li>
                        <li>• Aktualizácie bezpečnostných systémov</li>
                        <li>• Firewall a antimalware ochrana</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Organizačné opatrenia</h4>
                      <ul className="space-y-2 text-sm text-luxury-black/70">
                        <li>• Prístupové kontroly a autentifikácia</li>
                        <li>• Školenie zamestnancov o bezpečnosti</li>
                        <li>• Pravidelné audity bezpečnosti</li>
                        <li>• Incident response plány</li>
                        <li>• Dohody o zachovaní mlčanlivosti</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Oznámenie o porušení bezpečnosti</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      V prípade porušení bezpečnosti osobných údajov, ktoré môže viesť k riziku pre vaše práva a slobody, 
                      vás budeme informovať do <strong>72 hodín</strong> od zistenia porušenia.
                    </p>
                    <p className="text-sm text-luxury-black/70">
                      Oznámenie bude obsahovať popis povahy porušenia, kontaktné údaje DPO, 
                      možné dôsledky a navrhované opatrenia na zmiernenie rizík.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Kontakt a podnety</h3>
                  
                  <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-4">Kontaktné údaje</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">Email</p>
                            <p className="text-sm text-luxury-black/70">tomas@crescere.sk</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">Telefón</p>
                            <p className="text-sm text-luxury-black/70">+421 914 222 889</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">Adresa</p>
                            <p className="text-sm text-luxury-black/70">Ulica Jozefa Adamca 9983/24<br/>917 01 Trnava</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-emerald-green" />
                          <div>
                            <p className="font-medium text-luxury-black">Pracovný čas</p>
                            <p className="text-sm text-luxury-black/70">nepretržite</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Právo na podanie sťažnosti</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Ak sa domnievate, že spracovanie vašich osobných údajov porušuje GDPR, 
                      máte právo podať sťažnosť na Úrad na ochranu osobných údajov SR.
                    </p>
                    <div className="text-sm text-luxury-black/70">
                      <p><strong>Úrad na ochranu osobných údajov SR</strong></p>
                      <p>Hraničná 12, 820 07 Bratislava</p>
                      <p>Tel: +421 2 3231 3214 | Email: statny.dozor@pdp.gov.sk</p>
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
                onClick={() => window.open('mailto:tomas@crescere.sk?subject=Otázka k ochrane osobných údajov', '_blank')}
                className="border-gray-300 text-luxury-black hover:bg-gray-100"
              >
                Kontaktovať DPO
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
