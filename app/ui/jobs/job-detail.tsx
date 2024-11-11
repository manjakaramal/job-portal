'use client';

import { useState } from 'react';
import { useFetchJobId } from '@/app/lib/data';
import { useParams } from 'next/navigation'; // Use `useParams` from `next/navigation`
import Image from 'next/image';
import Link from 'next/link';

export default function JobDetail() {
  const { id } = useParams(); // Fetch the job ID from the URL parameters
  const { job, error, isLoading } = useFetchJobId(Number(id)); // Pass the job ID as a number

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  }

  if (isLoading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div>Error loading job details: {error.message}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <>
      <div className="md:p-6 p-2 rounded-md bg-gray-50">
        <h1 className="text-base md:text-lg font-medium">{job.name}</h1>
        <div className="text-sm md:text-base">Company: {job.company?.name ?? 'Unknown Company'}</div>
        <div className="text-xs md:text-base">Location: {job.location?.name ?? 'Unknown Location'}</div>
      </div>

      {job.image_url && ( // Conditionally render the image section
        <div className='md:px-13rem md:py-10 p-1 mt-3 rounded-md flex justify-center bg-gray-50'>
          <Link href={`/jobs/${job.id}/imageurl`}>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
              </div>
            )}
            <Image
              src={job.image_url}
              width={1000}
              height={1000}
              className={`w-full h-full ${imageLoading ? 'invisible' : 'visible'}`}
              alt={`Image for ${job.name}`}
              priority
              onLoad={handleImageLoad} 
            />
          </Link>
        </div>
      )}
    </>
  );
}
