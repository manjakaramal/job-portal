'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useFetchJobId } from '@/app/lib/data'; // Ensure correct path to your data file
import Image from 'next/image';

const JobDetail: React.FC = () => {
  const params = useParams() as { id: string }; // Explicitly typing params to include id as a string
  const { id } = params;

  const { job, loading, error } = useFetchJobId(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  if (!job) return <div>No job found</div>;

  return (
    <>
      <div className="p-6 rounded-md bg-gray-50">
        <h1 className="text-base md:text-lg font-medium">{job.name}</h1>
        <div className="text-sm md:text-base font-medium">Company: {job.company.name}</div>
        <div className="text-sm md:text-base font-medium">Location: {job.location.name}</div>
      </div>

      <div className='p-6 mt-3 rounded-md bg-gray-50'>
        <Image
          src={job.image_url || "https://i.ibb.co/S0jmJ9h/digital-marketing.png"}
          width={1000}
          height={1000}
          className="w-full h-full"
          alt={`Image for ${job.name}`}
          loading="lazy"
        />
      </div>
    </>
    
    
  );
};

export default React.memo(JobDetail);
