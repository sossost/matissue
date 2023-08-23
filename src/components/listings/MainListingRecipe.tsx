import styled from "styled-components";
import useDayFilter from "./hooks/useDayFilter";
import { Recipe } from "@/src/types";
import {
  ListingRecipeContainer,
  StyledContainer,
  StyledContentsArea,
  StyledTitle,
  StyledTitleBox,
} from "@/src/styles/main/main.style";

import RecipeCard from "../recipe-card/RecipeCard";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import MainMobileListingRecipe from "./MainMobileListingRecipe";
import useRecipePagination from "./hooks/useRecipePagination";

const CATEGORY_TYPE = {
  best: { title: "베스트 레시피", url: "/recipes/category/best?category=best" },
  newest: {
    title: "최신 레시피",
    url: "/recipes/category/newest?category=newest",
  },
};

type MainListingRecipeProps = {
  variant: "best" | "newest";
  recipes: Recipe[];
  isFilter: boolean;
};

const MainListingRecipe = ({
  variant,
  recipes,
  isFilter,
}: MainListingRecipeProps) => {
  // 월간, 주간, 일간 필터 커스텀 훅
  const { filteredRecipes, DayFilter } = useDayFilter(recipes);

  // 레시피 페이지네이션 커스텀 훅
  const { handleSliceByPage, LeftSlideButton, RightSlideButton } =
    useRecipePagination({
      recipesLength: isFilter ? filteredRecipes.length : recipes.length,
    });

  return (
    <StyledContainer>
      <LeftSlideButton />
      <StyledContentsArea>
        <StyledRowTitleBox>
          <StyledTitle>{CATEGORY_TYPE[variant].title}</StyledTitle>
          {isFilter && <DayFilter />}
        </StyledRowTitleBox>

        <ListingRecipeContainer>
          {isFilter
            ? handleSliceByPage(filteredRecipes).map((item: Recipe) => (
                <RecipeCard key={item.recipe_id} recipe={item} />
              ))
            : handleSliceByPage(recipes).map((item: Recipe) => (
                <RecipeCard key={item.recipe_id} recipe={item} />
              ))}
          {isFilter && filteredRecipes.length === 0 && <NonRecipeCrying />}
        </ListingRecipeContainer>
        <MainMobileListingRecipe
          recipes={isFilter ? filteredRecipes : recipes}
          url={CATEGORY_TYPE[variant].url}
        />
      </StyledContentsArea>
      <RightSlideButton />
    </StyledContainer>
  );
};
export default MainListingRecipe;

const StyledRowTitleBox = styled(StyledTitleBox)`
  align-items: center;
  flex-direction: row;
`;
