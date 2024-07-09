'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useFetchJobId } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const JobDetail: React.FC = () => {
  const { id } = useParams() as { id: string }; // Explicitly typing params to include id as a string

  const { job, loading, error } = useFetchJobId(id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    if (job?.image_url) {
      setImageUrl(cleanImageUrl(job.image_url));
    }
  }, [job]);

  const cleanImageUrl = (url: string): string | null => {
    try {
      const cleanedUrl = url.replace(/<[^>]*>?/gm, '');
      return cleanedUrl.startsWith('http://') || cleanedUrl.startsWith('https://') ? cleanedUrl : null;
    } catch {
      return null;
    }
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load job details</div>;
  if (!job) return <div>No job found</div>;

  return (
    <>
      <div className="p-6 rounded-md bg-gray-50">
        <h1 className="text-base md:text-lg font-medium">{job.name}</h1>
        <div className="text-sm md:text-base font-medium">Company: {job.company.name}</div>
        <div className="text-sm md:text-base font-medium">Location: {job.location.name}</div>
      </div>

      {imageUrl ? (
        <div className='md:p-6 p-1 mt-3 rounded-md bg-gray-50'>
          <Link href={imageUrl}>
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
