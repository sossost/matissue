import React from "react";
import styled from "styled-components";
import ImageContainer from "../UI/ImageContainer";

const RecipeCardSkeleton = () => {
  return (
    <>
      <RecipeCardLayout>
        <ImageContainer imageUrl={"/images/skeleton.png"} aspectRatio={0.9} />
        <RecipeInfoSkeleton />
      </RecipeCardLayout>
    </>
  );
};

export default RecipeCardSkeleton;

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

const RecipeInfoSkeleton = styled.div`
  display: flex;
  height: 2.3rem;
  width: 100%;

  @media (max-width: 480px) {
    margin: 0;
  }
`;
