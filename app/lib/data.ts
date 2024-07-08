import { useState, useEffect, useCallback } from 'react';
import { Category, Job } from '@/app/lib/types';

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

export function useFetchJob(id: string) {
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