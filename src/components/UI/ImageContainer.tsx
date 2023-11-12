import Image from "next/image";
import tw from "tailwind-styled-components";

interface ImageContainerProps {
  imageUrl: string;
  marginTop?: string;
  sizes?: string;
}

const ImageContainer = ({
  imageUrl,
  marginTop = "pt-[100%]",
  sizes = "240px",
}: ImageContainerProps) => {
  return (
    <RecipeImgContainer className={marginTop}>
      <RecipeImgWrapper>
        <Image
          fill
          sizes={sizes}
          src={imageUrl}
          style={{ objectFit: "cover", backgroundColor: "#f5f5f5" }}
          placeholder="empty"
          alt="게시물 썸네일 이미지"
        />
      </RecipeImgWrapper>
    </RecipeImgContainer>
  );
};

export default ImageContainer;

const RecipeImgContainer = tw.div`
  relative
  rounded-[8px]
  overflow-hidden
`;

const RecipeImgWrapper = tw.div`
  absolute
  w-full
  h-full
  inset-0
  object-cover
  rounded-[8px]
  transition-transform
  duration-300
  ease-in-out
  hover:scale-[1.1]
`;
