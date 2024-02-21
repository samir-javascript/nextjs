"use client"
import JobCard from '@/components/cards/JobCard';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';

import { SearchParamsProps } from '@/types';

import Pagination from '@/components/shared/Pagination';
import { jobsData } from '@/lib/fetchData';
interface props {
  searchParams: {
    page: number;
  }
}
export default function JobsPage({ searchParams }: props) {
 
        
const { jobs, loading } = jobsData(searchParams);
  return (
    <>
      <h1 className="capitalize text-dark200_light900 h1-bold">Jobs</h1>

      <div
    className="mt-11 flex  gap-5 
    
  "
  >
    <LocalSearchBar
      placeholder="job title, Company or Keywords..."
      imgSrc="/assets/icons/search.svg"
      iconPosition="left"
      otherClasses="flex-1"
      route="/jobs"
    />
  
     </div>

     <div className="mt-11 w-full flex flex-col gap-5">
        {jobs?.data?.length > 0 ? (
          jobs?.data?.map((item: any) => (
            <JobCard job={item} key={item.id} /> // Provide a key to each mapped element
          ))
        ) : (
          <div className='flex flex-col w-full border-b dark:border[bg-dark-500/50] border-[bg-light-700/50]'>
            <p className='text-center pb-4 body-semibold text-dark400_light800 text-base'>Oops! We couldn't find any jobs at the moment. Please try again later</p>
          </div>
        )}
      </div>
     
    </>
  );
}

