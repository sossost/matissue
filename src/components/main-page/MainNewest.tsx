"use client";

import { useNewestRecipesQuery } from "@/src/hooks/useRecipesQuery";

import MainListingRecipe from "@/src/components/listings/MainListingRecipe";

const MainNewest = () => {
  const { newestRecipes } = useNewestRecipesQuery(1, 100);

  return (
    <MainListingRecipe
      variant="newest"
      recipes={newestRecipes}
      isFilter={false}
    />
  );
};

export default MainNewest;
