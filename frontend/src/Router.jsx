import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/signup': SignupPage,
  '/dashboard': Dashboard,

  '*': LandingPage // Default to landing for unknown routes
};

// The Router component listens to browser history changes and renders the matching route
export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Event listener for back/forward navigation
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // Find the component for the current path, default to '*' route if not found
  const Component = routes[currentPath] || routes['*'];

  return <Component />;
}

// Helper to push a new route to the history API
export function navigate(path) {
  window.history.pushState({}, '', path);
  // Dispatch a popstate event to trigger the router's useEffect listener
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent);
}

// A Link component to easily navigate between routes without reloading the page
export function Link({ to, children, className, style }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}

