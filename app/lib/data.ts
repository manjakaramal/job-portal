import { useState, useEffect } from 'react';
import { Category, Job } from '@/app/lib/types';

export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories on component mount

  async function fetchCategories() {
    try {
      const response = await fetch('https://manjakaramal.pythonanywhere.com/api/categories/');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  return categories;
}



export function useFetchJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        fetchJobs();
    }, []); // Fetch jobs on component mount

    async function fetchJobs() {
        try {
            const response = await fetch(`https://manjakaramal.pythonanywhere.com/api/jobs/?page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            if (Array.isArray(data.items)) {
                setJobs(prevJobs => [...prevJobs, ...data.items]);
                setPage(prevPage => prevPage + 1);
                setHasMore(data.items.length > 0); // Update hasMore based on whether new items were received
            } else {
                throw new Error('Fetched data items is not an array');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    return { jobs, page, hasMore, fetchJobs };
}
