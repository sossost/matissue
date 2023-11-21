import React from "react";
import {
  ListingRecipeContainer,
  StyledContainer,
  StyledContentsArea,
  StyledRowTitleBox,
  StyledTitle,
} from "./styles";

import RecipeCardSkeleton from "../recipe-card/RecipeCardSkeleton";

interface MainListingSkeletonProps {
  title: string;
}

const MainListingSkeleton = ({ title }: MainListingSkeletonProps) => {
  return (
    <StyledContainer>
      <StyledContentsArea>
        <StyledRowTitleBox>
          <StyledTitle>{title}</StyledTitle>
        </StyledRowTitleBox>
        <ListingRecipeContainer>
          {Array.from({ length: 8 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </ListingRecipeContainer>
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MainListingSkeleton;
