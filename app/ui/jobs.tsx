'use client';
import React, { useEffect, useRef } from 'react';
import { RiBuilding2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFetchJobs } from '@/app/lib/data';
import { Job } from '@/app/lib/types';
import Link from 'next/link';

const JobItem: React.FC<{ job: Job }> = React.memo(({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
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
  );
});

JobItem.displayName = 'JobItem';

const Jobs = () => {
  const { jobs, hasMore, fetchJobs } = useFetchJobs();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('jobsScrollPosition', String(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        loaderRef.current &&
        loaderRef.current.getBoundingClientRect().top <= window.innerHeight + 100
      ) {
        fetchJobs();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchJobs]);

  useEffect(() => {
    // Restore scroll position on component mount
    const savedScrollPosition = sessionStorage.getItem('jobsScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  useEffect(() => {
    // After jobs are fetched and jobs state updates, restore scroll position
    const handleJobsUpdate = () => {
      if (jobs.length > 0) {
        const savedScrollPosition = sessionStorage.getItem('jobsScrollPosition');
        if (savedScrollPosition) {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }
      }
    };

    handleJobsUpdate();
  }, [jobs]);

  return (
    <InfiniteScroll
      dataLength={jobs.length}
      next={fetchJobs}
      hasMore={hasMore}
      loader={<div ref={loaderRef} className="text-center mt-4 mb-8">Loading...</div>}
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
