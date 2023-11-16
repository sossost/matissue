"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/src/ReactQuery/queryKey";
import { Recipe } from "@/src/types";
import { getRecipesByLastest } from "@/src/app/api/recipe";

import MainListingRecipe from "@/src/components/listings/MainListingRecipe";

const NewestRecipes = async () => {
  const { data: newestRecipes = [] } = useQuery<Recipe[]>(
    [queryKey.newestRecipes],
    getRecipesByLastest
  );

  return (
    <MainListingRecipe
      variant="newest"
      recipes={newestRecipes}
      isFilter={false}
    />
  );
};

export default NewestRecipes;
