'use client';

import { useFetchCategoryIdSubCategories } from '@/app/lib/data';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { SubCategory } from '@/app/lib/types';

interface SubCategoriesProps {
  onSelectSubCategory: (subcategoryId: number | null) => void;
}

export default function SubCategories({ onSelectSubCategory }: SubCategoriesProps) {
  const { id } = useParams();
  const { subcategories, error } = useFetchCategoryIdSubCategories(Number(id));
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  if (error) return <div>Failed to load subcategories</div>;

  const handleSubCategoryClick = (subcategoryId: number | null) => {
    setSelectedSubCategory(subcategoryId);
    onSelectSubCategory(subcategoryId);
  };

  return (
    <div className="overflow-x-auto snap-x snap-mandatory flex space-x-4 hide-scrollbar">
      {subcategories.length > 0 && (
        <div
          className={`snap-center min-w-[130px] md:min-w-[250px] gap-1 rounded-md py-3 text-sm font-medium ${selectedSubCategory === null ? 'bg-sky-100 text-blue-600' : 'bg-gray-50'}`}
          onClick={() => handleSubCategoryClick(null)}
        >
          <div className='text-center pt-1 text-xs overflow-hidden whitespace-nowrap'>
            <span className="truncate">All</span>
          </div>
        </div>
      )}
      {subcategories.map((subcategory: SubCategory) => (
        <div
          key={subcategory.id}
          className={`snap-center min-w-[130px] md:min-w-[250px] gap-1 rounded-md py-3 text-sm font-medium ${selectedSubCategory === subcategory.id ? 'bg-sky-100 text-blue-600' : 'bg-gray-50'}`}
          onClick={() => handleSubCategoryClick(subcategory.id)}
        >
          <div className='text-center pt-1 text-xs overflow-hidden whitespace-nowrap'>
            <span className="truncate">{subcategory.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
