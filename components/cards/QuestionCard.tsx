import Link from "next/link";
import React from "react";
import RenderTags from "../shared/RenderTags";
import { formatAndDivideNumber, getTimesTamp } from "@/lib/utils";
import Metric from "../shared/Metric";
import { SignedIn, auth } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";


interface CustomQuestionProps {
  id: string; // id of each individual question
  views: number;
  title: string;
  upvotes: number;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    name: string;
    _id: string;
    picture: string;
    clerkId: string;
  };
  createdAt: Date;
  clerkId?:string;
  answers: Array<object>;
}
export default function QuestionCard({
 
  id,
  views,
  title,
  upvotes,
  tags,
  author,
  createdAt,
  answers,
}: CustomQuestionProps) {
 const { userId: clerkId } = auth()
  const showActionButtons = clerkId && clerkId === author.clerkId;
  console.log('CLERK ID' , clerkId)
  console.log('AUTHOR ID', author.clerkId)
 
  return (
    <div className="card-wrapper p-9 sm:px-11  rounded-[10px]">
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
          <Link href={`/question/${id}`}>
            <h3
              className="base-semibold sm:h3-semibold text-dark200_light900 line-clamp-1
                flex-1
            "
            >
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
           {showActionButtons &&  (
               <EditDeleteAction type='question' itemId={id} />
           )} 
        </SignedIn>
      </div>
      {/*  if signed in crud operation*/}
      <div className="flex flex-wrap mt-3.5 gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
      <div className="flex-between flex-wrap w-full mt-6 gap-3">
        <Metric
          imgUrl={author?.picture}
          alt="avatar"
          value={author?.name}
          href={`/profile/${author?.clerkId}`}
          isAuthor
          title={`- asked ${getTimesTamp(createdAt)} `}
          textStyles="text-dark400_light700 bodyl-medium"
        />
        <div className="flex gap-3 items-center max-sm:flex-wrap max-sm:items-start">
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="vote"
          value={formatAndDivideNumber(upvotes)}
          title="votes"
          textStyles="text-dark400_light900 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="messages"
          value={answers.length}
          title="answers"
          textStyles="text-dark400_light900 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title="views"
          textStyles="text-dark400_light900 small-medium"
        />
        </div>
        
      </div>
    </div>
  );
}