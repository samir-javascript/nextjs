"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button"
import { formUrlQuery } from "@/lib/utils";
interface props {
  pageNumber: number;
  isNext?: boolean
}

const Pagination = ({pageNumber , isNext }:props) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleNavigation = (direction:string)=> {
        const nextPageNumber = direction === 'prev' ? pageNumber - 1 : pageNumber + 1;
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'page',
            value: nextPageNumber.toString()
        })
        router.push(newUrl)
    }
  return (
    <div className="w-full flex items-center justify-center gap-2">
       <Button disabled={pageNumber === 1} onClick={()=> handleNavigation('prev')} className="light-border-2 btn flex items-center justify-center border gap-2 min-h-[36px] ">
           <p className="body-medium text-dark200_light800 ">Prev</p>
       </Button>
       <div className="bg-primary-500 px-3.5 py-2 flex justify-center items-center rounded-md ">
          <p className="body-semibold text-light-900">
             {pageNumber}
          </p>
       </div>
       <Button disabled={!isNext} onClick={()=> handleNavigation('next')} className="light-border-2 btn flex items-center justify-center border gap-2 min-h-[36px] ">
           <p className="body-medium text-dark200_light800 ">Next</p>
       </Button>
    </div>
    
  )
}

export default Pagination