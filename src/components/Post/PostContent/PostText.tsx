import React from "react";
import { PostDocumentData } from "@/prismicio-types";
import CenteredText from "@/slices/CenteredText";
import Paragraph from "@/slices/Paragraph";
import { SliceZone } from "@prismicio/react";

const components = {
  paragraph: Paragraph,
  centered_text: CenteredText,
};

const PostText: React.FC<{ slices: PostDocumentData["slices"] }> = ({
  slices,
}) => {
  return <SliceZone slices={slices} components={components} />;
};

export default PostText;
