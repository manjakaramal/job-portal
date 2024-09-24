'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useFetchJobId } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const JobDetail: React.FC = () => {
  const { id } = useParams() as { id: string }; // Explicitly typing params to include id as a string

  const { job, isLoading, error } = useFetchJobId (id);
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

  const [imageloading, setImageLoading] = useState(true);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoading(false); // Hide spinner when image is loaded
  };

  // Return loading, error, or no job found states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load job details</div>;
  if (!job) return <div>No job found</div>;

  // Return job details and image
  return (
    <>
      <div className="md:p-6 p-2 rounded-md bg-gray-50">
        <h1 className="text-base md:text-lg font-medium">{job.name}</h1>
        <div className="text-sm md:text-base">Company: {job.company?.name ?? 'Unknown Company'}</div>
        <div className="text-xs md:text-base">Location: {job.location?.name ?? 'Unknown Location'}</div>
      </div>

      {imageUrl && !imageLoadError && (
        <div className='md-px-13rem md:py-10 p-1 mt-3 rounded-md flex justify-center bg-gray-50'>
          <Link href={`/jobs/${job.id}/imageurl`}>
          
            {imageloading && (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
              </div>
            )}

            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              className={`{w-full h-full ${imageloading ? 'invisible' : 'visible'}}`}
              alt={`Image for ${job.name}`}
              priority
              onLoad={handleImageLoad} 
              onError={handleImageError}
            />
          </Link>
        </div>
      )}
      {imageLoadError && (
        <div className="md:p-6 p-1 mt-3 rounded-md bg-gray-50">
          <div className="text-red-500">Failed to load image</div>
        </div>
      )}
    </>
  );
};

export default React.memo(JobDetail);
