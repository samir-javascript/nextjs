import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section>
    
         <h1 className="capitalize text-dark200_light900 h1-bold">
            All Tags
        </h1>
        <div className="mt-11 mb-12 flex justify-between gap-5 sm:items-center
     max-sm:flex-col
  ">
             <Skeleton className="h-14 flex-1 " />
    
               <Skeleton className="h-14 sm:w-28 w-full " />
     
        </div>
        <div className="flex  flex-wrap gap-6">
            {[1,2,3,4,5,6,7,8,9,10].map(item => (
                 <Skeleton key={item}  className="h-60 w-full sm:w-[260px] rounded-2xl " />
            ))}
        </div>
    </section>
  )
}

export default Loading