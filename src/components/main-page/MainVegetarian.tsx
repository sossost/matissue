"use client";

import React from "react";
import styled from "styled-components";
import { Recipe } from "@/src/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/src/store/darkModeAtom";
import useRecipeSlide from "./hooks/useRecipeSlide";
import useMediaQuery from "@/src/hooks/useMediaQuery";
import useShuffleRecipes from "@/src/hooks/useShuffleRecipes";
import { RecipeContainer } from "@/src/styles/main/main.style";
import { useVegetarianRecipesQuery } from "@/src/hooks/useRecipesQuery";

import MainTitleBox from "./MainTitleBox";
import LargeRecipeCard from "../recipe-card/main/MainLargeRecipeCard";
import MainMobileListingRecipe from "../listings/MainMobileListingRecipe";
import LargeRecipeCardSkeleton from "../recipe-card/main/MainLargeRecipeCardSkeleton";

const MainVegetarian = () => {
  const { vegetarianRecipes } = useVegetarianRecipesQuery(1, 30);

  const isDarkMode = useRecoilValue(darkModeAtom);
  const isDesktop = useMediaQuery();

  const { slide, totalSlide, LeftSlideButton, RightSlideButton } =
    useRecipeSlide(vegetarianRecipes.length);

  const shuffledRecipes = useShuffleRecipes(vegetarianRecipes);

  return (
    <MainVegetarianWrapper isDarkMode={isDarkMode}>
      <MainVegetarianContainer>
        <MainTitleBox
          title="채식러들을 위한 초록레시피"
          subTitle="건강과 환경을 생각하는 채식 레시피로 맛있는 변화를 경험하세요"
        />

        <RecipeSliderWindow>
          {isDesktop ? (
            <VegunRecipeContainer slide={slide}>
              {vegetarianRecipes.length === 0 ? (
                <>
                  <LargeRecipeCardSkeleton />
                  <LargeRecipeCardSkeleton />
                  <LargeRecipeCardSkeleton />
                </>
              ) : (
                shuffledRecipes
                  .slice(0, totalSlide * 3)
                  .map((item: Recipe) => (
                    <LargeRecipeCard key={item.recipe_id} recipe={item} />
                  ))
              )}
            </VegunRecipeContainer>
          ) : (
            <RecipeContainer>
              <MainMobileListingRecipe
                recipes={vegetarianRecipes}
                url="/recipes/category/vegetarian?category=vegetarian"
              />
            </RecipeContainer>
          )}
        </RecipeSliderWindow>

        <LeftSlideButton />
        <RightSlideButton />
      </MainVegetarianContainer>
    </MainVegetarianWrapper>
  );
};

export default MainVegetarian;

const MainVegetarianWrapper = styled.div<{ isDarkMode: boolean }>`
  padding: 2rem;

  @media (min-width: 1024px) {
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: ${(props) =>
      props.isDarkMode ? props.theme.navy : "#e8ffe8"};
  }
`;

const MainVegetarianContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 110rem;
  margin: 0 auto;
  gap: 1rem;
`;

const RecipeSliderWindow = styled.div`
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  overflow: hidden;
`;

const VegunRecipeContainer = styled.div<{ slide: number }>`
  width: 480rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  overflow-hidden;
  grid-template-columns: repeat(15, 1fr);
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -96 * (props.slide - 1)}rem);
  grid-column-gap: 4rem;
`;
