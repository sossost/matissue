"use client";

import React from "react";
import styled from "styled-components";

interface MainTitleBoxProps {
  title: string;
  subTitle: string;
  direction?: "row" | "column";
}

const MainTitleBox = ({
  title,
  subTitle,
  direction = "column",
}: MainTitleBoxProps) => {
  return (
    <StyledTitleBox direction={direction}>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubTitle>{subTitle}</StyledSubTitle>
    </StyledTitleBox>
  );
};

export default MainTitleBox;

export const StyledTitleBox = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "column" ? "column" : "row"};
  gap: 1rem;
  padding: 0.8rem 0 0 0;
  align-items: left;

  @media (min-width: 1024px) {
    padding: 1.6rem 0 0 0;
    align-items: center;
  }
`;

export const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

export const StyledSubTitle = styled.h3`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    font-size: 16px;
  }
`;
