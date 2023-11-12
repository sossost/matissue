import React from "react";
import tw from "tailwind-styled-components";

import ImageContainer from "../UI/ImageContainer";

const RecipeCardSkeleton = () => {
  return (
    <>
      <RecipeCardLayout>
        <ImageContainer imageUrl={"/images/skeleton.png"} aspectRatio={0.9} />
        <RecipeInfoSkeleton />
      </RecipeCardLayout>
    </>
  );
};

export default RecipeCardSkeleton;

const RecipeCardLayout = tw.div`
  flex
  flex-col
  w-full
  max-w-[270px]
  overflow-hidden
  gap-[2px]
  cursor-pointer

  md:max-w-none
`;

const RecipeInfoSkeleton = tw.div`
  flex
  h-[23px]
  w-full
`;
