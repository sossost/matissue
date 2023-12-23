"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/src/types";
import ListingRecipe from "@/src/components/listings/ListingRecipe";

const CategoryRecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchRecipes = async () => {
      let url = "";

      switch (category) {
        case "best":
          url = `${process.env.NEXT_PUBLIC_API_URL}recipes/popularity`;
          break;
        case "newest":
          url = `${process.env.NEXT_PUBLIC_API_URL}recipes/latest`;
          break;
        case "honmuk":
          url = `${process.env.NEXT_PUBLIC_API_URL}recipes/single`;
          break;
        case "vegetarian":
          url = `${process.env.NEXT_PUBLIC_API_URL}recipes/vegetarian`;
          break;
      }

      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();

      setRecipes(data);
    };

    fetchRecipes();
  }, [category]);

  return <ListingRecipe recipes={recipes} />;
};

export default CategoryRecipeListPage;
