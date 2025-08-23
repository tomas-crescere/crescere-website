"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowDown, Calendar } from 'lucide-react';
import Image from 'next/image';

export const Portfolio: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);

  const allProjects = [
    {
      id: 1,
      title: 'Crescere',
      description: 'Dynamická web stránka s našim portfóliom služieb, ktorá postačuje na to, aby vám odovzdala hlavné posolstvo a zvyšný čas môžeme investovať do vašich projektov',
      descriptionHighlight: 'zvyšný čas môžeme investovať do vašich projektov',
      category: 'Digitálna vizitka',
      image: '/images/portfolio/crescere.jpg',
      benefits: ['Crescere s.r.o.', 'Digitalizácia', 'Webová aplikácia', 'Financovanie projektu'],
      timeline: '8 - 10 dní',
      price: '900',
      link: 'mailto:tomas@crescere.sk'
    },
    
    {
      id: 2,
      title: 'LND Staff',
      description: 'Statická web stránka s portfóliom služieb, kontaktným formulárom a dostupnosťou celého webu v štyroch jazykoch',
      category: 'Digitálna vizitka',
      image: '/images/portfolio/lndstaff.jpg',
      benefits: ['4 jazyky', 'Kontaktný formulár', 'Soc. siete'],
      timeline: '6 - 8 dní',
      price: '500',
      link: 'https://lndstaff.sk'
    },
    {
      id: 3,
      title: 'TRANSFER Slovensko',
      description: 'Dátové centrum pre TRANSFER Slovensko, ktoré umožňuje detailne analyzovať a pracovať s XLSX, XML, JSON a CSV súbormi. Generuje výstupy V PDF, XLSX, XML a e-mailom',
      category: 'Webová aplikácia',
      image: '/images/portfolio/transfer.jpg',
      benefits: ['XLSX, XML, JSON, CSV', 'Automatizácia', 'API integrácia', 'Parsovanie dát'],
      timeline: '4-6 týždňov',
      price: '4,000',
      link: 'https://data.transferpersonal.sk'
    },
    {
      id: 4,
      title: 'VJ Business Consulting',
      description: 'Strategické poradenstvo pre digitálnu transformáciu a udržateľný rast vašej spoločnosti',
      category: 'Digitálna vizitka',
      image: '/images/portfolio/vjbusiness.jpg',
      benefits: ['3 jazyky', 'Soc. siete', 'Testimoniály', 'Formulár'],
      timeline: '4 - 6 dní',
      price: '400',
      link: 'https://vjbusiness.sk'
    },
  ];

  const visibleProjectsList = allProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < allProjects.length;

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, allProjects.length));
  };

  return (
    <section id="portfolio" className="min-h-[70vh] bg-premium-white pt-4 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-2">
            Naše <span className="text-emerald-green">projekty</span>
          </h2>
          <p className="text-base text-luxury-black/70 max-w-2xl mx-auto">
            Ukážky našich projektov a riešení, 
            ktoré vám pomôžu získať predstavu o časovej a finančnej náročnosti projektov.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <AnimatePresence>
            {visibleProjectsList.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-premium overflow-hidden border border-gray-100 h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-premium" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2 py-1 bg-emerald-green/90 text-premium-white text-xs font-medium rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-luxury-black mb-2 group-hover:text-emerald-green transition-colors duration-300 ease-premium">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-luxury-black/70 mb-4 leading-relaxed flex-1">
                      {project.descriptionHighlight ? (
                        <>
                          {project.description.replace(project.descriptionHighlight, '')}
                          <span className="text-emerald-green font-semibold">
                            {project.descriptionHighlight}
                          </span>
                        </>
                      ) : (
                        project.description
                      )}
                    </p>

                    {/* Project Benefits */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.benefits?.map((benefit) => (
                        <span
                          key={benefit}
                          className="px-2 py-1 bg-emerald-green/10 text-emerald-green text-xs rounded-md border border-emerald-green/20"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Project Details */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <span className="font-semibold text-emerald-green">{project.price} €</span>
                        </div>
                      </div>
                      
                      {project.link && project.link !== '#' ? (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 3 }}
                          className="inline-flex items-center text-emerald-green hover:text-emerald-green-light font-medium transition-colors duration-300 ease-premium group/link"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </motion.a>
                      ) : (
                        <motion.button
                          whileHover={{ x: 3 }}
                          className="inline-flex items-center text-gray-400 font-medium transition-colors duration-300 ease-premium group/link cursor-not-allowed"
                          disabled
                        >
                          <ExternalLink className="w-3 h-3" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMoreProjects}
              className="inline-flex items-center px-6 py-3 bg-luxury-black text-premium-white rounded-lg font-semibold transition-all duration-300 ease-premium hover:bg-premium-gray shadow-lg hover:shadow-xl"
            >
              Zobraziť viac projektov
              <ArrowDown className="ml-2 w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Premium Financing Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center sm:text-right mt-4 mb-2 px-4 sm:px-0"
        >
          <div className="inline-block max-w-full">
            <div className="relative px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-green/8 to-emerald-green/12 border border-emerald-green/40 hover:border-emerald-green/60 hover:scale-105 transition-all duration-300 ease-premium shadow-md hover:shadow-lg">
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <div className="inline-flex items-center justify-center w-5 h-5 bg-emerald-green rounded-md">
                  <span className="text-premium-white text-xs font-bold">€</span>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-emerald-green font-semibold text-xs uppercase tracking-wide leading-none">
                    Crescere Financovanie
                  </p>
                  <p className="text-luxury-black/80 font-medium text-xs leading-tight mt-0.5">
                    Mesačné splátky projektov až na 12 mesiacov
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
