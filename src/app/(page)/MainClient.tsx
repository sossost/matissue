"use client";

import Banner from "../../components/main-page/Banner/Banner";
import MainBest from "../../components/main-page/MainBest";

import styled from "styled-components";
import { Recipe } from "../../types";
import MainMobileCategory from "../../components/main-page/mobile/MainMobileCategory";
import dynamic from "next/dynamic";

/** 유저경험을 향상시키기위해 메인화면에서 가장 위에 보이는 bestRecipes만 서버사이드 렌더링
 * 상대적으로 아래있는 다른 컴포넌트들은 클라이언트사이드 렌더링으로 진행
 * */
const MainPageClient = ({ bestRecipes }: { bestRecipes: Recipe[] }) => {
  const MainFridge = dynamic(
    () => import("../../components/main-page/MainFridge"),
    { ssr: false }
  );
  const MainAlone = dynamic(
    () => import("../../components/main-page/MainAlone"),
    {
      ssr: false,
    }
  );
  const MainVegetarian = dynamic(
    () => import("../../components/main-page/MainVegetarian"),
    { ssr: false }
  );
  const MainNewest = dynamic(
    () => import("../../components/main-page/MainNewest"),
    { ssr: false }
  );

  return (
    <>
      <Banner />
      <MainWrapper>
        <MainMobileCategory />
        <MainBest initialBestRecipes={bestRecipes} />
        <MainFridge />
        <MainAlone />
        <MainVegetarian />
        <MainNewest />
      </MainWrapper>
    </>
  );
};

export default MainPageClient;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    margin: 0 auto;
    padding: 2rem 0;
    gap: 1rem;

  @media (min-width: 1024px) {
    gap: 4rem;
  }
`;
