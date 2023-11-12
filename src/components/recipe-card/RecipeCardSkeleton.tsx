import React from "react";
import tw from "tailwind-styled-components";

import ImageContainer from "../UI/ImageContainer";

const RecipeCardSkeleton = () => {
  return (
    <>
      <RecipeCardLayout>
        <ImageContainer
          imageUrl={"/images/skeleton.png"}
          marginTop={"pt-[90%]"}
        />
        <RecipeTitleSkeleton />
        <RecipeInfoSkeleton>
          <RecipeInfoSkeletonItemOne />
          <RecipeInfoSkeletonItemTwo />
        </RecipeInfoSkeleton>
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

const RecipeTitleSkeleton = tw.div`
  flex
  h-[20px]
  w-2/3
  bg-[#f6f6f6]
  rounded-[9999px]
  my-[2px]
`;

const RecipeInfoSkeleton = tw.div`
  flex
  justify-between
  h-[18px]
  w-full
`;

const RecipeInfoSkeletonItemOne = tw.div`
  flex
  h-full
  w-[40%]
  bg-[#f6f6f6]
  rounded-[9999px]
`;

const RecipeInfoSkeletonItemTwo = tw(RecipeInfoSkeletonItemOne)`
  w-[20%]
`;
