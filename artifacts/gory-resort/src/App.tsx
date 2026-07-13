import { Router, Route, Switch } from 'wouter';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Properties from '@/pages/Properties';
import NotFound from '@/pages/not-found';

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/properties" component={Properties} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
