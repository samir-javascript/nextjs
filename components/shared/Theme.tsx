"use client";

import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants/constants";


const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative bg-transparent border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className="focus:bg-light-900 data-[state=open]:bg-light-900 
           dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 
        "
        >
          {mode === "light" ? (
            <Image
              src={"/assets/icons/sun.svg"}
              height={20}
              width={20}
              alt="sun"
              className="active-theme"
            />
          ) : (
            <Image
              src={"/assets/icons/moon.svg"}
              height={20}
              width={20}
              alt="moon"
            />
          )}
        </MenubarTrigger>
        <MenubarContent
          className="absolute right-[-3rem] mt-3  bg-light-900
        min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300
             
        "
        >
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
              className="flex items-center px-2.5 py-2 focus:bg-light-800 dark:focus:bg-dark-400 gap-4"
            >
              <Image
                src={item.icon}
                width={16}
                height={16}
                alt={item.value}
                className={`${mode === item.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.value}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;