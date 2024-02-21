"use client";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";

interface props {
  otherClasses?: string;
  containerClasses?: string;
  icon?: string;
  filters: {
    name: string;
    value: string;
  }[];
}
export default function Filter({
  otherClasses,
  containerClasses,
  filters,
  icon
}: props) {
  const searchParams = useSearchParams()
 
  const router = useRouter()
  const paramFilter = searchParams.get('filter')
   const handleUpdateFilter = (value:string)=> {
      const newUrl = formUrlQuery({
         params: searchParams.toString(),
         key:'filter',
         value: value.toLowerCase()
      })
      router.push(newUrl, {scroll: false})
   }
  
   
      
  return (
    <div className={`${containerClasses} relative`}>
      <Select onValueChange={handleUpdateFilter} defaultValue={paramFilter || undefined}>
        <SelectTrigger
          className={`${otherClasses} body-regular background-light800_dark300 border outline-none
           light-border px-5 py-2.5 text-dark500_light700
        `}
        >
          <div className="flex-1  text-left line-clamp-1 ">
           
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-light-900 dark:bg-blue-950 text-dark500_light700 border-none outline-none">
          <SelectGroup>
            {filters?.map((filter) => (
              <SelectItem 
               
              className="focus:bg-light-800 dark:focus:bg-dark-400" 
               key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}