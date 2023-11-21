import { getRequest } from "@/src/app/api/utils/getRequest";

import MainListingRecipe from "@/src/components/listings/MainListingRecipe";

const MainBest = async () => {
  const bestRecipes = await getRequest({
    url: "recipes/popularity?page=1&limit=100",
  });

  return (
    <MainListingRecipe variant="best" recipes={bestRecipes} isFilter={false} />
  );
};

export default MainBest;
