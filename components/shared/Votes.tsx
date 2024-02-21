"use client"
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.actions';

import { downvoteQuestion, toggleSaveQuestion, upvoteQuestion, viewQuestion } from '@/lib/actions/question.action';
import { useToast } from '../ui/use-toast';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, {useEffect} from 'react'
interface props {
    type: string;
    itemId: string;
    downvotes: number;
    upvotes: number;
    hasDownvoted: boolean;
    hasUpvoted: boolean;
    hasSaved: boolean;
    userId: string;
}

const Votes = ({type, itemId, downvotes, upvotes, hasDownvoted, hasUpvoted, hasSaved, userId}:props) => {
    console.log('USER ID', userId )
    const router  = useRouter()
    console.log('QUESTION id' , itemId)
    const pathname = usePathname()
    const { toast } = useToast()
    const handleVote = async (action: string) => {
       
    
        if (action === 'upvote') {
            if (type === 'question') {
                await upvoteQuestion({
                    path: pathname,
                    userId,
                    questionId:itemId,
                    hasdownVoted: hasDownvoted,
                    hasupVoted: hasUpvoted
                });
                return toast({
                    title: 'upvote successful',
                    description: 'you have upvoted this question successfuly'
                })
            } else if (type === 'answer') {
                await upvoteAnswer({
                    path: pathname,
                    userId,
                    answerId: itemId,
                    hasdownVoted: hasDownvoted,
                    hasupVoted: hasUpvoted
                });
                return toast({
                    title: 'upvote successful',
                    description: 'you have upvoted this answer successfuly'
                })
            }
        } else if (action === 'downvote') {
            if (type === 'question') {
                await downvoteQuestion({
                    path: pathname,
                    userId,
                    questionId: itemId,
                    hasdownVoted: hasDownvoted,
                    hasupVoted: hasUpvoted
                });
                return toast({
                    title: 'downvote successful',
                    description: 'you have downvoted this question successfuly',
                    variant:"destructive"
                })
            } else if (type === 'answer') {
                await downvoteAnswer({
                    path: pathname,
                    userId,
                    answerId: itemId,
                    hasdownVoted: hasDownvoted,
                    hasupVoted: hasUpvoted
                });
                return toast({
                    title: 'downvote successful',
                    description: 'you have downvoted this anwser successfuly',
                    variant: "destructive"
                })
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (itemId) {
                    await viewQuestion({
                        questionId: itemId,
                        userId: userId || undefined,
                    });
                }
            } catch (error) {
                console.error('Error in useEffect:', error);
            }
        };
    
        fetchData();
    }, [itemId, userId, pathname, router]);
    
    
    
   
    const handleSave = async () => {
        try {
           
            await toggleSaveQuestion({
                userId,
                questionId: itemId,
                path: pathname
            });
            return toast({
                title: hasSaved ? 'question removed from your collection' : 'question saved in your collection' ,
                variant: hasSaved ? "destructive" : 'default' 
            })
        } catch (error) {
            console.error('Error toggling save:', error);
        }
    };
      
  return (
    <div className='flex gap-5'>
       <div className='flex-center gap-2.5'>
           <div className='flex-center gap-1.5'>
                 <Image onClick={()=> handleVote('upvote')} alt='upvote icon' width={18} height={18} 
                  className='cursor-pointer'
                 src={hasUpvoted ? '/assets/icons/upvoted.svg' : "/assets/icons/upvote.svg"} />
                 <div className="flex-center min-w-[18px] p-1 rounded-sm background-light700_dark400 ">
                       <p className='text-dark400_light900 subtle-medium'>
                            {upvotes}
                       </p>
                 </div>
           </div>
       </div>
       <div className='flex-center gap-2.5'>
           <div className='flex-center gap-1.5'>
                 <Image onClick={()=> handleVote('downvote')} alt='downvote icon' width={18} height={18} 
                  className='cursor-pointer'
                 src={hasDownvoted ? '/assets/icons/downvoted.svg' : "/assets/icons/downvote.svg"} />
                 <div className="flex-center min-w-[18px] p-1 rounded-sm background-light700_dark400 ">
                       <p className='text-dark400_light900 subtle-medium'>
                            {downvotes}
                       </p>
                 </div>
           </div>
       </div>
       {type === 'question' && (
         <Image onClick={handleSave} alt='star icon' width={18} height={18} 
             className='cursor-pointer'
             src={hasSaved ? '/assets/icons/star-filled.svg' : "/assets/icons/star-red.svg"} />
       )}
      
    </div>
  )
}

export default Votes