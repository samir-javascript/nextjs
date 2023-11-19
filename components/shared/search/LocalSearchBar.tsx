"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
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
  return (
    <Link href={route}>
      <div
        className={`background-light800_darkgradient flex min-h-[56px] px-4 rounded-[10px]
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
          value={""}
          onChange={() => {
            ("");
          }}
          className="border-none shadow-none no-focus outline-none
                 placeholder paragraph-regular
                background-light800_darkgradient
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