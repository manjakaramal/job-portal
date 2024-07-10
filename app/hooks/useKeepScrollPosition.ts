import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useKeepScrollPosition = () => {
  const router = useRouter();
  const [storedPosition, setStoredPosition] = useState(0);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setStoredPosition(window.scrollY);
    };

    const handleRouteChangeComplete = () => {
      window.scrollTo(0, storedPosition);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, storedPosition]);

  return { storedPosition };
};

export default useKeepScrollPosition;
