'use client';
import { RiBuilding2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFetchJobs } from '@/app/lib/data'; // Import the custom hook

export default function Jobs() {
  const { jobs, hasMore, fetchJobs } = useFetchJobs();

  return (
    <InfiniteScroll
      dataLength={jobs.length} // This is important field to render the next data
      next={fetchJobs} // Function to call for more data
      hasMore={hasMore} // Whether there are more items to load
      loader={<h4>Loading...</h4>} // Loading indicator
      endMessage={<p>No more jobs to load</p>} // Message when all jobs have been loaded
      className="grid md:grid-cols-4 gap-4 mt-2"
    >
      {jobs.map((job, index) => (
        <div key={`${job.id}-${index}`} className="rounded-md bg-gray-50 p-3 hover:bg-sky-100 hover:text-blue-600">
          <div className="text-base md:text-lg font-medium">{job.name}</div>
          <div className="flex items-center text-sm pt-1"> 
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
      ))}
    </InfiniteScroll>
  );
}
