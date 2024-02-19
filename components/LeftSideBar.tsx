'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedOut,  useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { sidebarLinks } from "@/constants/constants";
export default function LeftSideBar() {
 
 
  const PathName = usePathname();
  const { userId  } = useAuth()
  return (
    <section
      className="flex flex-col justify-between pt-36 p-6 h-screen overflow-y-auto 
       background-light900_dark200 border-r light-border sticky left-0 top-0 
       lg:w-[266px] shadow-light-300 dark:shadow-none max-sm:hidden
        scrollbar-hidden custom-scrollbar
    "
    >
      <div className=" flex flex-col flex-1 gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (PathName.includes(item.route) && item.route.length > 1) ||
            PathName === item.route;
            if(item.route === '/profile') {
                if(userId) {
                    item.route = `${item.route}/${userId}`
                }else {
                  return null;
                }
            }
          return (
            <Link 
             key={item.label}
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
              <p
                className={`${isActive ? "base-bold" : "base-medium"}
                 max-lg:hidden
              `}
              >
                {item.label}
              </p>
            </Link>
          );
        })}

        <SignedOut>
          <Link href={"/sign-in"}>
            <Button
              className="min-h-[41px] 
                  px-4 py-3 rounded-lg
                   btn-secondary
                   small-medium w-full shadow-none"
            >
              <Image
                src="/assets/icons/account.svg"
                alt="account"
                className="lg:hidden invert-colors"
                width={24}
                height={24}
              />
              <span className="primary-text-gradient capitalize max-lg:hidden">
                log in
              </span>
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button
              className="min-h-[41px] 
                  px-4 py-3 rounded-lg
                   light-border-2 btn-tertiary
                   small-medium w-full shadow-none"
            >
              <Image
                src="/assets/icons/sign-up.svg"
                alt="account"
                className="lg:hidden invert-colors"
                width={24}
                height={24}
              />
              <span className="text-dark-400_light-900 capitalize max-lg:hidden">
                sign up
              </span>
            </Button>
          </Link>
        </SignedOut>
      </div>
    </section>
  );
}