import useBlurImage from "@/src/hooks/useBlurImage";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import { ImageField } from "@prismicio/types";

const ImageWithBlur: React.FC<PrismicNextImageProps> = ({
  field,
  ...props
}) => {
  const blurImage = useBlurImage(field);
  return (
    <PrismicNextImage
      field={field}
      placeholder={blurImage ? "blur" : "empty"}
      blurDataURL={blurImage}
      className="img-responsive"
      tw="w-full"
      {...props}
    />
  );
};

export default ImageWithBlur;