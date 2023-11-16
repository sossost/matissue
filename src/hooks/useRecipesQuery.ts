import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types";
import { queryKey } from "../ReactQuery/queryKey";
import {
  getRecipesByLastest,
  getRecipesByPopularity,
  getRecipesBySingle,
  getRecipesByVegetarian,
} from "../app/api/recipe";

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
  const { data = [] } = useQuery<Recipe[]>(
    [queryKey.newestRecipes],
    getRecipesByLastest
  );

  return data;
};

export const useSingleRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.singleRecipes], getRecipesBySingle);

  return { data, isLoading, isError };
};

export const useVegetarianRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.singleRecipes], getRecipesByVegetarian);

  return { data, isLoading, isError };
};
