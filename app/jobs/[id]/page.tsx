'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useFetchJob } from '@/app/lib/data'; // Ensure correct path to your data file

const JobDetail: React.FC = () => {
  const params = useParams() as { id: string }; // Explicitly typing params to include id as a string
  const { id } = params;

  const { job, loading, error } = useFetchJob(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  if (!job) return <div>No job found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{job.name}</h1>
      <div className="text-base font-medium">Company: {job.company.name}</div>
      <div className="text-base font-medium">Location: {job.location.name}</div>
      <div className="text-base font-medium">Posted: {job.posted}</div>
      {/* Add more details as needed */}
    </div>
  );
};

export default React.memo(JobDetail);
