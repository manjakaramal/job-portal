'use client';

import { useState, useEffect } from 'react';
import { GrPrevious, GrNext } from "react-icons/gr";
import Image from 'next/image';
import { useFetchCategories } from '@/app/lib/data';
import Link from 'next/link';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const categories = useFetchCategories();

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

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(categories.length / itemsPerPage));
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(categories.length / itemsPerPage)) % Math.ceil(categories.length / itemsPerPage));
  };

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [itemsPerPage, categories.length]);

  return (
    <div className="flex items-center justify-center">
      <button onClick={prev} className="p-2 bg-gray-50 rounded-full"><GrPrevious /></button>
      <div className="overflow-hidden w-full mx-4">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className={`grid gap-2 w-full flex-shrink-0 ${itemsPerPage === 8 ? 'grid-cols-4 grid-rows-2' : 'grid-cols-2 grid-rows-2'}`}
            >
              {categories.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((category) => (
                <Link key={category.id} href={`category/${category.id}/jobs`}>
                    <div
                 
                  className="flex flex-col items-center justify-center h-32 bg-gray-50 hover:bg-sky-100 hover:text-blue-600 rounded-md "
                >
                    <Image
                        src={category.image_url || "https://i.ibb.co/S0jmJ9h/digital-marketing.png"}
                        width={1000}
                        height={760}
                        className="h-16 w-16 object-cover mb-2"
                        alt={`Image for ${category.name}`}
                        loading="lazy"
                    />
                  
                    <div className='text-center pt-1 text-xs overflow-hidden whitespace-nowrap'>
                        <span className="truncate">{category.name}</span>
                    </div>
                </div>
                </Link>
                
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={next} className="p-2 bg-gray-50 rounded-full"><GrNext /></button>
    </div>
  );
};

export default Carousel;
