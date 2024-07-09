'use client';

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Job } from '@/app/lib/types'; // Adjust the import path according to your project structure
import { fetchJobSearchResults } from '@/app/lib/data'; // Adjust the import path as needed
import { RiBuilding2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import Link from 'next/link';
import { GrPrevious, GrNext } from "react-icons/gr";

export default function SearchJobs() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const resultsPerPage = 10; // Assume 10 items per page, adjust accordingly

  const handleSearch = async (pageNumber: number) => {
    setLoading(true);
    try {
      const { items, count } = await fetchJobSearchResults(query, pageNumber);
      setResults(items);
      setTotalCount(count);
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      handleSearch(page - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalCount / resultsPerPage);
    if (page < totalPages) {
      handleSearch(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    handleSearch(pageNumber);
  };

  const totalPages = Math.ceil(totalCount / resultsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const firstPages = [1, 2, 3];
    const lastPages = [totalPages - 1, totalPages];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button 
            key={i} 
            className={`mx-1 px-3 py-1 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handlePageClick(i)}
            disabled={i === page}
          >
            {i}
          </button>
        );
      }
    } else {
      firstPages.forEach((num) => {
        pageNumbers.push(
          <button 
            key={num} 
            className={`mx-1 px-3 py-1 rounded ${num === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handlePageClick(num)}
            disabled={num === page}
          >
            {num}
          </button>
        );
      });

      if (page > 3 && page < totalPages - 2) {
        pageNumbers.push(<span key="dots1" className="mx-1">...</span>);
        pageNumbers.push(
          <button 
            key={page} 
            className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
            onClick={() => handlePageClick(page)}
            disabled
          >
            {page}
          </button>
        );
        pageNumbers.push(<span key="dots2" className="mx-1">...</span>);
      } else {
        pageNumbers.push(<span key="dots" className="mx-1">...</span>);
      }

      lastPages.forEach((num) => {
        pageNumbers.push(
          <button 
            key={num} 
            className={`mx-1 px-3 py-1 rounded ${num === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handlePageClick(num)}
            disabled={num === page}
          >
            {num}
          </button>
        );
      });
    }

    return pageNumbers;
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => handleSearch(1)}
        >
          <BiSearch className="text-lg"/>
        </button>
      </div>
      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-4 mt-2">
            
              {results.map((job) => (
                <div key={job.id} >
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
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <button 
                className={`mx-1 px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                onClick={handlePrevious}
                disabled={page === 1}
              >
                <GrPrevious />
              </button>
              {renderPageNumbers()}
              <button 
                className={`mx-1 px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                onClick={handleNext}
                disabled={page === totalPages}
              >
                <GrNext />
              </button>
            </div>
          </>
          
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
