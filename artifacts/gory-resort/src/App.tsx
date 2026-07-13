import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Vision } from '@/components/sections/Vision';
import { Ski } from '@/components/sections/Ski';
import { Stay } from '@/components/sections/Stay';
import { Experiences } from '@/components/sections/Experiences';
import { Investment } from '@/components/sections/Investment';
import { PressStrip } from '@/components/PressStrip';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

function MainSite() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white font-sans">
      <Navigation />
      <main>
        <Hero />
        <Vision />
        <Ski />
        <Stay />
        <Experiences />
        <Investment />
        <PressStrip />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <LanguageProvider>
      <Router base={base}>
        <Switch>
          <Route path="/*">
            <MainSite />
          </Route>
        </Switch>
      </Router>
    </LanguageProvider>
  );
}

export default App;
