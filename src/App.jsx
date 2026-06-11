import React, { useState, useEffect } from 'react';
import AppRoutes from './routes';
import ScrollToTop from './components/ScrollToTop';
import IntroLoader from './components/IntroLoader';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial mount loader display duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <IntroLoader />}
      </AnimatePresence>
      {!loading && <AppRoutes />}
    </>
  );
}

export default App;
