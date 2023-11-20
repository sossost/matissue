import { getRequest } from "@/src/app/api/utils/getRequest";
import MainVegetarian from "@/src/components/main-page/MainVegetarian";

const VegetarianRecipes = async () => {
  const vegitarianRecipes = await getRequest({
    url: "recipes/vegetarian?page=1&limit=30",
    options: { revalidate: 60 * 60 },
  });

  return <MainVegetarian recipes={vegitarianRecipes} />;
};

export default VegetarianRecipes;
