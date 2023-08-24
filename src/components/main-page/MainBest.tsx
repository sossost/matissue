"use client";

import { useBestRecipesQuery } from "@/src/hooks/useRecipesQuery";

import MainListingRecipe from "../listings/MainListingRecipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";

const MainBest = () => {
  const bestRecipes = useBestRecipesQuery();

  return (
    <MainListingRecipe
      variant="best"
      recipes={bestRecipes.data}
      isLoading={bestRecipes.isLoading}
      isError={bestRecipes.isError}
      isFilter={false}
    />
  );
};

export default MainBest;
