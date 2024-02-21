"use client"
import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook for fetching jobs data
export const jobsData = (searchParams:any) => {
  const [jobs, setJobs] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);

      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: searchParams.q ? searchParams.q : 'Python developer in Texas, USA',
          page: searchParams.page ? searchParams.page : '1',
          num_pages: '1',
        },
        headers: {
          'X-RapidAPI-Key': '06c1e28f84mshdeb72c4d8a32699p19bee7jsn71ab4d45722d',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500); // Adjust the delay as needed (e.g., 500 milliseconds)

    // Cleanup function to clear the timeout if the dependency changes before it's executed
    return () => clearTimeout(delayDebounceFn);
  }, [searchParams.q]);

  return { jobs, loading };
};
