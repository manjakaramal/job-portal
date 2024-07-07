import React from 'react';

export const CategoriesSkeleton: React.FC = () => (
  <div className="overflow-x-auto snap-x snap-mandatory flex space-x-4 hide-scrollbar">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="snap-center min-w-[130px] md:min-w-[250px] gap-1 rounded-md bg-gray-200 py-3 text-sm font-medium animate-pulse">
        <div className='flex items-center justify-center'>
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
        </div>
        <div className='text-center pt-1 text-xs overflow-hidden whitespace-nowrap'>
          <div className="w-20 h-3 bg-gray-300 rounded mb-1"></div>
        </div>
      </div>
    ))}
  </div>
);

export const JobsSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-4 gap-4 mt-2">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="rounded-md bg-gray-200 p-5 hover:bg-sky-100 hover:text-blue-600 animate-pulse">
        <div className="text-lg font-medium h-6 bg-gray-300 mb-4"></div>
        <div className="flex items-center text-sm pt-1">
          <div className="w-10 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center text-xs pt-2">
          <div className="w-10 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center text-xs pt-2">
          <div className="w-10 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);
