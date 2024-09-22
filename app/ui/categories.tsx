'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useFetchCategories } from '@/app/lib/data';
import Link from 'next/link';

export default function Categories() {
  const categories = useFetchCategories();

  const [imageloading, setImageLoading] = useState(true);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoading(false); // Hide spinner when image is loaded
  };

  return (
    <div className="overflow-x-auto snap-x snap-mandatory flex space-x-4 hide-scrollbar">
      {categories.map(category => (
        <Link key={category.id} href={`category/${category.id}/jobs`}>
          <div
            className="snap-center min-w-[130px] md:min-w-[250px] gap-1 rounded-md bg-gray-50 py-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          >
            <div className='flex items-center justify-center relative'>
              {imageloading && (
                <div className="absolute flex items-center justify-center w-7 h-7 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
              )}
              <Image
                src={category.image_url || "https://i.ibb.co/S0jmJ9h/digital-marketing.png"}
                width={1000}
                height={760}
                alt={`Image for ${category.name}`}
                className={`w-8 h-8 md:w-12 md:h-12 lg:w-12 lg:h-12 object-cover ${imageloading ? 'invisible' : 'visible'}`}
                onLoad={handleImageLoad} 
                priority={true}
              />
            </div>

            <div className='text-center pt-1 text-xs overflow-hidden whitespace-nowrap'>
              <span className="truncate">{category.name}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
