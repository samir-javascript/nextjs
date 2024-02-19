import React from "react";
import Image from "next/image";
import Link from "next/link";
import RenderTags from "./RenderTags";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tags.actions";
export default async function RightSideBar() {
  const result = await getHotQuestions()
  const tags = await getPopularTags()
 
  return (
    <section
      className="flex flex-col space-y-[50px] pt-36 p-6 h-screen overflow-y-auto 
  background-light900_dark200 border-l light-border sticky right-0 top-0 
  lg:w-[266px] shadow-light-300 dark:shadow-none max-lg:hidden  
   scrollbar-hidden custom-scrollbar"
    >
      <div className="flex flex-col gap-6">
        <h2 className="h2-bold text-dark100_light900">Top Questions</h2>
        {result.map((item:any) => (
          <Link
            href={`/question/${item._id}`}
            key={item._id}
            className="flex-between gap-7 cursor-pointer"
          >
            <p className="text-dark100_light900 body-medium">{item.title}</p>
            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="arrow"
              className="invert-colors"
            />
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-6 ">
        <h2 className="h2-bold text-dark100_light900">Popular Tags</h2>
        {tags.map((tag:any) => (
          <RenderTags
            key={tag._id}
            name={tag.name}
            totalQuestions={tag.numberOfQuestions}
            _id={tag._id}
            showCount
          />
        ))}
      </div>
    </section>
  );
}
