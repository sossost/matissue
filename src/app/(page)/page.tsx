import tw from "tailwind-styled-components";
import { getRequest } from "../api/utils/getRequest";

import Banner from "@/src/components/main-page/Banner/Banner";
import MainMobileCategory from "@/src/components/main-page/mobile/MainMobileCategory";
import MainFridge from "@/src/components/main-page/MainFridge";
import MainAlone from "@/src/components/main-page/MainAlone";
import MainVegan from "@/src/components/main-page/MainVegetarian";
import MainNewest from "@/src/components/main-page/MainNewest";
import MainListingRecipe from "@/src/components/listings/MainListingRecipe";

const Home = async () => {
  const bestRecipes = await getRequest({
    url: "recipes/popularity",
    options: { revalidate: 60 * 60 },
  });

  return (
    <>
      <Banner />
      <MainContainer>
        <MainMobileCategory />

        <MainListingRecipe
          variant="best"
          recipes={bestRecipes}
          isFilter={false}
        />

        <MainFridge />
        <MainAlone />
        <MainVegan />
        <MainNewest />
      </MainContainer>
    </>
  );
};

export default Home;

const MainContainer = tw.div`
  flex
  flex-col
  relative
  items-center
  w-full
  mx-auto

  md:py-5
  md:gap-2

  lg:gap-8
`;
