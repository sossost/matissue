import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import styled from "styled-components";
import isBetween from "dayjs/plugin/isBetween";

import RecipeCard from "../recipe-card/RecipeCard";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import MainMobileListingRecipe from "./MainMobileListingRecipe";

import {
  ListingRecipeContainer,
  StyledContainer,
  StyledContentsArea,
  StyledList,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type MainListingRecipeProps = {
  title: string;
  recipes: Recipe[];
  isLoading: boolean;
  isError: boolean;
  isFilter: boolean;
  categoryUrl: string;
};

const MainListingRecipe = ({
  title,
  recipes,
  isLoading,
  isError,
  isFilter,
  categoryUrl,
}: MainListingRecipeProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<"day" | "week" | "month">("day");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const isDarkMode = useRecoilValue(darkModeAtom);

  const contentsPerPage = 8;
  const totalRecipesLength = isFilter ? filteredRecipes.length : recipes.length;
  const totalPage = Math.ceil(totalRecipesLength / contentsPerPage);
  const currentDate = dayjs();
  dayjs.extend(isBetween);

  // 페이지네이션 버튼 핸들러
  const leftBtnHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const rightBtnHandler = () => {
    if (currentPage >= totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  // 일간, 주간 ,월간 필터링 useEffect 훅
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => {
      const postData = dayjs(recipe.created_at);
      return postData.isBetween(
        currentDate.startOf(filter),
        currentDate.endOf(filter)
      );
    });

    setFilteredRecipes(filteredRecipes);
  }, [filter]);

  return (
    <StyledContainer>
      <LeftSlideBtn onClick={leftBtnHandler} currentPage={currentPage}>
        <Image
          src="/images/main/leftSlideBtn.png"
          alt="left_slice_btn"
          width={42}
          height={122}
        />
      </LeftSlideBtn>
      <StyledContentsArea>
        <StyledBestTitleBox>
          <StyledTitle>{title}</StyledTitle>
          {isFilter && (
            <StyledList>
              <StyledItem
                isDarkMode={isDarkMode}
                id="month"
                onClick={() => {
                  setFilter("month");
                }}
                clicked={filter === "month"}
              >
                월간
              </StyledItem>
              <StyledItem clicked={false} isDarkMode={isDarkMode}>
                |
              </StyledItem>
              <StyledItem
                isDarkMode={isDarkMode}
                id="week"
                onClick={() => {
                  setFilter("week");
                }}
                clicked={filter === "week"}
              >
                주간
              </StyledItem>
              <StyledItem clicked={false} isDarkMode={isDarkMode}>
                |
              </StyledItem>
              <StyledItem
                isDarkMode={isDarkMode}
                id="day"
                onClick={() => {
                  setFilter("day");
                }}
                clicked={filter === "day"}
              >
                일간
              </StyledItem>
            </StyledList>
          )}
        </StyledBestTitleBox>
        {isLoading && <LoadingRecipe />}
        {isError ? (
          <NonDataCrying />
        ) : totalRecipesLength === 0 && !isError ? (
          <NonRecipeCrying />
        ) : (
          <>
            <ListingRecipeContainer>
              {isFilter
                ? filteredRecipes
                    .slice(
                      contentsPerPage * (currentPage - 1),
                      contentsPerPage * currentPage
                    )
                    .map((item: Recipe) => (
                      <RecipeCard key={item.recipe_id} recipe={item} />
                    ))
                : recipes
                    .slice(
                      contentsPerPage * (currentPage - 1),
                      contentsPerPage * currentPage
                    )
                    .map((item: Recipe) => (
                      <RecipeCard key={item.recipe_id} recipe={item} />
                    ))}
              {isFilter && filteredRecipes.length === 0 && <NonRecipeCrying />}
            </ListingRecipeContainer>
            <MainMobileListingRecipe
              recipes={isFilter ? filteredRecipes : recipes}
              url={categoryUrl}
            />
          </>
        )}
      </StyledContentsArea>
      <RightSlideBtn
        onClick={rightBtnHandler}
        currentPage={currentPage}
        totalPage={totalPage}
      >
        <Image
          src="/images/main/rightSlideBtn.png"
          alt="right_slice_btn"
          width={42}
          height={122}
        />
      </RightSlideBtn>
    </StyledContainer>
  );
};
export default MainListingRecipe;

const StyledBestTitleBox = styled(StyledTitleBox)`
  align-items: center;
  flex-direction: row;
`;

const LeftSlideBtn = styled.button<{ currentPage: number }>`
  display: none;

  @media (min-width: 1024px) {
    ${(props) => (props.currentPage === 1 ? "display:none;" : "display:block;")}
    position: absolute;
    width: 3rem;
    height: 9rem;
    left: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const RightSlideBtn = styled.button<{ currentPage: number; totalPage: number }>`
  display: none;

  @media (min-width: 1024px) {
    ${(props) =>
      props.currentPage > props.totalPage ? "display:none;" : "display:block;"}
    position: absolute;
    width: 3rem;
    height: 9rem;
    right: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const StyledItem = styled.li<{ clicked: boolean; isDarkMode: boolean }>`
  cursor: pointer;
  font-weight: ${(props) => (props.clicked ? "600" : "400")};
  color: ${(props) =>
    props.isDarkMode
      ? props.clicked
        ? "#fff"
        : "#999"
      : props.clicked
      ? "#4F3D21"
      : "#aaa"};
`;
