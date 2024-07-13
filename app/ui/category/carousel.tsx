'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useFetchCategories } from '@/app/lib/data';
import Link from 'next/link';

const Carousel = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const categories = useFetchCategories();
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setItemsPerPage(8); // 4 columns and 2 rows
    } else {
      setItemsPerPage(4); // 2 columns and 2 rows
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className="overflow-x-auto w-full mx-1 hide-scrollbar"
        ref={carouselRef}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div
          className="flex gap-2"
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className={`grid gap-2 w-full flex-shrink-0 ${itemsPerPage === 8 ? 'grid-cols-4 grid-rows-2' : 'grid-cols-2 grid-rows-2'}`}
            >
              {categories.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((category) => (
                <Link key={category.id} href={`category/${category.id}/jobs`}>
                  <div className="flex flex-col items-center justify-center h-32 bg-gray-50 hover:bg-sky-100 hover:text-blue-600 rounded-md"
                    style={{ scrollSnapAlign: 'start' }}>
                    <Image
                      src={category.image_url || "https://i.ibb.co/S0jmJ9h/digital-marketing.png"}
                      width={1000}
                      height={760}
                      className="w-8 h-8 md:w-12 md:h-12 lg:w-12 lg:h-12 object-cover mb-2"
                      alt={`Image for ${category.name}`}
                      loading="lazy"
                    />
                    <div className='text-center pt-1 text-xs'>
                      {category.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
