import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Portfolio } from '../components/sections/Portfolio';
import { Contact } from '../components/sections/Contact';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Portfolio />
      <Contact />
    </main>
  );
}
