import React from "react";
import Image from "next/image";

import Link from "next/link";
import { Button } from "./ui/button";
interface props {
  textButton: string;
  title: string;
  paragraph: string;
  link: string;
}
export default function NoResult({
  textButton,
  title,
  paragraph,
  link,
}: props) {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        width={270}
        height={200}
        alt="no result image"
        src={"/assets/images/light-illustration.png"}
        className="block dark:hidden object-contain"
      />
      <Image
        width={270}
        height={200}
        alt="no result image"
        src={"/assets/images/dark-illustration.png"}
        className="hidden dark:block object-contain"
      />

      <h1 className="mt-8 h2-bold text-center text-dark200_light900">
        {title}
      </h1>
      <p className="text-center body-regular text-dark500_light700 max-w-md my-3.5">
        {paragraph}
      </p>
      <Link href={link}>
        <Button
          className="bg-primary-500 text-light-900 px-4 py-3 rounded-lg capitalize
            body-regular my-4 min-h-[46px]
        "
        >
          {textButton}
        </Button>
      </Link>
    </div>
  );
}