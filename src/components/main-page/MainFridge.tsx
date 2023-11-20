"use client";

import styled from "styled-components";
import { Recipe } from "@/src/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/src/store/darkModeAtom";
import { RecipeContainer } from "@/src/styles/main/main.style";
import useIngredientFilter from "./hooks/useIngredientFilter";

import LargeRecipeCard from "../recipe-card/main/MainLargeRecipeCard";
import MainTitleBox from "./MainTitleBox";
import LargeRecipeCardSkeleton from "../recipe-card/main/MainLargeRecipeCardSkeleton";

const MainFridge = () => {
  const { filteredRecipes, IngredientList } = useIngredientFilter();

  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <MainFridgeContainer isDarkMode={isDarkMode}>
      <MainTitleBox
        title="당신을 위한 냉장고 털이 레시피"
        subTitle="냉장고 속 재료로 손쉽게 훌륭한 요리를 선보이세요"
      />
      <IngredientList />
      <RecipeContainer>
        {filteredRecipes.length === 0 ? (
          <>
            <LargeRecipeCardSkeleton />
            <LargeRecipeCardSkeleton />
            <LargeRecipeCardSkeleton />
          </>
        ) : (
          filteredRecipes
            .slice(0, 3)
            .map((item: Recipe) => (
              <LargeRecipeCard key={item.recipe_id} recipe={item} />
            ))
        )}
      </RecipeContainer>
    </MainFridgeContainer>
  );
};

export default MainFridge;

const MainFridgeContainer = styled.div<{ isDarkMode: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: ${(props) =>
      props.isDarkMode ? props.theme.navy : "#fff9de"};
  }
`;
