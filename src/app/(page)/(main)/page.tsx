import tw from "tailwind-styled-components";

import Banner from "@/src/components/main-page/Banner/Banner";
import MainMobileCategory from "@/src/components/main-page/mobile/MainMobileCategory";
import MainFridge from "@/src/components/main-page/MainFridge";
import MainAlone from "@/src/components/main-page/MainAlone";
import MainVegan from "@/src/components/main-page/MainVegetarian";
import BestRecipes from "./components/BestRecipes";
import MainListingSkeleton from "@/src/components/listings/MainListingSkeleton";
import { Suspense } from "react";
import NewestRecipes from "./components/NewestRecipes";

const Home = async () => {
  return (
    <>
      <Banner />
      <MainContainer>
        <Suspense fallback={<></>}>
          <MainMobileCategory />
        </Suspense>

        <Suspense fallback={<MainListingSkeleton title="베스트 레시피" />}>
          {/* @ts-expect-error Async Server Component */}
          <BestRecipes />
        </Suspense>

        <MainFridge />
        <MainAlone />
        <MainVegan />

        <Suspense fallback={<MainListingSkeleton title="최신 레시피" />}>
          {/* @ts-expect-error Async Server Component */}
          <NewestRecipes />
        </Suspense>
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
