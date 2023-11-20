"use client";

import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types";
import { queryKey } from "../ReactQuery/queryKey";
import { getRecipesByPopularity } from "../app/api/recipe";
import { getRequest } from "../app/api/utils/getRequest";
import shuffleRecipes from "../utils/shuffleRecipes";

export const useBestRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.bestRecipes], getRecipesByPopularity);

  return { data, isLoading, isError };
};

export const useNewestRecipesQuery = (page: number, limit: number) => {
  const { data: newestRecipes = [] } = useQuery<Recipe[]>(
    [queryKey.newestRecipes],
    () => getRequest({ url: `recipes/latest?page=${page}&limit=${limit}` }),
    {
      suspense: true,
      useErrorBoundary: true,
    }
  );

  return { newestRecipes };
};

export const useSingleRecipesQuery = (page: number, limit: number) => {
  const { data = [], isLoading } = useQuery<Recipe[]>(
    [queryKey.singleRecipes],
    () => getRequest({ url: `recipes/single?page=${page}&limit=${limit}` })
  );

  const singleRecipes = shuffleRecipes(data);

  return { singleRecipes, isLoading };
};

export const useVegetarianRecipesQuery = (page: number, limit: number) => {
  const { data = [], isLoading } = useQuery<Recipe[]>(
    [queryKey.vegetarianRecipes],
    () => getRequest({ url: `recipes/vegetarian?page=${page}&limit=${limit}` })
  );

  const vegetarianRecipes = shuffleRecipes(data);

  return { vegetarianRecipes, isLoading };
};
