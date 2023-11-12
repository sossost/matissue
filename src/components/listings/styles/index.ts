import tw from "tailwind-styled-components";

export const StyledContainer = tw.div`
  flex
  relative
  w-full
  p-4
  lg:items-center
  lg:realative
  lg:w-[90%]
  lg:max-w-[1200px]
  lg:pt-5
  lg:px-5
  lg:pb-10
`;

export const StyledContentsArea = tw.div`
  flex
  flex-col
  gap-3
  justify-center
  w-full
  max-w-[1100px]
  mx-auto
  lg:gap-5
`;

export const StyledTitle = tw.div`
  text-[18px]
  font-medium
  lg:text-[24px]
`;

export const StyledRowTitleBox = tw.div`
  flex
  gap-3
  pt-2
  items-center
  align-items: center;

  lg:pt-4
  lg:items-center
`;

export const ListingRecipeContainer = tw.div`
  hidden

  lg:grid
  lg:grid-cols-4
  lg:gap-y-7
  lg:gap-x-5
`;
