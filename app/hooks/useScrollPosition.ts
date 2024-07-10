import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const useScrollPosition = (key: string) => {
  const router = useRouter();
  const savedPosition = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure it's only running on the client side

    // Restore the scroll position when the component mounts
    const saved = localStorage.getItem(key);
    if (saved) {
      savedPosition.current = parseInt(saved, 10);
      window.scrollTo(0, savedPosition.current);
    }

    // Save the scroll position before navigating away
    const handleRouteChange = () => {
      localStorage.setItem(key, window.scrollY.toString());
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      localStorage.setItem(key, window.scrollY.toString());
    };
  }, [key, router]);
};
