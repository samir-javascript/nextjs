import { getQuestionAnswers } from '@/lib/actions/answer.actions';
import React from 'react'
import Filter from './shared/filters/Filter';
import { AnswerFilters } from '@/constants/filter';
import Link from 'next/link';
import Image from 'next/image';
import { getTimesTamp } from '@/lib/utils';
import ParseHtml from './shared/ParseHtml';
import Votes from './shared/Votes';
import Pagination from './shared/Pagination';
interface props {
     questionId: string;
     authorId: string;
     totalAnswers: number;
     page?: number;
     filter?: string;
}
const AllAnswers =async ({authorId, questionId, totalAnswers, page, filter}:props) => {
    const result = await getQuestionAnswers({questionId, page: page ? +page : 1, sortBy: filter})
    
  return (
    <div className='mt-11'>
         <div className='flex justify-between items-center'>
             <h3 className='primary-text-gradient'>
                 {totalAnswers} {totalAnswers > 1 ? "Answers" : "Answer"} 
             </h3>
             <Filter filters={AnswerFilters} />
         </div>
         <div>
             {result.answers.map((answer:any) => (
                 <article className='light-border py-10 border-b' key={answer._id}>
                     <div className='flex items-center justify-between'>
                         <div className='flex mb-8 w-full
                          flex-col-reverse justify-between gap-5 sm:flex-row sm:gap-2 sm:items-center'>
                             <Link className='flex sm:items-center flex-start flex-1 gap-1 ' href={`/profile/${answer.author.clerkId}`}>
                                 <Image src={answer.author.picture} alt='profile picture' width={18} height={18} 
                                 className='rounded-full object-cover max-sm:mt-0.5'  />
                                 <div className='flex sm:flex-row flex-col sm:items-center'>
                                     <p className='body-semibold text-dark300_light700 mr-1'>
                                         {answer.author.name}
                                     </p>
                                     <p className='line-clamp-1  mt-0.5 small-regular text-dark400_light700 '><span className='max-sm:hidden'> {" "}  -</span> Answered {getTimesTamp(answer.createdAt)} </p>
                                 </div>
                             </Link>
                             <div className="flex justify-end">
                                 <Votes 
                                  type='answer'
                                  itemId={answer._id}
                                  downvotes={answer.downvotes.length}
                                  upvotes={answer.upvotes.length}
                                  userId={authorId}
                                  hasUpvoted={answer.upvotes.includes(authorId)}
                                  hasDownvoted={answer.downvotes.includes(authorId)}
                                  hasSaved={false}
                                 />
                             </div>
                         </div>
                     </div>
                     <ParseHtml data={answer.content} />
                 </article>
             ))}
         </div>
         <div className="mt-10 w-full">
             <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
         </div>
    </div>
  )
}

export default AllAnswers