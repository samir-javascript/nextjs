"use client";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/constants";

//usePathname hook returns a string of the current URL's pathname. For example: / "/dashbrd"
export default function MobileNavBar() {
  const PathName = usePathname();

  const NavContent = () => {
    return (
      <section className="h-full flex-1 flex grow flex-col gap-6 pt-16">
        {sidebarLinks.map((item) => {
          const isActive =
            (PathName.includes(item.route) && item.route.length > 1) ||
            PathName === item.route;
          return (
            <SheetClose key={item.route} asChild>
              <Link
                href={item.route}
                className={`flex items-center justify-start gap-4 p-4 
                    ${
                      isActive
                        ? "primary-gradient rounded-lg text-light-900"
                        : "text-dark300_light900"
                    }
                `}
              >
                <Image
                  className={`${isActive ? "" : "invert-colors"}`}
                  src={item.imgURL}
                  height={20}
                  width={20}
                  alt={item.label}
                />
                <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                  {item.label}
                </p>
              </Link>
            </SheetClose>
          );
        })}
      </section>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Image
          src="/assets/icons/hamburger.svg"
          height={36}
          width={36}
          alt="menu"
          className="invert-colors sm:hidden cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className={`background-light900_dark200
         border-none max-h-screen overflow-y-auto scrollbar-hidden sm:hidden
        }`}
      >
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow"
          />
          <p className="text-dark-100_light900 h2-bold">
            Dev <span className="text-primary-500">OverFlow</span>
          </p>
        </Link>
        <div>
          <SheetClose className="flex-1" asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Button
                    className="min-h-[41px] 
                  px-4 py-3 rounded-lg
                   btn-secondary
                   small-medium w-full shadow-none"
                  >
                    <span className="primary-text-gradient capitalize">
                      log in
                    </span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Button
                    className="min-h-[41px] 
                  px-4 py-3 rounded-lg
                   light-border-2 btn-tertiary
                   small-medium w-full shadow-none"
                  >
                    <span className="text-dark-400_light-900 capitalize">
                      sign up
                    </span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
