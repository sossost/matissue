"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
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
  } = useQuery<Recipe[]>({
    queryKey: [queryKey.bestRecipes],
    queryFn: getRecipesByPopularity,
  });

  return { data, isLoading, isError };
};

export const useNewestRecipesQuery = (page: number, limit: number) => {
  const { data: newestRecipes = [] } = useSuspenseQuery<Recipe[]>({
    queryKey: [queryKey.newestRecipes],
    queryFn: () =>
      getRequest({
        url: `recipes/latest?page=${page}&limit=${limit}`,
        options: {
          next: {
            revalidate: 0,
          },
        },
      }),
  });

  return { newestRecipes };
};

export const useSingleRecipesQuery = (page: number, limit: number) => {
  const { data = [], isLoading } = useQuery<Recipe[]>({
    queryKey: [queryKey.singleRecipes],
    queryFn: () =>
      getRequest({ url: `recipes/single?page=${page}&limit=${limit}` }),
  });

  const singleRecipes = shuffleRecipes(data);

  return { singleRecipes, isLoading };
};

export const useVegetarianRecipesQuery = (page: number, limit: number) => {
  const { data = [], isLoading } = useQuery<Recipe[]>({
    queryKey: [queryKey.vegetarianRecipes],
    queryFn: () =>
      getRequest({ url: `recipes/vegetarian?page=${page}&limit=${limit}` }),
  });

  const vegetarianRecipes = shuffleRecipes(data);

  return { vegetarianRecipes, isLoading };
};
