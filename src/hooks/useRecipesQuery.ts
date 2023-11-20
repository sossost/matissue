import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types";
import { queryKey } from "../ReactQuery/queryKey";
import {
  getRecipesByLastest,
  getRecipesByPopularity,
  getRecipesBySingle,
} from "../app/api/recipe";
import { getRequest } from "../app/api/utils/getRequest";

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
    () => getRequest({ url: `recipes/newest?page=${page}&limit=${limit}` })
  );

  return { newestRecipes };
};

export const useSingleRecipesQuery = (page: number, limit: number) => {
  const { data: singleRecipes = [] } = useQuery<Recipe[]>(
    [queryKey.singleRecipes],
    () => getRequest({ url: `recipes/single?page=${page}&limit=${limit}` })
  );

  return { singleRecipes };
};

export const useVegetarianRecipesQuery = (page: number, limit: number) => {
  const { data: vegetarianRecipes = [] } = useQuery<Recipe[]>(
    [queryKey.vegetarianRecipes],
    () => getRequest({ url: `recipes/vegetarian?page=${page}&limit=${limit}` })
  );

  return { vegetarianRecipes };
};
