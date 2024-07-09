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

  useEffect(() => {
    // Set the body background color to black when the component mounts
    document.body.style.backgroundColor = 'black';

    // Reset the body background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Return loading, error, or no job found states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load job details</div>;
  if (!job) return <div>No job found</div>;

  // Return job details and image
  return (
    <>
      
      {imageUrl ? (
        <div className='flex justify-center items-center md:h-screen h-5/6'>
          
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            className="object-contain max-w-full max-h-full"
            alt={`Image for ${job.name}`}
            priority
            onError={handleImageError}
          />
          
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
