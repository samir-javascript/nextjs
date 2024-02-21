"use client";
import Image from "next/image";
import { useState , useEffect  } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
interface CustomInputProps {
  placeholder: string;
  imgSrc: string;
  otherClasses?: string;
  route: string;
  iconPosition: string;
  
}
export default function LocalSearchBar({
  placeholder,
  imgSrc,
  otherClasses,
  route,
  
  iconPosition,
}: CustomInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  
  const [search , setSearch] = useState(query || '')
  useEffect(() => {
      const delayDebounceFn = setTimeout(()=> {
           if(search) {
              const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'q',
                value: search
              })
              router.push(newUrl, {scroll: false})
           }else {
             if(pathname === route)  {
                const newUrl = removeKeysFromQuery({
                  params: searchParams.toString(),
                  keysToRemove: ['q']
                })
                router.push(newUrl, {scroll: false})
             }
           }
      },500)
      return ()=> clearTimeout(delayDebounceFn)
  }, [router, search, pathname, route, query, searchParams])
  
  return (
    <Link href={route}>
      <div
        className={`background-light800_darkgradient flex min-h-[56px]    px-4 rounded-[10px]
       gap-4 items-center grow ${otherClasses}
    `}
      >
        <Image
          src={imgSrc}
          alt="search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none shadow-none no-focus text-dark400_light700  outline-none
                 placeholder paragraph-regular bg-transparent 
                 
             "
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            width={20}
            height={20}
            alt="search-icon"
            className="cursor-pointer"
          />
        )}
      </div>
    </Link>
  );
}