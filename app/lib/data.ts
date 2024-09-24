import { useState, useEffect, useCallback } from 'react';
import { Category, Job, JobResponse, SubCategory } from '@/app/lib/types';
import useSWR from 'swr'

/////////////////////////////////// fetcher ///////////////////////////////////

const fetcher = async (...args: [RequestInfo, RequestInit?]): Promise<any> => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

///////////////////////////////////////////////////////////////////////////////

export function useFetchCategories() {
  const { data, error, isLoading } = useSWR<Category[]>('https://manjakaramal.pythonanywhere.com/api/categories/', fetcher)

  return {
    categories: data || [],
    isLoading,
    error
  };
}

export function useFetchJobs(page: number) {
  const { data, error, isLoading } = useSWR<JobResponse>(`https://manjakaramal.pythonanywhere.com/api/jobs/?page=${page}`, fetcher);

  return {
    jobs: data ? data.items : [],
    count: data ? data.count : 0,
    isLoading,
    error
  };
}

export function useFetchJobId(id: string) {
  const { data, error, isLoading } = useSWR<Job>(`https://manjakaramal.pythonanywhere.com/api/jobs/${id}/`, fetcher);
  
  return {
    job: data || null,
    isLoading,
    error
  };
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
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchCategoryIdJobs = useCallback(async (page = 1) => {
    try {
      let url = `https://manjakaramal.pythonanywhere.com/api/categories/${categoryId}/jobs/?page=${page}`;
      if (subcategoryId !== null) {
        url += `&sub_category=${subcategoryId}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();

      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Expected data.items to be an array');
      }

      setJobs(prevJobs => page === 1 ? data.items : [...prevJobs, ...data.items]);
      setHasMore(data.items.length > 0 && jobs.length + data.items.length < data.count);
      setLoading(false);
      if (page === 1) {
        setTotalCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(true);
      setLoading(false);
    }
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    if (categoryId) {
      setPage(1); // Reset to first page on category change
      fetchCategoryIdJobs(1);
    }
  }, [fetchCategoryIdJobs, categoryId, subcategoryId]);

  return { jobs, loading, error, hasMore, fetchCategoryIdJobs, setPage, page };
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
