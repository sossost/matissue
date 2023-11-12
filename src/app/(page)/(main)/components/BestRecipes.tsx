import { getRequest } from "@/src/app/api/utils/getRequest";

import MainListingRecipe from "@/src/components/listings/MainListingRecipe";

const BestRecipes = async () => {
  const bestRecipes = await getRequest({
    url: "recipes/popularity",
    options: { revalidate: 60 * 60 },
  });

  return (
    <MainListingRecipe variant="best" recipes={bestRecipes} isFilter={false} />
  );
};

export default BestRecipes;
