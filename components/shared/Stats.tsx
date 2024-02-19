import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
interface props {
    totalAnswers: number;
    totalQuestions:number;
}
const StatsCard = ({imgUrl, title, value}:Props)=> {
      return (
         <div className='light-border background-light900_dark300
         flex  items-center justify-evenly p-6 gap-4 border
          rounded-md shadow-light-300 dark:shadow-dark-300 '>
               <Image src={imgUrl} alt='badge icon' width={40} height={50} />
               <div>
                        <p className='text-dark200_light900 paragraph-semibold'>
                            {value}
                         </p>
                         <p className='body-medium text-dark400_light700'>
                             {title}
                         </p>
                    </div>
         </div>
      )
}
interface Props {
    imgUrl: string;
    title: string;
    value: number;

}

const Stats = ({totalAnswers, totalQuestions}:props) => {
  return (
    <div className='mt-10'>
        <h3 className='h3-semibold text-dark200_light900'>Stats</h3>
        <div className='mt-5 grid gap-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-4'>
              <div className='light-border background-light900_dark300
               flex  items-center justify-evenly p-6 gap-4 border
                rounded-md shadow-light-300 dark:shadow-dark-300 '>
                    <div>
                        <p className='text-dark200_light900 paragraph-semibold'>
                            {formatAndDivideNumber(totalQuestions)}
                         </p>
                         <p className='body-medium text-dark400_light700'>
                             Questions
                         </p>
                    </div>
                    <div>
                        <p className='text-dark200_light900 paragraph-semibold'>
                            {formatAndDivideNumber(totalAnswers)}
                         </p>
                         <p className='body-medium text-dark400_light700'>
                             Answers
                         </p>
                    </div>
              </div>
              <StatsCard 
               imgUrl="/assets/icons/gold-medal.svg"
               value={0}
               title='Gold Badges'
              />
              <StatsCard 
               imgUrl="/assets/icons/silver-medal.svg"
               value={0}
               title='Silver Badges'
              />
              <StatsCard 
               imgUrl="/assets/icons/bronze-medal.svg"
               value={0}
               title='Bronze Badges'
              />
        </div>
    </div>
  )
}

export default Stats