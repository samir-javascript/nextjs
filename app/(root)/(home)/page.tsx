
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import Pagination from "@/components/shared/Pagination";
import Filter from "@/components/shared/filters/Filter";
import HomeFilter from "@/components/shared/filters/HomeFilter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import { getQuestions, getRecommendedQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";

import Link from "next/link";
import { auth } from "@clerk/nextjs";


export default async function page({searchParams}:SearchParamsProps) {
  const { userId } = auth()
  let result;
  
if(searchParams?.filter === 'recommended') {
  if(userId) {
     result =  await getRecommendedQuestions({
      searchQuery: searchParams.q,
      userId,
      page: searchParams.page ? +searchParams.page : 1
    })
  }else {
     result = {
      questions: [],
      isNext: false
     }
  }
 
}else {
   result =  await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1
  })
}
 
   console.log('QUESTIONS ARE HERE',result)
  
  
  return (
    <>
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

      <div
        className="mt-11 w-full flex justify-between gap-5 sm:items-center
         max-sm:flex-col
      "
      >
        <LocalSearchBar
          placeholder="search for questions"
          imgSrc="/assets/icons/search.svg"
          iconPosition="left"
          otherClasses="flex-1"
          route="/"
        />
        <Filter
          containerClasses={"hidden sm:flex"}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
          filters={HomePageFilters}
        />
         </div>
        <HomeFilter filters={HomePageFilters} />
     

      <div className="mt-10 w-full flex flex-col gap-6">
        {result?.questions.length! > 0 ? (
          result?.questions?.map((question:any) => (
            <QuestionCard
              key={question._id}
              id={question._id}
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
            title="There are no question to show"
            paragraph="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. 
              our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            textButton="ask a question"
          />
        )}
      </div>
      <div className="mt-10">
          <Pagination isNext={result?.isNext} pageNumber={searchParams.page ? +searchParams.page : 1} />
      </div>
    </>
  );
}
