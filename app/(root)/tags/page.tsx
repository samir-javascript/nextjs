import NoResult from "@/components/NoResult"
import Pagination from "@/components/shared/Pagination"
import Filter from "@/components/shared/filters/Filter"
import LocalSearchBar from "@/components/shared/search/LocalSearchBar"
import { TagFilters } from "@/constants/filter"
import { getAllTags } from "@/lib/actions/tags.actions"
import { SearchParamsProps } from "@/types"

import Link from "next/link"
import Loading from "./loading"
import { Metadata } from "next"
export const metadata:Metadata = {
   title: 'Devflow | Tags',
   description: "Q&A community for programmers, solving coding challenges, sharing knowledge.",
}

const page = async ({searchParams}:SearchParamsProps) => {
 
    const result = await getAllTags({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1
    })
  return (
    <>
        <h1 className="capitalize text-dark200_light900 h1-bold">
     Tags
    </h1>
    
  

  <div
    className="mt-11 flex justify-between gap-5 sm:items-center
     max-sm:flex-col
  "
  >
    <LocalSearchBar
      placeholder="search by tag name... "
      imgSrc="/assets/icons/search.svg"
      iconPosition="left"
      otherClasses="flex-1"
      route="/tags"
    />
    <Filter
     
      otherClasses={"min-h-[56px] sm:min-w-[170px]"}
      filters={TagFilters}
    />
     </div>
     <section className="flex mt-12 flex-wrap gap-4 ">
     {result?.tags.length! > 0 ? (
    result?.tags.map((tag:any) => (
       <Link key={tag._id} href={`/tags/${tag._id}`} className="shadow-light100_darknone ">
         <article className="background-light900_dark200 light-border
             flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px] ">
               <div className="w-fit background-light800_dark400 rounded-sm px-5 py-1.5">
                       <p className="text-dark300_light900 paragraph-semibold ">{tag.name} </p>
               </div>
               <p className="small-medium text-dark400_light500 mt-3.5 ">
                  <span className="body-semibold mr-2.5 primary-text-gradient ">
                     {tag.questions.length}+
                  </span> Questions
               </p>
         </article>
       </Link>
    ))
) : (
   <NoResult 
   link="/ask-question"
    paragraph='It looks like there are no tags available at the moment. 😕 Be a trendsetter by asking a question and creating a tag that best represents your topic of interest. 🚀'
     title="No tags Found"
     textButton='Ask a question' 
     
    />
      )}

     </section>
     <div className="mt-10">
        <Pagination pageNumber={searchParams.page ? +searchParams.page  : 1} isNext={result.isNext} />
     </div>
    </>
  )
}

export default page