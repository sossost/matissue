import { Hydrate, dehydrate } from "@tanstack/react-query";
import { getRecipesByPopularity } from "../api/recipe";
import MainPageClient from "./MainClient";
import getQueryClient from "@/src/ReactQuery/getQueryClient";
import { queryKey } from "@/src/ReactQuery/queryKey";

const Home = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [queryKey.bestRecipes],
    getRecipesByPopularity
  );
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <MainPageClient />
    </Hydrate>
  );
};

export default Home;
