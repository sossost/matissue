"use client";

import styled from "styled-components";
import { useSingleRecipesQuery } from "@/src/hooks/useRecipesQuery";
import useMediaQuery from "@/src/hooks/useMediaQuery";
import useShuffleRecipes from "@/src/hooks/useShuffleRecipes";
import {
  StyledContainer,
  StyledContentsArea,
} from "@/src/styles/main/main.style";

import MainMobileListingRecipe from "../listings/MainMobileListingRecipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import MainTitleBox from "./MainTitleBox";
import MainAloneRecipeCard from "./MainAloneRecipeCard";

const MainAlone = () => {
  const isDesktop = useMediaQuery();

  const singleRecipes = useSingleRecipesQuery();

  const shuffledRecipes = useShuffleRecipes(singleRecipes.data);

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
