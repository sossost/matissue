"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import darkModeAtom from "@/src/store/darkModeAtom";
import { Recipe } from "@/src/types";
import shuffleRecipes from "@/src/utils/shuffleRecipes";
import { useRecoilValue } from "recoil";

const INGREDIENT = [
  {
    title: "계란",
    img: "/images/main/fridge/egg.png",
    id: 1,
  },
  {
    title: "치즈",
    img: "/images/main/fridge/cheese.png",
    id: 2,
  },
  {
    title: "감자",
    img: "/images/main/fridge/potato.png",
    id: 3,
  },
  {
    title: "버섯",
    img: "/images/main/fridge/mushroom.png",
    id: 4,
  },
  {
    title: "양파",
    img: "/images/main/fridge/onion.png",
    id: 5,
  },
  {
    title: "김치",
    img: "/images/main/fridge/kimchi.png",
    id: 6,
  },
  {
    title: "밥",
    img: "/images/main/fridge/rice.png",
    id: 7,
  },
];

const useIngredientFilter = (recipes: Recipe[]) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("계란");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const deferredFilteredRecipes = useDeferredValue(filteredRecipes);

  /**  재료 선택 핸들러 */
  const ingredientSelectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setSelectedIngredient(e.currentTarget.id);
  };

  // 레시피 재료에 선택한 재료가 들어간 레시피들 필터링 후 랜덤정렬
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe: Recipe) =>
      recipe.recipe_ingredients.some(
        (ingredient) => ingredient.name === selectedIngredient
      )
    );

    const shuffledRecipes = shuffleRecipes(filteredRecipes);

    setFilteredRecipes(shuffledRecipes);
  }, [selectedIngredient, recipes]);

  /** 재료 리스트 컴포넌트 */
  const IngredientList = () => {
    const isDarkMode = useRecoilValue(darkModeAtom);

    return (
      <IngredientSelectBox>
        {INGREDIENT.map((item) => (
          <IngredientButton
            type="button"
            key={item.id}
            id={item.title}
            checked={selectedIngredient === item.title}
            onClick={ingredientSelectHandler}
          >
            <IngredientImageWrapper
              checked={selectedIngredient === item.title}
              isDarkMode={isDarkMode}
            >
              <Image src={item.img} alt="ingredient" width={35} height={35} />
            </IngredientImageWrapper>
            <h2>{item.title}</h2>
          </IngredientButton>
        ))}
      </IngredientSelectBox>
    );
  };

  return { deferredFilteredRecipes, IngredientList };
};

export default useIngredientFilter;

const IngredientSelectBox = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
`;

const IngredientButton = styled.button<{ checked: boolean }>`
  font-size: 16px;
  opacity: ${(props) => (props.checked ? 1 : 0.6)};

  font-weight: ${(props) => (props.checked ? "600" : "400")};

  transition: opacity 0.3s;
`;

const IngredientImageWrapper = styled.div<{
  checked: boolean;
  isDarkMode: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
  border-radius: 50rem;
  background-color: ${(props) =>
    props.isDarkMode
      ? props.checked
        ? "#ddd"
        : "#aaa"
      : props.checked
      ? "#444"
      : "#aaa"};
`;
