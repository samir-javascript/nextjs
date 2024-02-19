
import { Skeleton } from "@/components/ui/skeleton"



const Loading = async () => {
   
  return (
<section>
  
         <Skeleton className="h-6 w-[300px] " />
            
       
        
   
     <div className="mt-11 mb-12 w-full flex flex-wrap justify-between gap-5 items-center
          
      ">
     <Skeleton className="h-14 flex-1 " />
     <div className="max-md:block hidden">
        <Skeleton className="h-14 w-28 " />
     </div>
     </div>
     <div className="hidden md:flex flex-wrap gap-6 my-6">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-40" />
     </div>
     <div className="flex flex-col gap-6">
      {[1,2,3,4,5,6,7,8,9,10].map(item => (
          <Skeleton key={item} className="w-full h-48 rounded-xl" />
      ))}
     </div>
</section> 
  )
}

export default Loading