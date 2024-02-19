import AnswerTab from '@/components/shared/AnswerTab'
import ProfileLink from '@/components/shared/ProfileLink'
import QuestionTab from '@/components/shared/QuestionTab'
import Stats from '@/components/shared/Stats'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getJoinedDate } from '@/constants/constants'
import { getUserInfo } from '@/lib/actions/user.action'
import {  URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({ params }:URLProps) {
   const userInfo = await getUserInfo({userId:  params.id})
     return {
       title: ` Devflow | Profile ${userInfo.user.name} | ${userInfo.user.bio ? userInfo.user.bio : ''}`,
       description:  "Q&A community for programmers, solving coding challenges, sharing knowledge.",
     }
   }
   interface Props {
      params: {
         id: string;
      };
      searchParams: {
          page: number;
      }

   }
const page = async ({params, searchParams}:Props) => {
  
  const userInfo = await getUserInfo({userId:  params.id})
  const { userId:clerkId } = auth()
  console.log('USER INFO', userInfo)
  return (
    <>
       <div className="flex flex-col-reverse sm:flex-row justify-between items-start">
           <div className='flex flex-col items-start gap-4 lg:flex-row'>
                <Image  src={userInfo.user.picture} alt='profile picture'
                 width={140} height={140} className='rounded-full object-cover'  />
                <div className='mt-3'>
                   <h2 className='h2-bold text-dark100_light900'>{userInfo.user.name} </h2>
                   <p className='paragraph-regular text-dark200_light800' >@ {userInfo.user.username} </p>
                   <div className='flex flex-wrap mt-5 items-center justify-start gap-5'>
                   {userInfo.user.portfolioWebsite && (
                         <ProfileLink 
                          imgUrl='/assets/icons/link.svg'
                          href={userInfo.user.portfolioWebsite}
                          title='portfolio'
                         />
                      )}
                      {userInfo.user.location && (
                         <ProfileLink 
                          imgUrl='/assets/icons/location.svg'
                          title={userInfo.user.location}
                         />
                      )}
                       <ProfileLink 
                          imgUrl='/assets/icons/calendar.svg'
                          title={getJoinedDate(userInfo.user.joinedAt)}
                         />
                   </div>
                   {userInfo.user.bio && (
                       <p className='paragraph-regular mt-8 text-dark400_light800'>
                          {userInfo.user.bio}
                       </p>
                   )}
                </div>
           </div>
           <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 '>
               <SignedIn>
                    {clerkId === userInfo.user.clerkId && (
                     <Link href='/profile/edit'>
                     <Button className='whitespace-nowrap px-4 py-3
                        min-w-[175px] min-h-[46px] btn-secondary text-dark300_light900  paragraph-medium'>
                         Edit Profile
                       </Button>
                     </Link>
                       
                    )}
               </SignedIn>
           </div>
       </div>
       <Stats 
          totalQuestions={userInfo.totalQuestions}
          totalAnswers={userInfo.totalAnswers}
       />
       <div className='mt-10 flex gap-10'>
       <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className='background-light800_dark400 p-1 min-h-[42px] '>
             <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
             <TabsTrigger value="answers">Answers</TabsTrigger>
          </TabsList>
    <TabsContent className='flex flex-col gap-6  w-full' value="top-posts">
       <QuestionTab
       searchParams={searchParams}
       userId={userInfo.user._id}
       clerkId={clerkId}
    />
  </TabsContent>
  <TabsContent className='flex flex-col gap-6  w-full' value="answers">
    <AnswerTab
       searchParams={searchParams}
       userId={userInfo.user._id}
       clerkId={clerkId}
    />
  </TabsContent>
</Tabs>
       </div>
       

    </>
  )
}

export default page