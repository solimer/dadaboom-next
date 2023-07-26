import React from "react";
import cn from "@/src/lib/utils/cn";

import FacebookNav from "./FacebookNav";
import ItemNav from "./ItemNav";
import { navArray } from "./navArray";

const NavigationItems: React.FC<{
  target: "mobile" | "desktop";
  isOpen?: boolean;
}> = ({ target, isOpen }) => {
  const items = navArray.map((item) => {
    if (item.target === "facebook") {
      return <FacebookNav isMobile={target === "mobile"} key="nav-facebook" />;
    }
    return <ItemNav item={item} key={item.target} />;
  });
  return (
    <ul
      className={cn(
        "flex-col items-center font-hebrew text-xl text-white transition-all duration-700 md:flex-row md:space-x-4 md:space-x-reverse",
        "group-[.on-scroll]:fill-black group-[.on-scroll]:text-black",
        target === "mobile" &&
          "top-20 flex h-[285px] w-full items-start space-y-3 bg-white pr-8 text-gray-800 opacity-100 md:hidden",
        target === "mobile" && !isOpen && "h-0 opacity-0",
        isOpen && "mt-4 pt-4",
        target === "desktop" && "hidden md:flex"
      )}
    >
      {items}
    </ul>
  );
};

export default NavigationItems;
