"use client";

import { useNewestRecipesQuery } from "@/src/hooks/useRecipesQuery";

import MainListingRecipe from "../listings/MainListingRecipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";

const MainNewest = () => {
  const newestRecipes = useNewestRecipesQuery();

  if (newestRecipes.isLoading) return <LoadingRecipe />;

  if (newestRecipes.isError) return <NonDataCrying />;

  return (
    <MainListingRecipe
      variant="newest"
      recipes={newestRecipes.data}
      isFilter={false}
    />
  );
};

export default MainNewest;
