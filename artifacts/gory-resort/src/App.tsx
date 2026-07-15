import { useEffect } from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import CountryPage from '@/pages/CountryPage';
import TaxGuide from '@/pages/TaxGuide';
import Favorites from '@/pages/Favorites';
import Compare from '@/pages/Compare';
import NotFound from '@/pages/not-found';

/** Wouter (like the browser's default history API) keeps the previous scroll
 *  position across client-side navigations. Without this, following a link
 *  (e.g. a country tab) while scrolled down on the previous page lands the
 *  new page already scrolled past its own top. */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  // Apply theme class synchronously to avoid FOUC
  useEffect(() => {
    const saved = localStorage.getItem('eom-theme') ?? 'dark';
    if (saved === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  return (
    <ThemeProvider>
      <Router base={base}>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/properties" component={Properties} />
          <Route path="/properties/:id" component={PropertyDetail} />
          <Route path="/countries/:code" component={CountryPage} />
          <Route path="/tax" component={TaxGuide} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/compare" component={Compare} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
