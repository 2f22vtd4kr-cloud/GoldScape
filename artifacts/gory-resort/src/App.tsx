import { useEffect } from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Properties from '@/pages/Properties';
import CountryPage from '@/pages/CountryPage';
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

  return (
    <Router base={base}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/properties" component={Properties} />
        <Route path="/countries/:code" component={CountryPage} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
