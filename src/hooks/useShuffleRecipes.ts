import { useEffect, useState } from "react";
import { Recipe } from "../types";

const useShuffleRecipes = (recipes: Recipe[]) => {
  const [shuffledRecipes, setShuffledRecipes] = useState<Recipe[]>([]);
  // 레시피 데이터가 변경되면 레시피를 섞어서 상태에 저장

  const shuffleRecipes = (recipes: Recipe[]) => {
    for (let i = recipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
    }
    return recipes;
  };

  useEffect(() => {
    setShuffledRecipes(shuffleRecipes(recipes));
  }, [recipes]);

  return shuffledRecipes;
};

export default useShuffleRecipes;
