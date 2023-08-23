import { getAllRecipes, getRecipesByParams } from "@/src/app/api/recipe";
import ListingRecipe from "@/src/components/listings/ListingRecipe";

const SearchRecipeListPage = async ({ searchParams }: any) => {
  if (searchParams.query) {
    return (
      <ListingRecipe recipes={await getRecipesByParams(searchParams.query)} />
    );
  } else {
    return <ListingRecipe recipes={await getAllRecipes()} />;
  }
};

export default SearchRecipeListPage;
