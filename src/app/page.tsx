import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Credentials } from '@/components/Credentials';
import { Collection } from '@/components/Collection';
import { Atelier } from '@/components/Atelier';
import { Transformation } from '@/components/Transformation';
import { Essence } from '@/components/Essence';
import { ReuseNarrative } from '@/components/ReuseNarrative';
import { Process } from '@/components/Process';
import { UsageGuide } from '@/components/UsageGuide';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { MobileContactBar } from '@/components/MobileContactBar';
import { ScrollRevealObserver } from '@/components/ScrollRevealObserver';
import { EditorialPreloader } from '@/components/EditorialPreloader';
import { ProjectPreferencesProvider } from '@/context/ProjectContext';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <ProjectPreferencesProvider>
      <EditorialPreloader />
      <ScrollRevealObserver />
      <Header />
      <main id="principal">
        <noscript>
          <p className="no-script">
            Ative o JavaScript para explorar as experiências interativas. Você também
            pode{' '}
            <a href={`https://wa.me/${siteConfig.phone}`}>
              abrir o WhatsApp diretamente
            </a>
            .
          </p>
        </noscript>

        <Hero />
        <Credentials />
        <Collection />
        <Atelier />
        <Transformation />
        <Essence />
        <ReuseNarrative />
        <Process />
        <UsageGuide />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </ProjectPreferencesProvider>
  );
}
