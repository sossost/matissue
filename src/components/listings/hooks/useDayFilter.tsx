import React, { useEffect, useState } from "react";
import darkModeAtom from "@/src/store/darkModeAtom";
import { Recipe } from "@/src/types";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { StyledList } from "@/src/styles/main/main.style";

const useDayFilter = (recipes: Recipe[]) => {
  const [filter, setFilter] = useState<"day" | "week" | "month">("day");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  const isDarkMode = useRecoilValue(darkModeAtom);

  const currentDate = dayjs();
  dayjs.extend(isBetween);

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

  const DayFilter = () => {
    return (
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
    );
  };

  return { filteredRecipes, DayFilter };
};

export default useDayFilter;

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
