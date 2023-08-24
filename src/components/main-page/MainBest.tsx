"use client";

import { useBestRecipesQuery } from "@/src/hooks/useRecipesQuery";

import MainListingRecipe from "../listings/MainListingRecipe";
import NonDataCrying from "../UI/NonDataCrying";

const MainBest = () => {
  const bestRecipes = useBestRecipesQuery();

  if (bestRecipes.isError) {
    return <NonDataCrying />;
  }

  return (
    <MainListingRecipe
      variant="best"
      recipes={bestRecipes.data}
      isLoading={bestRecipes.isLoading}
      isFilter={false}
    />
  );
};

export default MainBest;
