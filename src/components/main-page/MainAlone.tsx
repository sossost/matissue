"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import shuffleRecipes from "@/src/utils/shuffleRecipes";
import { useSingleRecipesQuery } from "@/src/hooks/useRecipesQuery";
import {
  StyledContainer,
  StyledContentsArea,
} from "@/src/styles/main/main.style";
import { Recipe } from "@/src/types";

import MainMobileListingRecipe from "../listings/MainMobileListingRecipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import MainTitleBox from "./MainTitleBox";
import MainAloneRecipeCard from "./MainAloneRecipeCard";

const MainAlone = () => {
  const singleRecipes = useSingleRecipesQuery();
  const [shuffledRecipes, setShuffledRecipes] = useState<Recipe[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // 미디어 쿼리를 사용하여 화면 크기에 따라 상태를 설정
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  // 레시피 데이터가 변경되면 레시피를 섞어서 상태에 저장
  useEffect(() => {
    setShuffledRecipes(shuffleRecipes(singleRecipes.data));
  }, [singleRecipes.data]);

  if (singleRecipes.isLoading) {
    return <LoadingRecipe />;
  }

  if (singleRecipes.isError) {
    return <NonDataCrying />;
  }

  if (singleRecipes.data.length < 5) {
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
          {isDesktop ? (
            <>
              {shuffledRecipes.slice(0, 4).map((recipe, index) => (
                <MainAloneRecipeCard
                  key={recipe.recipe_id}
                  recipe={recipe}
                  index={index}
                />
              ))}
            </>
          ) : (
            <MainMobileListingRecipe
              recipes={singleRecipes.data}
              url="/recipes/category/honmuk?category=honmuk"
            />
          )}
        </RecipeContainer>
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MainAlone;

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

const RecipeImageWrapperBase = styled.div`
  position: relative;
  grid-row: 1/3;
  grid-column: 1/3;

  &:hover {
    transform: scale(1.03);
  }

  transition: all 0.5s;
`;

const RecipeImageWrapper2 = styled(RecipeImageWrapperBase)`
  grid-row: 1/2;
  grid-column: 3/4;
`;

const RecipeImageWrapper3 = styled(RecipeImageWrapperBase)`
  grid-row: 1/2;
  grid-column: 4/5;
`;

const RecipeImageWrapper4 = styled(RecipeImageWrapperBase)`
  grid-row: 2/3;
  grid-column: 3/5;
`;

const SquareImageWrapper = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25));
`;

const TitleOnImage = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 5;
  left: 2rem;
  bottom: 2rem;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  text-shadow: 0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
`;
