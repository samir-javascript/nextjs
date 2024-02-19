import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

const Loading = () => {
  return (
<section>
    <div className="flex gap-4 w-full flex-col-reverse justify-between sm:flex-row">
         <h1 className="capitalize text-dark200_light900 h1-bold">
            all questions
        </h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="py-3 px-4 primary-gradient !text-light-900 capitalize
                         min-h-[46px]
                     "
          >
             ask a question
          </Button>
        </Link>
    </div>
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