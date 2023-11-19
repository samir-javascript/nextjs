"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";

interface props {
  otherClasses?: string;
  containerClasses?: string;
  filters: {
    name: string;
    value: string;
  }[];
}
export default function Filter({
  otherClasses,
  containerClasses,
  filters,
}: props) {
  
  return (
    <div className={`${containerClasses} relative`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} body-regular background-light800_dark300 border
           light-border px-5 py-2.5 text-dark500_light700
        `}
        >
          <div className="flex-1 line-clamp-1 ">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters?.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}