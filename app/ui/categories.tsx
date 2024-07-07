'use client';

import Image from 'next/image';
import { useFetchCategories } from '@/app/lib/data';

export default function Categories() {
  const categories = useFetchCategories();

  return (
    <div className="overflow-x-auto snap-x snap-mandatory flex space-x-4 hide-scrollbar">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className="snap-center min-w-[130px] md:min-w-[250px] gap-1 rounded-md bg-gray-50 py-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
        >
          <div className='flex items-center justify-center'>
            <Image
              src={category.image_url || "https://i.ibb.co/S0jmJ9h/digital-marketing.png"}
              width={1000}
              height={760}
              className="w-8 h-8 md:w-16 md:h-16 lg:w-16 lg:h-16"
              alt={`Image for ${category.name}`}
              priority={index < 3 ? true : false}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
          <div className='text-center pt-1 text-xs overflow-hidden whitespace-nowrap'>
            <span className="truncate">{category.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
