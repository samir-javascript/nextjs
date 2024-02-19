import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface props {
   clerkId?:string | null;
   userId: string;
   searchParams: {
    page: number;
   }
 }

const AnswerTab = async({clerkId, searchParams, userId}:props) => {
  const result = await getUserAnswers({userId, page: searchParams.page ? +searchParams.page : 1})
  console.log('USER ANSWERS', result)
  return (
    <>
         {result.answers.map((item:any) => (
           <AnswerCard  
             key={item._id}
             _id={item._id}
             clerkId={clerkId}
             author={item.author}
             question={item.question}
             upvotes={item.upvotes}
             downvotes={item.downvotes}
             createdAt={item.createdAt}
           />
         ))}
         <Pagination pageNumber={searchParams.page ? +searchParams.page  : 1} isNext={result.isNext} />
    </>
  )
}

export default AnswerTab