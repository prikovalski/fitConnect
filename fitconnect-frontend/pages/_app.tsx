import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      )}
    </>
  );
}

export default MyApp;
