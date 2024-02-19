import UserCard from "@/components/cards/UserCard"
import Pagination from "@/components/shared/Pagination"
import Filter from "@/components/shared/filters/Filter"
import LocalSearchBar from "@/components/shared/search/LocalSearchBar"

import { UserFilters } from "@/constants/filter"
import { getAllUsers } from "@/lib/actions/user.action"
import { SearchParamsProps } from "@/types"
import { Metadata } from "next"
import Link from "next/link"

export const metadata:Metadata = {
  title: 'Devflow | Community',
  description: "Q&A community for programmers, solving coding challenges, sharing knowledge.",
}

const page =async ({searchParams}: SearchParamsProps) => {
   
    const result = await getAllUsers({
       searchQuery: searchParams.q,
       filter:searchParams.filter,
       page: searchParams.page ? +searchParams.page : 1
    })
    console.log('ALL USERS ARE HERE', result)
  return (
    <>
    
    <h1 className="capitalize text-dark200_light900 h1-bold">
      all users
    </h1>
    
  

  <div
    className="mt-11 flex justify-between gap-5 sm:items-center
     max-sm:flex-col
  "
  >
    <LocalSearchBar
      placeholder="search for amazing minds"
      imgSrc="/assets/icons/search.svg"
      iconPosition="left"
      otherClasses="flex-1"
      route="/community"
    />
    <Filter
     
      otherClasses={"min-h-[56px] sm:min-w-[170px]"}
      filters={UserFilters}
    />
     </div>
     <section className="flex mt-12 flex-wrap gap-4 ">
     {result?.users.length! > 0 ? (
    result?.users.map((user:any) => (
        <UserCard key={user._id} user={user} />  
    ))
) : (
    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center ">
        <p>No users yet</p>
        <Link className="text-accent-blue font-bold mt-2" href='/sign-up'>
           join to be the first!
        </Link>
    </div>
      )}

     </section>
     <div className="mt-10">
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} isNext={result?.isNext} />
     </div>
    
     </>
  )
}

export default page