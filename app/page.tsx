'use client';
import { useEffect, useState } from 'react';
import Categories from '@/app/ui/categories';
import Jobs from '@/app/ui/jobs';

const SCROLL_POSITION_KEY = 'scrollPosition';

export default function Page() {
  const [areCategoriesLoaded, setAreCategoriesLoaded] = useState(false);
  const [areJobsLoaded, setAreJobsLoaded] = useState(false);

  useEffect(() => {
    // Restore scroll position after both categories and jobs are loaded
    if (areCategoriesLoaded && areJobsLoaded) {
      const savedScrollPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
      console.log('Restoring scroll position:', savedScrollPosition);
      if (savedScrollPosition) {
        window.scrollTo(0, parseFloat(savedScrollPosition));
      }
    }
  }, [areCategoriesLoaded, areJobsLoaded]);

  useEffect(() => {
    // Save scroll position before unloading the page
    const handleBeforeUnload = () => {
      sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
      console.log('Saving scroll position:', window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Categories onCategoriesLoaded={() => setAreCategoriesLoaded(true)} />
      <Jobs onJobsLoaded={() => setAreJobsLoaded(true)} />
    </>
  );
}
