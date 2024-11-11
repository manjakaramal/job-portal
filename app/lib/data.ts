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

export function useFetchJobId(id: number) {

  const { data, error, isLoading } = useSWR<Job>(`https://manjakaramal.pythonanywhere.com/api/jobs/${id}/`, fetcher);
  return {
    job: data || null,
    isLoading,
    error
  };
}

export function useFetchCategoryIdSubCategories(categoryId: number) {
  const { data, error, isLoading } = useSWR<SubCategory[]>(
    categoryId ? `https://manjakaramal.pythonanywhere.com/api/categories/${categoryId}/subcategories/` : null,
    fetcher
  );

  return {
    subcategories: data || [],
    isLoading,
    error
  };
}

// export function useFetchCategoryIdJobs(categoryId: number, page: number, subcategoryId: number | null) {
//   const url = `https://manjakaramal.pythonanywhere.com/api/categories/${categoryId}/jobs/?page=${page}${
//     subcategoryId !== null ? `&sub_category=${subcategoryId}` : ''
//   }`;

//   const { data, error, isLoading } = useSWR<JobResponse>(url, fetcher);

//   return {
//     jobs: data ? data.items : [],
//     count: data ? data.count : 0,
//     isLoading,
//     error
//   };
// }

export function useFetchCategoryIdJobs(categoryId: number, page: number, subcategoryId: number | null) {
  const url = useCallback(() => {
    return `https://manjakaramal.pythonanywhere.com/api/categories/${categoryId}/jobs/?page=${page}${
      subcategoryId !== null ? `&sub_category=${subcategoryId}` : ''
    }`;
  }, [categoryId, page, subcategoryId]);

  const { data, error, isLoading } = useSWR<JobResponse>(url(), fetcher);

  return {
    jobs: data ? data.items : [],
    count: data ? data.count : 0,
    isLoading,
    error
  };
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
