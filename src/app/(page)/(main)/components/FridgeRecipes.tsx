import { getRequest } from "@/src/app/api/utils/getRequest";
import MainFridge from "@/src/components/main-page/MainFridge";
import React from "react";

const FridgeRecipes = async () => {
  const fridgeRecipes = await getRequest({
    url: "/recipes",
    options: { revalidate: 60 * 60 },
  });

  return <MainFridge recipes={fridgeRecipes} />;
};

export default FridgeRecipes;
