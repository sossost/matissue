import { getRequest } from "@/src/app/api/utils/getRequest";

import MainAlone from "@/src/components/main-page/MainAlone";

const AloneRecipes = async () => {
  const singleRecipes = await getRequest({
    url: `recipes/single?page=1&limit=20`,
    options: { revalidate: 60 * 60 },
  });

  return <MainAlone recipes={singleRecipes} />;
};

export default AloneRecipes;
