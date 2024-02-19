import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";


interface props {
  userId: string;
  clerkId?:string | null;
  searchParams: {
    page: number;
  }
}
const QuestionTab = async  ({searchParams, clerkId, userId}:props) => {
  const result = await getUserQuestions({
     userId, page: searchParams.page ? +searchParams.page : 1
  })
 
  return (
    <>
      {result.questions.map((question:any) => (
         <QuestionCard 
         key={question.id}
         id={question.id}
         clerkId={question.author.clerkId}
         views={question.views}
         title={question.title}
         upvotes={question.upvotes.length}
         tags={question.tags}
         author={question.author}
         answers={question.answers}
         createdAt={question.createdAt}
         
         />
      ))}
      <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} isNext={result?.isNext} />
    </>
  )
}

export default QuestionTab