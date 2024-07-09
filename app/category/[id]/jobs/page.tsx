'use client';
import { useState } from 'react';
import SubCategories from '@/app/ui/category/sub-categories';
import Jobs from '@/app/ui/category/jobs';

export default function Page() {
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  return (
    <>
      <SubCategories onSelectSubCategory={setSelectedSubCategory} />
      <Jobs selectedSubCategory={selectedSubCategory} />
    </>
  );
}
