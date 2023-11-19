"use client";

import { Button } from "@/components/ui/button";


interface props {
  filters: {
    name: string;
    value: string;
  }[];
}
export default function HomeFilter({ filters }: props) {
  const active = "newest";
  return (
    <div className={`hidden  max-sm:flex gap-3 flex-wrap  mt-10`}>
      {filters?.map((filter) => (
        <Button
          onClick={() => {}}
          className={`px-6 py-3 rounded-lg  body-medium capitalize shadow-none
           bg-light-800 text-light-500 ${
             active === filter.value && "bg-primary-100 text-primary-500"
           }
          }`}
          key={filter.value}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}