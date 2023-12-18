import { getAllRecipes } from "@/src/app/api/recipe";
import ResultPageClient from "./ResultPageClient";
const MBTIResultPage = async () => {
  return <ResultPageClient recipes={await getAllRecipes()} />;
};

export default MBTIResultPage;
