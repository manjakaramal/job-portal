'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useFetchJobId } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const JobDetail: React.FC = () => {
  const { id } = useParams() as { id: string }; // Explicitly typing params to include id as a string

  const { job, loading, error } = useFetchJobId(id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Function to clean image URL, memoized with useCallback
  const cleanImageUrl = useCallback((url: string): string | null => {
    try {
      const cleanedUrl = url.replace(/<[^>]*>?/gm, '');
      return cleanedUrl.startsWith('http://') || cleanedUrl.startsWith('https://') ? cleanedUrl : null;
    } catch {
      return null;
    }
  }, []);

  // Effect to set image URL when job data changes
  useEffect(() => {
    if (job?.image_url) {
      setImageUrl(cleanImageUrl(job.image_url));
    }
  }, [job, cleanImageUrl]);

  // Handle image loading error
  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

  // Return loading, error, or no job found states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load job details</div>;
  if (!job) return <div>No job found</div>;

  // Return job details and image
  return (
    <>
      <div className="md:p-6 p-2 rounded-md bg-gray-50">
        <h1 className="text-base md:text-lg font-medium">{job.name}</h1>
        <div className="text-sm md:text-base">Company: {job.company.name}</div>
        <div className="text-xs md:text-base">Location: {job.location.name}</div>
      </div>

      {imageUrl ? (
        <div className='md:p-10 p-1 mt-3 rounded-md flex justify-center bg-gray-50 '>
          <Link href={`/jobs/${job.id}/imageurl`}>
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              className="w-full h-full"
              alt={`Image for ${job.name}`}
              priority
              onError={handleImageError}
            />
          </Link>
          {imageLoadError && (
            <div className="text-red-500 mt-2">Failed to load image</div>
          )}
        </div>
      ) : (
        <div className='md:p-6 p-1 mt-3 rounded-md bg-gray-50'>
          <div className="text-red-500">Invalid image URL format</div>
        </div>
      )}
    </>
  );
};

export default React.memo(JobDetail);
