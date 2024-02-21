import { formatAndDivideNumber, getTimesTamp } from "@/lib/utils";
import Link from "next/link";
import Metric from "../shared/Metric";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface props {
     _id: string;
     createdAt: Date;
     downvotes: number[];
     upvotes: number[];
     clerkId? : string | null;
     question: {
        title: string;
        _id: string;
     }
     author: {
          _id: string;
          picture: string;
          name: string;
          clerkId: string;
     }

}

const AnswerCard = ({_id, question, author,  clerkId,  upvotes, downvotes, createdAt}:props) => {
    const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <Link href={`/question/${question?._id}`}>
     <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div
        className="flex flex-col-reverse
            justify-between items-start
             sm:flex-row gap-5"
      >
        <div>
          <span
            className="line-clamp-1 sm:hidden flex
                 subtle-regular text-dark400_light800"
          >
            {getTimesTamp(createdAt)}
          </span>
         
            <h3
              className="base-semibold sm:h3-semibold text-dark200_light900 line-clamp-1
                flex-1
            "
            >
              {question?.title}
            </h3>
         
        </div>
          <SignedIn>

             {showActionButtons && (
                 <EditDeleteAction 
                  type="answer"
                  itemId={_id}
                 />
             )}
          </SignedIn>
      </div>
      {/*  if signed in crud operation*/}
     
      <div className="flex-between flex-wrap w-full mt-6 gap-3">
        <Metric
          imgUrl={author?.picture}
          alt="avatar"
          value={author?.name}
          href={`/profile/${author?._id}`}
          isAuthor
          title={`- asked ${getTimesTamp(createdAt)} `}
          textStyles="text-dark400_light700 body1-medium"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="vote"
          value={formatAndDivideNumber(upvotes.length)}
          title="votes"
          textStyles="text-dark400_light900 small-medium"
        />
       
        
      </div>
    </div>
    </Link>
  )
}

export default AnswerCard