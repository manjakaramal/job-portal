// jobs.tsx
'use client';

import React from 'react';
import { RiBuilding2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFetchCategoryIdJobs } from '@/app/lib/data';
import { Job } from '@/app/lib/types'; // Ensure correct path to your types
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface JobsProps {
  selectedSubCategory: number | null;
}

const JobItem: React.FC<{ job: Job }> = React.memo(({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="rounded-md bg-gray-50 h-full p-3 hover:bg-sky-100 hover:text-blue-600">
        <div className="text-base md:text-lg font-medium">{job.name}</div>
        <div className="flex items-center text-sm md:text-base pt-1">
          <RiBuilding2Line className="inline-block mr-1" />
          {job.company.name}
        </div>
        <div className="flex items-center text-xs pt-1">
          <IoLocationOutline className="inline-block mr-1" />
          {job.location.name}
        </div>
        <div className="flex items-center text-xs pt-2">
          <CiCalendarDate className="inline-block mr-1" />
          {job.posted}
        </div>
      </div>
    </Link>
  );
});

JobItem.displayName = 'JobItem';

const Jobs: React.FC<JobsProps> = ({ selectedSubCategory }) => {
  const { id } = useParams() as { id: string };
  const { jobs, loading, error } = useFetchCategoryIdJobs(id, selectedSubCategory);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load jobs</div>;

  return (
    <InfiniteScroll
      dataLength={jobs.length}
      next={() => {}} // Implement fetchJobs for infinite scroll if needed
      hasMore={false} // Set true if there's more data to load
      loader={<h4>Loading...</h4>}
      endMessage={<p className='text-center'>No more jobs to load</p>}
      className="grid md:grid-cols-3 gap-4 mt-2"
    >
      {jobs.map((job, index) => (
        <JobItem key={`${job.id}-${index}`} job={job} />
      ))}
    </InfiniteScroll>
  );
};

export default Jobs;