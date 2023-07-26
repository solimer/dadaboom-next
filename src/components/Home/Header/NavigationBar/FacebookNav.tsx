import React from "react";
import cn from "@/src/lib/utils/cn";
import { Facebook } from "lucide-react";

const FACEBOOK_LINK =
  "https://www.facebook.com/%D7%A6%D7%A4%D7%A8%D7%99%D7%A8-%D7%9C%D7%99%D7%9B%D7%98%D7%A0%D7" +
  "%A9%D7%98%D7%99%D7%99%D7%9F-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%AA%D7%95%D7%A4%D7%99%D7%9D-%D7%95%D7%9B%D7%9C" +
  "%D7%99-%D7%94%D7%A7%D7%A9%D7%94-365617346882919/";

const FacebookNav: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <li className="hover:text-primary">
    <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer">
      <Facebook
        width={18}
        height={18}
        className={cn(
          "fill-white transition-all duration-700 hover:fill-primary hover:text-primary",
          "group-[.on-scroll]:fill-black",
          isMobile && "fill-black"
        )}
        strokeWidth={"0.75px"}
      />
    </a>
  </li>
);

export default FacebookNav;
