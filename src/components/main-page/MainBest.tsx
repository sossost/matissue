"use client";

import { useBestRecipesQuery } from "@/src/hooks/useRecipesQuery";

import MainListingRecipe from "../listings/MainListingRecipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";

const MainBest = () => {
  const bestRecipes = useBestRecipesQuery();

  if (bestRecipes.isLoading) return <LoadingRecipe />;

  if (bestRecipes.isError) return <NonDataCrying />;

  return (
    <MainListingRecipe
      variant="best"
      recipes={bestRecipes.data}
      isFilter={false}
    />
  );
};

export default MainBest;
