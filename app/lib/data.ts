import { useState, useEffect, useCallback } from 'react';
import { Category, Job, SubCategory } from '@/app/lib/types';

export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return categories;
}

export function useFetchJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchJobs = useCallback(async () => {
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
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, page, hasMore, fetchJobs };
}

export function useFetchJobId(id: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchJob = useCallback(async () => {
    try {
      const response = await fetch(`https://manjakaramal.pythonanywhere.com/api/jobs/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      const data = await response.json();
      setJob(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job:', error);
      setError(true);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return { job, loading, error };
}



export function useFetchCategoryIdSubCategories(categoryId: string) {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [status, setStatus] = useState<{ loading: boolean; error: boolean }>({ loading: true, error: false });

  const fetchCategoryIdSubCategories = useCallback(async () => {
    try {
      const response = await fetch(`https://manjakaramal.pythonanywhere.com/api/categories/${categoryId}/subcategories/`);
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json();
      setSubcategories(data);
      setStatus({ loading: false, error: false });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setStatus({ loading: false, error: true });
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryIdSubCategories();
    }
  }, [fetchCategoryIdSubCategories, categoryId]);

  return { subcategories, ...status };
}

export function useFetchCategoryIdJobs(categoryId: string, subcategoryId: number | null) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchCategoryIdJobs = useCallback(async () => {
    try {
      let url = `https://manjakaramal.pythonanywhere.com/api/categories/${categoryId}/jobs/`;
      if (subcategoryId !== null) {
        url += `?sub_category=${subcategoryId}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(true);
      setLoading(false);
    }
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryIdJobs();
    }
  }, [fetchCategoryIdJobs, categoryId, subcategoryId]);

  return { jobs, loading, error };
}

export async function fetchJobSearchResults(query: string, page: number): Promise<{ items: Job[], count: number }> {
  try {
    const response = await fetch(`https://manjakaramal.pythonanywhere.com/api/jobs/search?query=${query}&page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return { items: [], count: 0 };
  }
}
