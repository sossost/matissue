import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";

const CATEGORY_DATA = [
  {
    title: "한식",
    imgUrl: "/images/main/category/korean.svg",
    routerUrl: "/recipes/category/한식?category=korean",
  },
  {
    title: "양식",
    imgUrl: "/images/main/category/western.svg",
    routerUrl: "/recipes/category/양식?category=western",
  },
  {
    title: "일식",
    imgUrl: "/images/main/category/japanese.png",
    routerUrl: "/recipes/category/일식?category=japanese",
  },
  {
    title: "중식",
    imgUrl: "/images/main/category/chinese.svg",
    routerUrl: "/recipes/category/중식?category=chinese",
  },
  {
    title: "베스트",
    imgUrl: "/images/main/category/best.svg",
    routerUrl: "/recipes/category/best?category=best",
  },
  {
    title: "최신",
    imgUrl: "/images/main/category/newest.svg",
    routerUrl: "/recipes/category/newest?category=newest",
  },
  {
    title: "혼먹",
    imgUrl: "/images/main/category/alone.svg",
    routerUrl: "/recipes/category/honmuk?category=honmuk",
  },
  {
    title: "채식",
    imgUrl: "/images/main/category/vegetarian.svg",
    routerUrl: "/recipes/category/vegetarian?category=vegetarian",
  },
];

const MainMobileCategory = () => {
  return (
    <CategoryWrapper>
      <CategoryContainer>
        <CategoryList>
          {CATEGORY_DATA.map((item, index) => {
            return (
              <CategoryItem key={index}>
                <IconWrapper href={item.routerUrl}>
                  <Image
                    src={item.imgUrl}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                </IconWrapper>
                <TitleWrapper>{item.title}</TitleWrapper>
              </CategoryItem>
            );
          })}
        </CategoryList>
      </CategoryContainer>
    </CategoryWrapper>
  );
};

export default MainMobileCategory;

const CategoryWrapper = tw.div`
  block
  w-full
  pt-[30px]
  pb-[10px]
  px-[15px]

  lg:hidden
`;

const CategoryContainer = tw.div`
  flex
  flex-col
  gap-[10px]
  w-full
`;

const CategoryList = tw.ul`
  grid 
  grid-rows-1 
  gap-y-4 
  grid-cols-4 
  place-items-center 
  md:grid-cols-8
`;

const CategoryItem = tw.li`
  flex
  flex-col
  justify-center
  items-center
  relative
  w-[60px]
  g-[5px]
`;

const IconWrapper = tw(Link)`
  bg-[#ffefc8]
  p-[10px]
  rounded-[15px]
`;

const TitleWrapper = tw.div`
  text-[14px]
`;
