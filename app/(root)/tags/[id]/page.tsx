import NoResult from '@/components/NoResult'
import QuestionCard from '@/components/cards/QuestionCard'
import Pagination from '@/components/shared/Pagination'
import Filter from '@/components/shared/filters/Filter'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { QuestionFilters } from '@/constants/filter'
import { getQuestionsByTagId } from '@/lib/actions/tags.actions'
import { URLProps } from '@/types'
import React from 'react'

export async function generateMetadata({ params, searchParams }:URLProps) {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
})
    return {
      title: ` Devflow | ${result?.tagTitle}`,
      description:  "Q&A community for programmers, solving coding challenges, sharing knowledge.",
    }
  }
const page = async ({params, searchParams}:URLProps) => {

  const result = await getQuestionsByTagId({
      tagId: params.id,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q
  })
  
  return (
    <div>
      <h1 className="capitalize text-dark200_light900 h1-bold">
      {result?.tagTitle}
    </h1>
    
  

  <div
    className="mt-11 flex justify-between gap-5 sm:items-center
     max-sm:flex-col
  "
  >
    <LocalSearchBar
      placeholder="search for tag questions"
      imgSrc="/assets/icons/search.svg"
      iconPosition="left"
      otherClasses="flex-1"
      route={`/tags/${params.id}`}
    />
    <Filter
     
      otherClasses={"min-h-[56px] sm:min-w-[170px]"}
      filters={QuestionFilters}
    />
     </div>
     <div className="mt-10 w-full flex flex-col gap-6">
        {result?.questions.length > 0 ? (
          result?.questions.map((question:any) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              views={question.views}
              title={question.title}
              upvotes={question.upvotes.length}
              tags={question.tags}
              author={question.author}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no questions to show"
            paragraph="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. 
              our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            textButton="ask a question"
          />
        )}
      </div>
      <div className="mt-10">
         <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} isNext={result?.isNext} />
      </div>
     </div>
  )
}

export default page