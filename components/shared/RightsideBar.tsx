import React from "react";
import Image from "next/image";

import Link from "next/link";
import RenderTags from "./RenderTags";
export default function RightSideBar() {
  const data = [
    {
      content:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
      content: "Can I get the course for free?",
    },
   
  ];

  const tags = [
    {
      tag: "next js",
      number: 9,
      _id: "1",
    },
    {
      tag: "html",
      number: 1,
      _id: "2",
    },
    {
      tag: "react",
      number: 7,
      _id: "3",
    },
    {
      tag: "javascript",
      number: 9,
      _id: "4",
    },
    {
      tag: "python",
      number: 10,
      _id: "5",
    },
  ];
  return (
    <section
      className="flex flex-col justify-between pt-36 p-6 h-screen overflow-y-auto 
  background-light900_dark200 border-l light-border sticky right-0 top-0 
  lg:w-[266px] shadow-light-300 dark:shadow-none max-lg:hidden  
   scrollbar-hidden custom-scrollbar"
    >
      <div className="flex flex-col gap-6">
        <h2 className="h2-bold text-dark100_light900">Top Questions</h2>
        {data.map((item) => (
          <Link
            href="/"
            key={item.content}
            className="flex-between gap-7 cursor-pointer"
          >
            <p className="text-dark100_light900 body-medium">{item.content}</p>
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

      <div className="flex flex-col gap-6 mt-16">
        <h2 className="h2-bold text-dark100_light900">Popular Tags</h2>
        {tags.map((tag) => (
          <RenderTags
            key={tag._id}
            name={tag.tag}
            totalQuestions={tag.number}
            _id={tag._id}
            showCount
          />
        ))}
      </div>
    </section>
  );
}
