import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types";
import { queryKey } from "../ReactQuery/queryKey";
import { getRecipesByLastest, getRecipesByPopularity } from "../app/api/recipe";

export const useBestRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.bestRecipes], getRecipesByPopularity);

  return { data, isLoading, isError };
};

export const useNewestRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.newestRecipes], getRecipesByLastest);

  return { data, isLoading, isError };
};
