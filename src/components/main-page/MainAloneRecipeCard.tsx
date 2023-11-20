import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Recipe } from "@/src/types";
import { useRouter } from "next/navigation";

interface MainAloneRecipeCardProps {
  recipe: Recipe;
  index: number;
}

const MainAloneRecipeCard = ({ recipe, index }: MainAloneRecipeCardProps) => {
  const router = useRouter();

  return (
    <RecipeImageWrapperBase
      index={index}
      onClick={() => router.push(`/recipe/${recipe.recipe_id}`)}
    >
      <StyledImageWrapper>
        <Image
          src={recipe.recipe_thumbnail}
          alt="recipe"
          fill
          sizes={[1, 2].includes(index) ? "210" : "440"}
          style={{ objectFit: "cover" }}
        />
      </StyledImageWrapper>
      <TitleOnImage>{recipe.recipe_title}</TitleOnImage>
    </RecipeImageWrapperBase>
  );
};

export default MainAloneRecipeCard;

const GRID_ROW_TEMPLATE = ["1/3", "1/2", "1/2", "2/3"];
const GRID_COLUMN_TEMPLATE = ["1/3", "3/4", "4/5", "3/5"];

const RecipeImageWrapperBase = styled.div<{ index: number }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: relative;
    grid-row: ${({ index }) => GRID_ROW_TEMPLATE[index]};
    grid-column: ${({ index }) => GRID_COLUMN_TEMPLATE[index]};

    &:hover {
      transform: scale(1.03);
    }

    transition: all 0.5s;
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25));
`;

const TitleOnImage = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 5;
  left: 2rem;
  bottom: 2rem;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  text-shadow: 0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
`;
