import React from "react";
import Link from "next/link";
import { PrismicText } from "@prismicio/react";
import { ImageField, RichTextField } from "@prismicio/types";
import { MoveLeft } from "lucide-react";

import ImageWithBlur from "../../Shared/ImageWithBlur";

type BlogBoxProps = {
  href: string;
  img: ImageField;
  title: string;
  description: RichTextField;
};

const BlogBox: React.FC<BlogBoxProps> = ({
  href,
  img,
  title,
  description,
}: BlogBoxProps) => (
  <Link href={href} className="flex flex-col">
    <ImageWithBlur field={img} />
    <div className="relative flex flex-1 flex-col bg-white p-6 shadow-md">
      <div className="mb-3">
        <h3 className="text-xl">
          <div className="text-gray-800">{title}</div>
        </h3>
      </div>
      <div className="mb-4 flex-1">
        <p className="text-sm text-gray-600">
          <PrismicText field={description} />
        </p>
      </div>
      <div className="flex items-center tracking-[0.5pt] text-gray-800">
        <span className="pl-[6px]">קרא עוד</span>
        <MoveLeft className="text-primary" width={18} strokeWidth={3} />
      </div>
    </div>
  </Link>
);

export default BlogBox;
