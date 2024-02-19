"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "../GlobalResult";

export default function GlobalSearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('global')
  const [search,setSearch] = useState( query || '')
  const [isOpen , setIsOpen] = useState(false)
  const searchContainerRef = useRef(null)
  useEffect(() => {
      const delayDebounceFn = setTimeout(()=> {
           if(search) {
              const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'global',
                value: search
              })
              router.push(newUrl, {scroll: false})
           }else {
             if(query)  {
                const newUrl = removeKeysFromQuery({
                  params: searchParams.toString(),
                  keysToRemove: ['global', 'type']
                })
                router.push(newUrl, {scroll: false})
             }
           }
      },500)
      return ()=> clearTimeout(delayDebounceFn)
  }, [router, search, pathname, query, searchParams])
  
  useEffect(() => {
     setIsOpen(false)
     setSearch('')
  }, [pathname])
  

  // close the globalResult everytime the users click outside of it;
  useEffect(() => {
    const handleOutSideClick = (event:any)=> {
      // @ts-ignore
       if(searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
          setIsOpen(false)
          setSearch('')
       }
    }
    document.addEventListener('click', handleOutSideClick)
    return ()=> {
       document.removeEventListener('click', handleOutSideClick)
    }
  }, [])
  
  return (
    <div ref={searchContainerRef} className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient relative flex items-center grow gap-1 
                 px-4 rounded-xl min-h-[56px]
          "
      >
        <Image
          src={"/assets/icons/search.svg"}
          width={24}
          alt="search"
          height={24}
        />
        <Input
          className="placeholder text-dark400_light700 shadow-none no-focus outline-none border-none 
                          paragraph-regular bg-transparent
                     "
          type="text"
          placeholder="search Globally"
          value={search}
          onChange={(e)=> {
             setSearch(e.target.value);
             if(!isOpen)  setIsOpen(true)
             if(e.target.value === "" && isOpen) setIsOpen(false)
          }}
        />
      </div>
      {isOpen  && <GlobalResult />}
    </div>
  );
}
