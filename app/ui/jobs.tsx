'use client';
import React, { useState } from 'react';
import { RiBuilding2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { useFetchJobs } from '@/app/lib/data';
import Link from 'next/link';
import { GrPrevious, GrNext } from "react-icons/gr";

export default function Jobs() {
  const [page, setPage] = useState(1); // State for the current page
  const { jobs, count, isLoading, error } = useFetchJobs(page); // Pass the page to the hook
  const resultsPerPage = 20;

  const totalPages = Math.ceil(count / resultsPerPage);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>; 
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mt-2">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <Link key={job.id} href={`/jobs/${job.id}`} passHref>
              <div className="rounded-md bg-gray-50 h-full p-3 hover:bg-sky-100 hover:text-blue-600">
                <div className="text-base md:text-lg font-medium">{job.name}</div>
                <div className="flex items-center text-sm md:text-base pt-1"> 
                  <RiBuilding2Line className="inline-block mr-1" />
                  {job.company?.name ?? 'Unknown Company'}
                </div>
                <div className="flex items-center text-xs pt-1"> 
                  <IoLocationOutline className="inline-block mr-1" />
                  {job.location?.name ?? 'Unknown Location'}
                </div>
                <div className="flex items-center text-xs pt-2"> 
                  <CiCalendarDate className="inline-block mr-1" />
                  {job.posted}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No jobs found.</div>
        )}
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`mx-1 px-3 py-2 rounded ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}>
          <GrPrevious />
        </button>
        <button
          className={`mx-1 px-3 py-2 rounded ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}>
          <GrNext />
        </button>

      </div>
    </>
  );
}
