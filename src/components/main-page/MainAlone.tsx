"use client";

import styled, { keyframes } from "styled-components";
import useShuffleRecipes from "@/src/hooks/useShuffleRecipes";
import {
  StyledContainer,
  StyledContentsArea,
} from "@/src/styles/main/main.style";

import MainMobileListingRecipe from "../listings/MainMobileListingRecipe";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import MainTitleBox from "./MainTitleBox";
import MainAloneRecipeCard from "./MainAloneRecipeCard";
import { useSingleRecipesQuery } from "@/src/hooks/useRecipesQuery";

const MainAlone = () => {
  const { singleRecipes } = useSingleRecipesQuery(1, 20);

  if (singleRecipes.length < 5) {
    <NonRecipeCrying />;
  }

  return (
    <StyledContainer>
      <StyledContentsArea>
        <MainTitleBox
          title="혼먹 자취생 레시피"
          subTitle="자취생이 해먹을수 있는 새다른 추천 레시피들"
        />
        <RecipeContainer>
          <>
            {singleRecipes.length === 0 ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <MainAloneRecipeCardSkeleton key={index} index={index} />
                ))}
              </>
            ) : (
              singleRecipes
                .slice(0, 4)
                .map((recipe, index) => (
                  <MainAloneRecipeCard
                    key={recipe.recipe_id}
                    recipe={recipe}
                    index={index}
                  />
                ))
            )}
          </>
          <MainMobileListingRecipe
            recipes={singleRecipes}
            url="/recipes/category/honmuk?category=honmuk"
          />
        </RecipeContainer>
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MainAlone;

const MainAloneRecipeCardSkeleton = ({ index }: { index: number }) => {
  return (
    <SkeletonRecipeImageWrapperBase index={index}>
      <SkeletonStyledImageWrapper />
      <SkeletonTitleOnImage />
    </SkeletonRecipeImageWrapperBase>
  );
};

const GRID_ROW_TEMPLATE = ["1/3", "1/2", "1/2", "2/3"];
const GRID_COLUMN_TEMPLATE = ["1/3", "3/4", "4/5", "3/5"];

const RecipeContainer = styled.div`
  @media (min-width: 1024px) {
    max-width: 120rem;
    margin: 0 auto;
    padding: 2rem 2rem;
    display: grid;
    grid-template-columns: repeat(4, 21rem);
    grid-template-rows: repeat(2, 21rem);
    gap: 2rem;
  }
`;

const loading = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const SkeletonRecipeImageWrapperBase = styled.div<{ index: number }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: relative;
    grid-row: ${({ index }) => GRID_ROW_TEMPLATE[index]};
    grid-column: ${({ index }) => GRID_COLUMN_TEMPLATE[index]};
    transition: all 0.5s;
  }
`;

const SkeletonStyledImageWrapper = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  animation: ${loading} 1.5s infinite;
`;

const SkeletonTitleOnImage = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  height: 20px;
  bottom: 2rem;
  left: 2rem;
  background-color: #e0e0e0;
  animation: ${loading} 1.5s infinite;
`;
