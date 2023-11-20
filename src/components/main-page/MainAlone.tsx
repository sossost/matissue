"use client";

import styled from "styled-components";
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
  const shuffledRecipes = useShuffleRecipes(singleRecipes);

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
            {shuffledRecipes.slice(0, 4).map((recipe, index) => (
              <MainAloneRecipeCard
                key={recipe.recipe_id}
                recipe={recipe}
                index={index}
              />
            ))}
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
