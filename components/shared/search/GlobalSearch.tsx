"use client"
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function GlobalSearchBar() {
  const [query,setQuery] = useState('')
  return (
    <div className="reletive w-full max-w-[600px] max-lg:hidden">
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
          className="placeholder shadow-none no-focus outline-none border-none 
                          paragraph-regular background-light800_darkgradient
                     "
          type="text"
          placeholder="search Globally"
          value={query}
          onChange={(e)=> e.target.value}
        />
      </div>
    </div>
  );
}
