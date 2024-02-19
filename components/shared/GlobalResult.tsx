"use client"
import { useState , useEffect } from 'react'
import TypeFilters from './filters/TypeFilters'
import {ReloadIcon }from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { globalSearch } from '@/lib/actions/question.action'

const GlobalResult = () => {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [result,setResult] = useState([])
    const global = searchParams.get('global')
    const type = searchParams.get('type')
    useEffect(() => {
        const fetchResult = async()=> {
             setResult([])
             setIsLoading(true)
             try {
                 const res = await globalSearch({
                    query: global,
                    type
                 })
                 setResult(JSON.parse(res))
                 setIsLoading(false)
             } catch (error) {
                 console.log(error)
                 throw error;
             }finally {
                setIsLoading(false)
             }
        }
        if(global) {
            fetchResult()
        }
    }, [global,type])
    const renderLink = (type:string, id:string) => {
    
        
        switch (type) {
            case 'question':
                return `/question/${id}`;
                
            case 'user':
                return `/profile/${id}`;
            case 'answer':
                    return `/profile/${id}`;    
            case 'tag':
                return `/tags/${id}`;
                
            default:
              return  "/"
                
        }
    };
    console.log('RESULT ARRAY', result)
   
  return (
    <div className='absolute top-full w-full mt-3 rounded-xl
     z-10 bg-light-800 shadow-sm py-5 dark:bg-dark-400 '>
        <TypeFilters />
         <div className='my-5 border-b h-[1px] dark:bg-dark-500/50 bg-light-700/50 ' />
         <div className='space-y-5'>
             <p className='text-dark400_light900 px-5 paragraph-semibold'>
                Top match
             </p>
             { isLoading ? (
                <div className='flex-center flex-col px-5'>
                     <ReloadIcon  className='w-10 h-10 my-2 text-primary-500 animate-spin '/>
                     <p className='text-dark200_light800 body-regular'>Browsing the entire database </p>
                </div>
             ): (
                 <div className='flex flex-col gap-2'>
                     {result.length > 0 ? 
                       result.map((item:any,index:number)=> (
                         <Link className='px-5 flex items-start gap-3 cursor-pointer w-full
                          py-2.5 hover:bg-light-700/50
                           hover:dark:bg-dark-500/50' key={item.id + item.type + index}
                            href={renderLink(item.type,item.id)}>
                               
                               <Image className='invert-colors object-contain'
                                src='/assets/icons/tag.svg' alt='tag icon'
                                 width={18} height={18} />
                               <div className='flex flex-col'>
                                  <p className='body-medium line-clamp-1 text-dark200_light800'>
                                     {item.title}
                                  </p>
                                  <p className='text-dark400_light500 font-bold small-medium mt-1 capitalize'>
                                     {item.type}
                                  </p>
                               </div>
                         </Link>
                       ))
                     : ( 
                        <div className='flex-center flex-col gap-2'>
                            <p className='text-dark200_light800 body-regular px-5 py-2.5'>Oops, no results found</p>
                        </div>
                     )}
                 </div>
             )}
         </div>
    </div>
  )
}

export default GlobalResult