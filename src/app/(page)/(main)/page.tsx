import tw from "tailwind-styled-components";

import Banner from "@/src/components/main-page/Banner/Banner";
import MainMobileCategory from "@/src/components/main-page/mobile/MainMobileCategory";
import MainFridge from "@/src/components/main-page/MainFridge";
import MainAlone from "@/src/components/main-page/MainAlone";
import MainVegan from "@/src/components/main-page/MainVegetarian";
import MainNewest from "@/src/components/main-page/MainNewest";
import BestRecipes from "./components/BestRecipes";
import MainListingSkeleton from "@/src/components/listings/MainListingSkeleton";
import { Suspense } from "react";

const Home = async () => {
  return (
    <>
      <Banner />
      <MainContainer>
        <MainMobileCategory />
        <Suspense fallback={<MainListingSkeleton title="베스트 레시피" />}>
          {/* @ts-expect-error Async Server Component */}
          <BestRecipes />
        </Suspense>

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
