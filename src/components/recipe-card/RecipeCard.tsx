"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Recipe } from "@/src/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/src/store/darkModeAtom";

import ImageContainer from "../UI/ImageContainer";
import LikeCounter from "./LikeCounter";
import CommentCounter from "./CommentCounter";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <>
      <RecipeCardLayout
        onClick={() => router.push(`/recipe/${recipe.recipe_id}`)}
      >
        <ImageContainer imageUrl={recipe.recipe_thumbnail} aspectRatio={0.9} />

        <RecipeTitle>{recipe.recipe_title}</RecipeTitle>

        <RecipeInfoContainer>
          <RecipeAuthor isDarkMode={isDarkMode}>
            {recipe.user_nickname}
          </RecipeAuthor>

          <RecipeRankContainer>
            <LikeCounter likes={recipe.recipe_like} width={16} />
            <CommentCounter comments={recipe.comments} width={16} />
          </RecipeRankContainer>
        </RecipeInfoContainer>
      </RecipeCardLayout>
    </>
  );
};

export default RecipeCard;

const RecipeCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 27rem;
  overflow: hidden;
  gap: 0.2rem;

  @media (min-width: 768px) {
    max-width: none;
  }

  &: hover {
    cursor: pointer;
  }
`;

const RecipeInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 480px) {
    margin: 0;
  }
`;

const RecipeTitle = styled.h4`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: 2rem;
  margin-top: 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecipeAuthor = styled.p<{ isDarkMode: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => (props.isDarkMode ? props.theme.grey : "#6f6f6f")};
`;

const RecipeRankContainer = styled.div`
  display: flex;
`;
