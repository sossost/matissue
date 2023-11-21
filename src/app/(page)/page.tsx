import tw from "tailwind-styled-components";
import { Suspense } from "react";

import Banner from "@/src/components/main-page/Banner/Banner";
import MainMobileCategory from "@/src/components/main-page/mobile/MainMobileCategory";
import MainListingSkeleton from "@/src/components/listings/MainListingSkeleton";
import MainFridge from "@/src/components/main-page/MainFridge";
import MainBest from "@/src/components/main-page/MainBest";
import MainAlone from "@/src/components/main-page/MainAlone";
import MainVegetarian from "@/src/components/main-page/MainVegetarian";
import dynamic from "next/dynamic";

const Home = async () => {
  const MainNewest = dynamic(
    () => import("@/src/components/main-page/MainNewest"),
    {
      loading: () => <MainListingSkeleton title="최신 레시피" />,
      ssr: false,
    }
  );

  return (
    <>
      <Banner />
      <MainContainer>
        <MainMobileCategory />

        <Suspense fallback={<MainListingSkeleton title="베스트 레시피" />}>
          {/* @ts-expect-error Async Server Component */}
          <MainBest />
        </Suspense>

        <MainFridge />

        <MainAlone />

        <MainVegetarian />

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
