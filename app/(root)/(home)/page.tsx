
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/shared/QuestionCard";
import Filter from "@/components/shared/filters/Filter";
import HomeFilter from "@/components/shared/filters/HomeFilter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import { getQuestions } from "@/lib/actions/question.action";

import Link from "next/link";


export default async function page() {
 
  const result = await getQuestions({})
    console.log(result.questions)
  
  
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
        className="mt-11 flex justify-between gap-5 sm:items-center
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
        <HomeFilter filters={HomePageFilters} />
      </div>

      <div className="mt-10 w-full flex flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              views={question.views}
              title={question.title}
              upvotes={question.upvotes}
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
    </>
  );
}
