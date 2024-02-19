import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start">
        <div className='flex w-full flex-col items-start gap-4 lg:flex-row'>
          <Skeleton  
            className='rounded-full h-[140px] w-[140px] '  />
          <div className='mt-3 flex flex-col gap-4'>
            <Skeleton className='h-10  w-[300px]' />
            <Skeleton className='h-10 w-[300px]' />
          </div>
        </div>
        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <Skeleton className='px-4 py-4 min-w-[175px] min-h-[50px] btn-secondary text-dark300_light900 paragraph-medium' />
        </div>
      </div>

      <div className='flex flex-wrap mt-12 items-center justify-start gap-5'>
        {[1, 2, 3, 4,5,6,7,8].map(item => (
          <Skeleton key={item} className='h-32 sm:w-[200px] w-full' />
        ))}
      </div>
    </section>
  );
}

export default Loading;
