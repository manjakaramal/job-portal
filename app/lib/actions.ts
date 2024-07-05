// actions.ts

import { fetchCategories } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { Category } from '@/app/lib/types';

export function useCategories(): Category[] {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  return categories;
}
