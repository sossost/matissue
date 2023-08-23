import React, { ReactNode } from "react";
import styled from "styled-components";

const SubTitle = ({ children }: { children: ReactNode }) => {
  return <StyledSubtitle>{children}</StyledSubtitle>;
};

export default SubTitle;

const StyledSubtitle = styled.h2`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  margin-top: 2.5rem;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;
