"use client"
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface props {
  filters: {
    name: string;
    value: string;
  }[];
}

export default function HomeFilter({ filters }: props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className={`hidden  max-sm:flex gap-3 flex-wrap  mt-10`}>
      {filters?.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={`px-6 py-3 rounded-lg  body-medium capitalize shadow-none
          background-light800_dark300 text-light-500 ${
             active === filter.value ? " !bg-black text-primary-500" : ""
           }
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}
