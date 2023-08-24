"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Recipe } from "@/src/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/src/store/darkModeAtom";

import ImageContainer from "../../UI/ImageContainer";
import LikeCounter from "../LikeCounter";
import CommentCounter from "../CommentCounter";

const LargeRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();

  return (
    <SlideContainer>
      <CardContainer
        isDarkMode={isDarkMode}
        onClick={() => router.push(`/recipe/${recipe.recipe_id}`)}
      >
        <ImageContainer imageUrl={recipe.recipe_thumbnail} sizes="280" />

        <TextContainer>
          <RecipeTitle>{recipe.recipe_title}</RecipeTitle>
          <RecipeInfoBox>
            <RecipeAuthor>{recipe.user_nickname}</RecipeAuthor>

            <IconWrapper>
              <LikeCounter likes={recipe.recipe_like} width={16} />
              <CommentCounter comments={recipe.comments} width={16} />
            </IconWrapper>
          </RecipeInfoBox>
        </TextContainer>
      </CardContainer>
    </SlideContainer>
  );
};

export default LargeRecipeCard;

const SlideContainer = styled.div`
  overflow: hidden;
  &:hover {
    transform: scale(1.03);
  }

  transition: all 0.5s;
`;

const CardContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : props.theme.white};
  border-radius: 1.6rem;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 1.6rem 2rem 1.6rem;
  line-height: 1.6rem;
`;

const RecipeTitle = styled.h2`
  display: flex;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  text-align: start;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecipeInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #6f6f6f;
`;

const RecipeAuthor = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0.4rem;
`;
