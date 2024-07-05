import { Category } from '@/app/lib/types';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://manjakaramal.pythonanywhere.com/api/categories/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
